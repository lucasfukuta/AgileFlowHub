# ADR 0006 — Navegação e organização dos módulos

- Status: Aceito
- Data: 2026-10-22

## Contexto
O mapa inicial de telas (doc 06) previa a navegação:
`Visão geral; Meu dia; Demandas; Equipamentos; Documentos; Links úteis; Administração.`

Com a inclusão do CRM leve (ADR 0005) e após validação de protótipo navegável de alta fidelidade, foi proposta uma organização mais próxima do uso real, com separação clara entre **módulos operacionais** e **área administrativa**, e com a promoção de "Painel diário" e "Auditoria" a itens de navegação de primeiro nível.

## Decisão

### Navegação principal (sidebar — grupo "Principal")
1. **Visão geral** — dashboard com KPIs, próximos prazos e atividades recentes.
2. **Demandas** — Kanban, lista e calendário; detalhe e criação de tarefa.
3. **CRM / Clientes** — lista de clientes, perfil (contatos, oportunidades, atividades, documentos) e pipeline comercial.
4. **Documentos** — catálogo, busca avançada e detalhe.
5. **Equipamentos** — inventário, detalhe, empréstimo e devolução.
6. **Painel diário** — visão de tela cheia com tarefas do dia (substitui "Meu dia").
7. **Auditoria** — lista e detalhe de eventos com filtros.

### Área administrativa (sidebar — grupo "Administração")
1. **Usuários e permissões** — lista de usuários, matriz de papéis (Admin/Manager/Member) e permissões.
2. **Equipes** — departamentos e membros.
3. **Identidade visual** — logo, cores e prévia de marca.
4. **Preferências** — perfil pessoal, notificações e preferências gerais.

### Itens absorvidos
- **"Meu dia"** foi **renomeado** para **"Painel diário"** e promovido a item de primeiro nível. A tela de "Meu dia" descrita no RF-04 permanece a mesma em comportamento; muda apenas o rótulo de navegação e o ponto de acesso. O requisito de que o **checkbox confirme conclusão somente após resposta do servidor** (RF-04) permanece inalterado.
- **"Links úteis"** (RF-09) passa a ser acessado **dentro de Documentos** como uma aba/filtro ("Links corporativos"), evitando um item de menu dedicado para um recurso de baixo volume no MVP.
- **"Meu dia"** deixa de existir como item separado; seu conteúdo é o "Painel diário".

### Topbar
Busca global visual (não funcional no MVP), notificações ilustrativas, ajuda e menu do usuário (nome, papel, logout).

## Alternativas consideradas
- **Manter "Meu dia" como item separado de "Painel diário"**: descartado — duplicaria a mesma intenção e confundiria o usuário.
- **Manter "Links úteis" como item de primeiro nível**: descartado — recurso pequeno no MVP; cabe como aba em Documentos.
- **Criar "CRM" e "Clientes" como itens separados**: descartado — "Clientes" é o ponto de entrada do CRM; um item "CRM / Clientes" cobre o módulo inteiro.

## Consequências
- Doc 06 precisa ser reescrito para refletir esta organização.
- Doc 01 (Product Brief) e Doc 02 (Requisitos) **não precisam mudar** por causa deste ADR — apenas o Doc 06, Doc 07 (para a Fase 6.5) e o protótipo visual.
- A implementação do layout (Fase 1) deve criar a sidebar com **dois grupos visuais** ("Principal" e "Administração"), com o item atual destacado.
- O item "Auditoria" passa a ser acessível a `Admin` e `Manager` (Member **não** acessa — ver RF-08 e RF-01). Se o produto quiser que `Member` veja apenas suas próprias ações, isso deve ser tratado como filtro, não como nova permissão — **decisão adiada** (registrada em `08-decisoes-pendentes.md`).
- A reorganização **não altera** o escopo funcional das Fases 1–6 do roadmap; altera apenas a **arquitetura de informação**.
- **Links corporativos (RF-09):** a mudança é **apenas de navegação**. `CorporateLink` continua sendo entidade própria no domínio e na persistência (doc 04), com endpoints próprios (`/api/corporate-links` ou equivalente). A UI exibe-os como aba de Documentos; não devem ser convertidos em `DocumentRecord` nem compartilhar tabela. Autorização de escrita permanece restrita a `Admin`/`Manager` (RF-09).