/* ==================== NAVEGAÇÃO E UI ==================== */
const pages = document.querySelectorAll('.page');
const navs = document.querySelectorAll('.nav-item[data-page]');
const appShell = document.getElementById('app-shell');

const historyStack = [];
let currentPage = null;

function go(id){
  if (id === 'back') {
    if (historyStack.length > 0) {
      id = historyStack.pop(); 
    } else {
      return; 
    }
  } else {
    if (currentPage && currentPage !== id) {
      historyStack.push(currentPage);
    }
  }

  currentPage = id;

  pages.forEach(p=>p.classList.remove('active'));
  const el = document.getElementById('page-'+id);
  if(el) el.classList.add('active');
  navs.forEach(n=>n.classList.toggle('active', n.dataset.page===id));
  window.scrollTo({top:0,behavior:'smooth'});
  appShell.classList.remove('mobile-open');
}

navs.forEach(n=>n.addEventListener('click',()=>{
  const page = n.dataset.page;
  if(page.startsWith('admin') && false) { 
    return go('denied');
  }
  go(page);
}));

function toggleSidebar(){ appShell.classList.toggle('collapsed'); }

function setDevice(dev,btn){
  document.querySelectorAll('.device-bar button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  if(dev==='desktop'){ appShell.classList.remove('collapsed'); document.body.style.zoom='1'; }
  else if(dev==='tablet'){ document.body.style.zoom='0.85'; }
  else { document.body.style.zoom='0.65'; appShell.classList.add('mobile-open'); }
}

/* ==================== TOAST ==================== */
function showToast(msg,type='info'){
  const stack = document.getElementById('toast-stack');
  const t = document.createElement('div');
  t.className = 'toast '+type;
  const icons = {info:'ℹ️',success:'✅',warn:'⚠️',error:'⛔'};
  t.innerHTML = `<div>${icons[type]||'ℹ️'}</div><div>${msg}</div>`;
  stack.appendChild(t);
  requestAnimationFrame(()=>t.classList.add('show'));
  setTimeout(()=>{ t.classList.remove('show'); setTimeout(()=>t.remove(),300); },3500);
}

/* ==================== MODAIS ==================== */
function closeModal(id){ document.getElementById(id).classList.remove('show'); }
document.querySelectorAll('.modal').forEach(m=>m.addEventListener('click',e=>{ if(e.target===m) m.classList.remove('show'); }));

/* ==================== LOGIN ==================== */
function doLogin(e){
  e.preventDefault();
  document.getElementById('screen-login').classList.add('hidden');
  document.getElementById('screen-app').classList.remove('hidden');
  showToast('Bem-vinda, Ana! (autenticação simulada)','success');
  return false;
}
function logout(){
  document.getElementById('screen-login').classList.remove('hidden');
  document.getElementById('screen-app').classList.add('hidden');
}

/* ==================== DASHBOARD ==================== */
function toggleTask(el,title){
  if(el.checked){
    const li = el.closest('li'); li.classList.add('done');
    showToast('Tarefa concluída: '+title,'success');
  } else { el.closest('li').classList.remove('done'); }
}

/* ==================== PAINEL DIÁRIO ==================== */
// RF-04: Simula envio ao servidor antes de confirmar
function simulateServerCheck(el, title) {
  // Desabilita visualmente e previne clique duplo
  const wasChecked = el.checked;
  el.disabled = true;
  
  // Simula latência de rede
  setTimeout(() => {
    el.disabled = false;
    if (wasChecked) {
      const li = el.closest('li');
      if(li) li.classList.add('done');
      showToast('Conclusão confirmada pelo servidor: ' + title, 'success');
    } else {
      const li = el.closest('li');
      if(li) li.classList.remove('done');
    }
  }, 800);
}

function openFullscreenDaily(){
  document.getElementById('modal-daily-fullscreen').classList.add('show');
  const now = new Date();
  document.getElementById('live-clock').textContent = String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
}

/* ==================== TAREFAS ==================== */
function setTaskView(v,btn){
  document.querySelectorAll('#page-tasks .tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('task-kanban-view').classList.toggle('hidden', v!=='kanban');
  document.getElementById('task-list-view').classList.toggle('hidden', v!=='list');
  document.getElementById('task-calendar-view').classList.toggle('hidden', v!=='calendar');
}

function openNewTask(){ document.getElementById('modal-task').classList.add('show'); }
function submitTask(e){
  e.preventDefault();
  const t = document.getElementById('task-title');
  if(!t.value.trim()){ document.getElementById('f-task-title').classList.add('has-error'); t.classList.add('error'); return false; }
  closeModal('modal-task');
  showToast('Tarefa criada com sucesso (simulação)','success');
  t.value=''; document.getElementById('f-task-title').classList.remove('has-error'); t.classList.remove('error');
  return false;
}

function openTaskDetail(title,prio,status){
  document.getElementById('td-title').textContent = title;
  document.getElementById('td-crumb').textContent = title;
  document.getElementById('td-meta-prio').textContent = prio;
  document.getElementById('td-meta-prio').className = 'tag '+(prio==='Alta'?'d':(prio==='Média'?'': 'n'));
  document.getElementById('td-meta-status').textContent = status;
  document.getElementById('td-meta-status').className = 'tag '+(status==='A fazer'?'':'i');
  go('task-detail');
}

function completeTask(btn){
  btn.classList.add('loading');
  btn.textContent = ''; 
  setTimeout(()=>{
    btn.classList.remove('loading');
    btn.textContent = '✓ Marcar como concluída';
    showToast('Tarefa marcada como concluída (resposta do servidor simulada)','success');
    setTimeout(()=>go('tasks'),1000);
  }, 800); 
}

/* ==================== CRM ==================== */
function filterClientes(){
  const q = document.getElementById('cli-search').value.toLowerCase();
  const rows = document.querySelectorAll('#cli-table tbody tr[data-name]');
  let any=false;
  rows.forEach(r=>{
    const match = r.dataset.name.toLowerCase().includes(q);
    r.classList.toggle('hidden', !match);
    if(match) any=true;
  });
  document.getElementById('cli-empty').classList.toggle('hidden', any);
}

function openCliente(nome){
  document.getElementById('cl-nome').textContent = nome;
  document.getElementById('cl-nome-crumb').textContent = nome;
  const meta = {
    'Nordeste Alimentos':'CNPJ 12.345.678/0001-90 · Alimentos · Cliente desde 03/2024',
    'Grupo Aurora':'CNPJ 98.765.432/0001-10 · Energia · Cliente desde 11/2023',
    'TechSul Sistemas':'CNPJ 11.222.333/0001-44 · Tecnologia · Lead desde 09/2026'
  };
  document.getElementById('cl-meta').textContent = meta[nome] || 'CNPJ · Segmento';
  go('cliente');
}

function setTab(page,btn,tab){
  const card = btn.closest('.card');
  card.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  const prefix = page==='cliente'?'cliente-tab-':'';
  card.querySelectorAll('[id^="'+prefix+'"]').forEach(p=>p.classList.add('hidden'));
  const target = document.getElementById(prefix+tab);
  if(target) target.classList.remove('hidden');
}

function openNewOpportunity(){
  showToast('Formulário de oportunidade (simulação)','info');
  setTimeout(()=>go('pipeline'),400);
}

function openWinModal(){ document.getElementById('modal-win').classList.add('show'); }
function confirmWin(){
  closeModal('modal-win');
  const titulo = document.getElementById('win-task-title').value || 'Onboarding cliente';
  showToast(`✓ Oportunidade marcada como ganha · Tarefa "${titulo}" criada e vinculada (simulação)`,'success');
  setTimeout(()=>go('tasks'),1200);
}

/* ==================== CLIENTES: ALTERNAR ABAS ==================== */
function setClienteTab(tab, btn) {
  // Atualiza as classes dos botões (tabs)
  const tabs = btn.closest('.tabs').querySelectorAll('.tab');
  tabs.forEach(t => t.classList.remove('active'));
  btn.classList.add('active');

  // Esconde todas as abas de conteúdo
  document.getElementById('cli-tab-lista').classList.add('hidden');
  document.getElementById('cli-tab-pipeline').classList.add('hidden');

  // Mostra a aba correta
  if (tab === 'lista') {
    document.getElementById('cli-tab-lista').classList.remove('hidden');
  } else if (tab === 'pipeline') {
    document.getElementById('cli-tab-pipeline').classList.remove('hidden');
  }
}

/* ==================== OPORTUNIDADES ==================== */
function openOportunidadeDetalhe(titulo, valor, etapa, responsavel, data, probabilidade) {
  // Atualiza o cabeçalho
  document.getElementById('op-title').textContent = titulo;
  document.getElementById('op-crumb').textContent = titulo;
  document.getElementById('op-responsavel').textContent = responsavel;
  document.getElementById('op-data').textContent = data;
  
  // Atualiza o card lateral
  document.getElementById('op-valor').textContent = valor;
  document.getElementById('op-data-side').textContent = data;
  document.getElementById('op-prob').textContent = probabilidade;
  
  // Atualiza a tag da etapa com a cor correta
  const tagEtapa = document.getElementById('op-etapa');
  const classes = {
    'Novo lead': 'tag n',
    'Qualificação': 'tag',
    'Proposta': 'tag i',
    'Negociação': 'tag i',
    'Ganho': 'tag s',
    'Perdido': 'tag d'
  };
  tagEtapa.innerHTML = `<span class="${classes[etapa] || 'tag'}">${etapa}</span>`;
  
  go('oportunidade');
}

/* ==================== DOCUMENTOS ==================== */
function setDocTab(tab,btn){
  document.querySelectorAll('#page-documentos .tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('doc-cat-tab').classList.toggle('hidden', tab!=='cat');
  document.getElementById('doc-links-tab').classList.toggle('hidden', tab!=='links');
}

function filterDocs(){
  const q = document.getElementById('doc-search').value.toLowerCase();
  const rows = document.querySelectorAll('#doc-body tr[data-name]');
  let any=false;
  rows.forEach(r=>{
    const match = r.dataset.name.toLowerCase().includes(q);
    r.classList.toggle('hidden', !match);
    if(match) any=true;
  });
  document.getElementById('doc-empty').classList.toggle('hidden', any);
}

function openDoc(title,cat,tipo,resp,data,acesso){
  document.getElementById('doc-title').textContent = title;
  document.getElementById('doc-crumb').textContent = title;
  document.getElementById('doc-meta').textContent = `${cat} · ${tipo} · ${resp}`;
  document.getElementById('doc-cat').textContent = cat;
  document.getElementById('doc-tipo').innerHTML = `<span class="tag ${tipo==='Arquivo'?'i':(tipo==='Link externo'?'teal':'n')}">${tipo}</span>`;
  document.getElementById('doc-resp').textContent = resp;
  document.getElementById('doc-data').textContent = data;
  document.getElementById('doc-acesso').innerHTML = `<span class="tag ${acesso==='Restrito'?'d':(acesso==='Todos'?'s':'')}">${acesso}</span>`;
  go('doc');
}

/* ==================== EQUIPAMENTOS ==================== */
function openEquip(nome,estado,resp,loc){
  document.getElementById('eq-nome').textContent = nome;
  document.getElementById('eq-crumb').textContent = nome;
  document.getElementById('eq-meta').textContent = `PAT-001 · Série SN-EP-2024-0457`;
  document.getElementById('eq-estado').innerHTML = `<span class="tag ${estado==='Disponível'?'s':(estado==='Em manutenção'?'w':(estado==='Baixado'?'n':'i'))}">${estado}</span>`;
  document.getElementById('eq-resp').textContent = resp;
  document.getElementById('eq-loc').textContent = loc;
  go('equip');
}

function openCheckout(){ document.getElementById('modal-checkout').classList.add('show'); }
function submitCheckout(e){
  e.preventDefault();
  const u = document.getElementById('eq-user');
  if(!u.value){ document.getElementById('f-eq-user').classList.add('has-error'); u.classList.add('error'); return false; }
  closeModal('modal-checkout');
  showToast('Empréstimo registrado (simulação) · Histórico atualizado','success');
  document.getElementById('f-eq-user').classList.remove('has-error'); u.classList.remove('error'); u.value='';
  return false;
}

/* ==================== FUNCIONÁRIOS: BUSCA ==================== */
function filterEmployees() {
  const q = document.getElementById('emp-search').value.toLowerCase();
  
  // --- Filtro na Grade ---
  const cards = document.querySelectorAll('#employee-grid .contact-item');
  cards.forEach(card => {
    const name = card.querySelector('.contact-name')?.textContent.toLowerCase() || '';
    const role = card.querySelector('.contact-role')?.textContent.toLowerCase() || '';
    const details = card.querySelector('div[style*="flex-direction:column"]')?.textContent.toLowerCase() || '';
    const match = name.includes(q) || role.includes(q) || details.includes(q);
    card.classList.toggle('hidden', !match);
  });

  // --- Filtro na Tabela ---
  const rows = document.querySelectorAll('#employee-table-view tbody tr');
  rows.forEach(row => {
    const name = row.dataset.name || '';
    const role = row.dataset.role || '';
    const details = row.dataset.details || '';
    const match = name.includes(q) || role.includes(q) || details.includes(q);
    row.classList.toggle('hidden', !match);
  });

  // --- Empty State ---
  const isGrid = !document.getElementById('employee-grid').classList.contains('hidden');
  const anyMatch = isGrid 
    ? Array.from(cards).some(c => !c.classList.contains('hidden'))
    : Array.from(rows).some(r => !r.classList.contains('hidden'));
  
  document.getElementById('emp-empty').classList.toggle('hidden', anyMatch);
}

function setEmployeeView(view) {
  const grid = document.getElementById('employee-grid');
  const table = document.getElementById('employee-table-view');
  const tabGrid = document.getElementById('tab-emp-grid');
  const tabList = document.getElementById('tab-emp-list');

  if (view === 'list') {
    grid.classList.add('hidden');
    table.classList.remove('hidden');
    tabList.classList.add('active');
    tabGrid.classList.remove('active');
  } else {
    grid.classList.remove('hidden');
    table.classList.add('hidden');
    tabGrid.classList.add('active');
    tabList.classList.remove('active');
  }
  
  document.getElementById('emp-search').value = '';
  filterEmployees();
}

/* ==================== AUDITORIA ==================== */
function filterAudit(){
  const q = document.getElementById('aud-search').value.toLowerCase();
  const actor = document.getElementById('aud-actor').value;
  const action = document.getElementById('aud-action').value;
  const rows = document.querySelectorAll('#aud-body tr[data-actor]');
  let any=false;
  rows.forEach(r=>{
    const ok = (!q || r.dataset.recurso.toLowerCase().includes(q)) &&
               (!actor || r.dataset.actor===actor) &&
               (!action || r.dataset.action===action);
    r.classList.toggle('hidden', !ok);
    if(ok) any=true;
  });
  document.getElementById('aud-empty').classList.toggle('hidden', any);
}

function openAudit(dt,at,ac,re,desc){
  document.getElementById('aud-dt').textContent = dt;
  document.getElementById('aud-at').textContent = at;
  document.getElementById('aud-ac').innerHTML = `<span class="tag">${ac}</span>`;
  document.getElementById('aud-re').textContent = re;
  document.getElementById('aud-desc').textContent = desc;
  go('audit');
}

/* ==================== BRANDING ==================== */
function updatePreview(){
  const c1 = document.getElementById('brand-color').value;
  const c2 = document.getElementById('brand-color2').value;
  document.getElementById('bp-header').style.background = c1;
  document.getElementById('bp-btn').style.background = c1;
  const tag = document.getElementById('bp-tag');
  tag.style.background = c1+'22'; tag.style.color = c1;
}
updatePreview();