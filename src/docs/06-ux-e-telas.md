# 6. Mapa de telas e UX

## Navegação

A navegação é organizada em **dois grupos visuais** na sidebar, com o item atual sempre destacado. Ver **ADR 0006** para a decisão formal.

### Grupo "Principal"
1. **Visão geral**
2. **Demandas**
3. **CRM / Clientes**
4. **Documentos**
5. **Equipamentos**
6. **Painel diário**
7. **Auditoria**

### Grupo "Administração" (visível apenas para `Admin`; `Manager` acessa Usuários e Equipes conforme permissão)
1. **Usuários e permissões**
2. **Equipes**
3. **Identidade visual**
4. **Preferências**

### Topbar (presente em todas as telas)
- Busca global (visual/ilustrativa no MVP; sem busca real cross-módulo).
- Ícone de notificações (badge ilustrativo).
- Ícone de ajuda (abre página de ajuda fictícia).
- Menu do usuário: nome, papel, link para Preferências e logout.

### Comportamentos de shell
- A sidebar é **recolhível** em telas compatíveis (≥1024px) e transforma-se em menu off-canvas em telas estreitas (<768px).
- O item ativo recebe destaque de cor e permanece identificável mesmo com a sidebar recolhida (apenas ícone).
- Breadcrumb é exibido no topo da área de conteúdo sempre que houver hierarquia (ex.: `CRM / Clientes / Nordeste Alimentos`).

---

## 1. Visão geral

**Objetivo:** dar à pessoa uma leitura rápida do estado operacional em menos de 30 segundos.

**Blocos:**
- **KPIs (4 cartões):** demandas abertas, demandas atrasadas, oportunidades em aberto (valor total), equipamentos emprestados (com contagem de devoluções atrasadas).
- **Demandas de hoje:** lista curta com checkbox, prioridade e prazo; link para Demandas.
- **Pipeline comercial (resumo):** valores por etapa; link para CRM.
- **Distribuição por status:** barras horizontais (não depender só de cor; rótulo + valor sempre presentes).
- **Atividade recente:** últimas 3–5 ações do usuário e da equipe (com ator, ação, recurso, tempo relativo).
- **Próximos prazos:** tabela compacta com prazo, tarefa e responsável.
- **Indicadores ilustrativos:** SLA, conversão, tempo médio — apenas visual; não calcular no MVP.

**Filtros:** período (hoje / 7 dias / 30 dias) — **visual no MVP**; sem cálculo real até a fase de relatórios.

**Estados obrigatórios:** carregando (skeleton), vazio (primeira visita sem dados), erro recuperável, sem permissão.

---

## 2. Demandas

**Sub-visões:** Kanban · Lista · Calendário (alternância por tabs no topo do card).

### Kanban
- Colunas = estados válidos de `Task` (RF-02): **A fazer · Em andamento · Em revisão · Concluída · Cancelada**.
- Cartão exibe: título, prioridade, responsável, prazo, **departamento** (não cliente — ver ADR 0005 e doc 04).
- Contador por coluna.
- **Arrastar/soltar é opcional**; deve existir **alternativa acessível** (botão "Alterar status" no detalhe da tarefa).

### Lista
- Filtros: status, prioridade, responsável, prazo, departamento.
- Colunas: tarefa, status, prioridade, responsável, prazo, ações.
- Ordenação por prazo, prioridade e título.

### Calendário
- Grade mensal com eventos por dia.
- Clique em dia abre a criação de tarefa com a data pré-preenchida.

### Detalhe da tarefa
- Título, descrição, status, prioridade, responsável, prazo, departamento.
- **Vínculo opcional a Oportunidade** (`OpportunityId` — ver RF-10).
- Histórico de mudanças de estado e responsável (RF-02).
- Comentários (se implementados — atualmente fora do MVP; apenas visual).
- Ação primária: "Marcar como concluída" — **confirmação apenas após resposta do servidor**.
- Ação secundária: "Alterar status" via dropdown (alternativa ao drag-and-drop).

### Criar/editar tarefa
- Campos obrigatórios: título.
- Campos opcionais: descrição, prioridade, prazo, responsável, departamento, oportunidade.
- Validação: título não vazio; prazo no futuro quando informado; departamento válido.
- **Não** existe campo "cliente" no formulário de tarefa (ver ADR 0005).

**Estados:** carregando, vazio, erro recuperável, validação, sucesso confirmado, sem permissão (ex.: `Member` editando tarefa alheia).

---

## 3. CRM / Clientes

**Objetivo:** manter relacionamento comercial leve, com rastreabilidade até tarefas operacionais.

### Lista de clientes
- Filtros: tipo (Cliente/Prospect), responsável, situação (Ativo/Lead/Inativo).
- Busca por nome, CNPJ, segmento.
- Colunas: organização, CNPJ, segmento, responsável, situação, número de oportunidades abertas.
- Ação primária: "Novo cliente".

### Perfil do cliente
- **Abas:** Visão geral · Contatos · Oportunidades · Atividades · Documentos.
- **Visão geral:** cartões de KPI (oportunidades, tarefas abertas, contatos, valor total em pipeline).
- **Contatos:** tabela com nome, cargo, e-mail, telefone; ação "Novo contato".
- **Oportunidades:** tabela com título, valor, etapa, data prevista; clique abre o detalhe da oportunidade.
- **Atividades:** timeline de atividades comerciais registradas (reunião, ligação, e-mail, nota) + atividades vindas de tarefas vinculadas.
- **Documentos:** tabela com documentos vinculados ao cliente (ver RF-06).
- Ação primária: "Nova oportunidade".
- Ação secundária: "Editar cliente".

### Pipeline comercial
- Kanban com etapas: **Novo lead · Qualificação · Proposta · Negociação · Ganho · Perdido**.
- Cartão exibe: título, valor estimado, responsável, data prevista.
- Arrastar/soltar é opcional; **alternativa acessível**: abrir o detalhe e usar o seletor "Alterar etapa".
- Coluna "Ganho" destaca cartões com borda verde; "Perdido" com opacidade reduzida (mas sempre com rótulo textual).

### Detalhe da oportunidade
- Cabeçalho: título, cliente, responsável, data prevista, etapa atual.
- Valor estimado em destaque.
- **Timeline de atividades** com registro rápido (dropdown de tipo + botão "Registrar").
- Ações: "Marcar como ganha", "Marcar como perdida", "Alterar etapa".
- **Regra de negócio:** oportunidade em estado "Ganho" ou "Perdido" **não aceita novas atividades** (registrada em `08-decisoes-pendentes.md` para validação final).
- **Fluxo crítico:** ao marcar como **Ganha**, o sistema oferece (modal) a criação de uma **tarefa de onboarding** com `OpportunityId` preenchido. A criação da tarefa dispara auditoria (RF-08).

### Criar/editar cliente, contato, oportunidade e atividade
- Formulários guiados, com validação de campos obrigatórios.
- CNPJ validado (dígito verificador); e-mail normalizado.
- Valor estimado em formato `R$` com separador de milhar.
- Datas em `DD/MM/AAAA` na UI, `UTC` no banco.

**Estados:** carregando, vazio, sem resultados (busca), erro recuperável, validação, sucesso confirmado, sem permissão.

---

## 4. Documentos

**Objetivo:** encontrar por metadados o que o nome do arquivo não revela (RF-06).

### Catálogo
- **Busca em destaque** (nome, tag, categoria).
- Filtros combinados: categoria, departamento, tags, responsável, data.
- Colunas: título, categoria, tipo (Arquivo / Link externo / Registro), responsável, data, classificação de acesso.
- Paginação estável (RF-06).
- Ação primária: "Novo documento".
- Ação secundária: "Categorias".

### Busca avançada
- Painel expansível com todos os filtros combináveis.
- "Limpar filtros" sempre visível quando houver filtros ativos.
- Sem resultados: mensagem clara + botão de limpar filtros.

### Detalhe do documento
- Cabeçalho: título, tipo, categoria, responsável.
- Metadados: categoria, tipo, responsável, data, classificação de acesso, origem/localização.
- Ações: "Simular download", "Abrir link/localização", "Ver histórico".
- **Nenhum usuário sem permissão vê a URL direta** (RF-06 + RF-05 de segurança).
- **Não** há pré-visualização de conteúdo de PDF/Office no MVP (é capacidade separada).

### Formulário de documento
- Campos: título, nome original (opcional), categoria, departamento, tags, responsável, descrição, origem/localização, classificação de acesso.
- Convenção sugerida configurável (RF-07): `AAAA-MM-DD_Departamento_Tipo_Assunto_Versao`.
- **Nunca renomear arquivos externos silenciosamente** (RF-07).

### Links corporativos (aba dentro de Documentos — ver ADR 0006)
- **Objetivo:** disponibilizar links internos de referência (sistemas, pastas, políticas, portais), sem concorrer com a navegação principal.
- **Lista:** título, URL, categoria, estado (ativo/inativo), criado por, criado em.
- **Filtros:** categoria, estado, texto livre no título.
- **Ações por permissão:**
  - `Admin`/`Manager`: criar, editar, ativar/desativar links.
  - `Member`: consulta apenas; não cria nem altera (RF-09).
- **Formulário de link:**
  - Campos: título (obrigatório), URL (obrigatória, validada como URL absoluta), categoria, estado (ativo/inativo).
  - Validação: URL inválida bloqueia salvamento; título não vazio; categoria válida.
  - Aviso: **não** é feita verificação de disponibilidade do link (fora do MVP; requer decisão de produto).
- **Estados obrigatórios:** carregando, vazio (sem links cadastrados + CTA "Adicionar link"), sem resultados (filtro sem correspondência + "Limpar filtros"), erro recuperável, validação, sucesso confirmado, sem permissão (ação de escrita escondida para `Member`).
- **Acessibilidade:** links externos abrem em nova aba com `rel="noopener noreferrer"` e ícone de indicação; a URL é exibida como texto (não apenas no `href`) para permitir leitura por leitores de tela.

### Reaproveitamento entre Documentos e Links corporativos
- Filtros, tabela, paginação, estados (vazio/sem resultados/erro/carregando) e modais de confirmação são **componentes reaproveitados** — não criar variantes paralelas.
- Dados de teste: usar um conjunto pequeno e coerente (ex.: 3 links fictícios, um inativo) para exercitar todos os estados.

---

## 5. Equipamentos

### Inventário
- Tabela com: nome, patrimônio/série, estado (**Disponível · Emprestado · Em manutenção · Baixado** — RF-05), localização, responsável atual.
- Filtros: estado, localização, responsável, categoria.
- Ação primária: "Novo equipamento".
- Ações por linha: abrir detalhe.

### Detalhe do equipamento
- Cabeçalho: nome, patrimônio, número de série.
- Estado e responsável atual em destaque.
- **Histórico de movimentações** (empréstimos, devoluções, manutenção).
- Ações conforme permissão:
  - `Admin`/`Manager`: "Emprestar", "Registrar devolução", "Marcar em manutenção", "Baixar".
  - `Member`: apenas consulta, e **não pode** alterar status de equipamentos de outros membros (RF-04 de ADR 0004).
- **Operações atômicas** impedem empréstimos simultâneos (RF-05).
- Itens em manutenção/baixados **não aparecem** no fluxo de empréstimo.

### Formulário de empréstimo
- Campos: colaborador (obrigatório), previsão de devolução (obrigatório), observações.
- Validação: colaborador existente; data futura.
- Confirmação: **apenas após resposta do servidor** (toast de sucesso).
- Histórico é atualizado imediatamente na simulação — no MVP real, apenas após confirmação.

### Formulário de devolução
- Confirma equipamento, condição de devolução, observações.
- Atualiza estado para "Disponível" e registra movimentação.

**Estados:** carregando, vazio, erro recuperável, validação, sucesso confirmado, sem permissão, desabilitado (equipamento indisponível para empréstimo).

---

## 6. Painel diário

**Objetivo:** visão focada para uso em tela cheia por equipes operacionais (substitui "Meu dia" — ver ADR 0006).

### Visão principal
- KPIs grandes: tarefas do dia, atrasadas, concluídas hoje.
- Lista de tarefas do dia (por prazo/prioridade).
- Lista de atrasadas.
- Lista de concluídas hoje.

### Configuração do painel
- Seleção de equipe/departamento.
- Seleção de período (hoje, semana).
- Escolha de informações exibidas (tarefas, atrasadas, concluídas, oportunidades, equipamentos).
- Pré-visualização antes de exibir.

### Comportamentos
- O **checkbox de conclusão** confirma **somente após resposta do servidor** (RF-04).
- Repetição não duplica histórico (RF-04).
- Erro de rede oferece feedback e nova tentativa (RF-04).
- **Não** representar atualização automática nem conexão com telas físicas no MVP.

**Estados:** carregando, vazio, erro recuperável, sucesso confirmado, sem permissão (member vê apenas o próprio escopo).

---

## 7. Auditoria

**Objetivo:** rastrear ações relevantes para confiança operacional (RF-08).

### Lista de eventos
- Filtros: data/hora (intervalo), ator, ação, recurso.
- Colunas: data/hora (UTC, exibida em `DD/MM/AAAA HH:mm`), ator, ação, recurso, `CorrelationId` (opcional, exibido no detalhe).
- Ação: "Exportar" — **apenas visual no MVP** (interação demonstrativa).
- Acesso: `Admin` e `Manager` (ver ADR 0006).

### Detalhe do evento
- Campos: data/hora, ator, ação, recurso (`ResourceType` + `ResourceId`), `CorrelationId`, metadados mínimos não sensíveis.
- **Append-only** para usuários comuns (RF-08).

**Estados:** carregando, vazio, sem resultados (filtros), erro recuperável, sem permissão.

---

## 8. Usuários e permissões

### Lista de usuários
- Colunas: nome, e-mail, papel (`Admin`/`Manager`/`Member`), equipe/departamento, status.
- Ação primária: "Novo usuário".
- Ação por linha: editar, desativar.
- Acesso: `Admin`.

### Formulário de usuário
- Campos: nome, e-mail, papel, departamento, status.
- **Sem cadastro público** — criação apenas por `Admin` (RF-01 + ADR 0004).
- Validação: e-mail normalizado e único.

### Matriz de papéis e permissões
- Tabela visual com módulos × papéis.
- **Checkboxes desabilitados** — apenas visualização das permissões canônicas (as permissões são fixas por papel no MVP, conforme ADR 0004).

**Estados:** carregando, vazio, validação, sucesso confirmado, sem permissão (`Member` e `Manager` não acessam; `Manager` acessa apenas leitura de usuários, se decidido).

---

## 9. Equipes

- Lista de departamentos com contagem de membros e avatares.
- Ação: criar/editar equipe.
- Acesso: `Admin`; `Manager` pode visualizar a própria equipe.

**Estados:** carregando, vazio, validação, sucesso confirmado, sem permissão.

---

## 10. Identidade visual

- Configuração de logo (upload simulado).
- Configuração de cores primária e secundária (paleta restrita: navy, primary, teal — ver ADR 0005 de tokens).
- Pré-visualização em tempo real dos componentes com as cores aplicadas.
- Aviso explícito de que a configuração é **simulada** neste protótipo; no MVP real, decisão de produto pendente (ver `08-decisoes-pendentes.md`).
- Acesso: `Admin`.

**Estados:** padrão, validação (cores inválidas), sucesso confirmado.

---

## 11. Preferências

### Perfil pessoal
- Nome, e-mail (não editável — alterado por `Admin`), cargo.
- Ação: salvar alterações.

### Notificações (ilustrativas no MVP)
- E-mail ao ser mencionada.
- Resumo diário de tarefas.
- Alertas de devolução de equipamento.
- Notificações de pipeline comercial.

**Estados:** padrão, validação, sucesso confirmado, desabilitado (campos não editáveis).

---

## Estados obrigatórios (transversal a todos os módulos)

- **Padrão:** página preenchida com dados fictícios realistas.
- **Vazio:** primeiro uso sem registros, com CTA adequada ao módulo.
- **Sem resultados:** busca/filtros sem correspondência, com "Limpar filtros".
- **Carregando:** skeleton (sem simular espera desnecessária).
- **Sucesso:** toast de confirmação após ação simulada.
- **Erro:** mensagem específica + orientação para nova tentativa + preservação de dados digitados.
- **Validação:** mensagens próximas ao campo, com foco no primeiro erro.
- **Acesso negado:** tela dedicada, com explicação e caminho de volta.
- **Confirmação:** modal para ações destrutivas ou de impacto (ex.: marcar como ganha, emprestar equipamento, desativar usuário).
- **Desabilitado:** ações indisponíveis com indicação visual clara e, quando útil, tooltip explicativa.

---

## Acessibilidade (transversal)

- Navegação por teclado em todos os fluxos críticos.
- Foco visível (`outline` / ring com contraste).
- Labels associadas aos inputs.
- Contraste mínimo AA (atenção especial ao turquesa `#02DAC6`, que **não** deve ser usado em texto pequeno).
- **Alternativa ao drag-and-drop** no Kanban e no pipeline (dropdown "Alterar status/etapa" no detalhe).
- Não depender só de cor para indicar estado — sempre acompanhar com texto e/ou ícone.
- Áreas clicáveis mínimas de 32×32px (desktop) e 44×44px (toque).

---

## Responsividade

- **Desktop** é o alvo principal (sidebar fixa, tabelas completas).
- **Tablet (≥768px):** sidebar recolhível; grids adaptadas.
- **Mobile (<768px):** sidebar off-canvas; tabelas viram listas/cartões; ações primárias fixas no rodapé da viewport.
- Jornadas críticas a adaptar primeiro: **login, visão geral, demandas (lista/detalhe), perfil de cliente**.

---

## Ver também

- **ADR 0005** — Inclusão do CRM no escopo.
- **ADR 0006** — Navegação e organização dos módulos.
- **RF-01 a RF-10** — Requisitos funcionais.
- `04-modelo-de-dados.md` — Entidades e índices.
