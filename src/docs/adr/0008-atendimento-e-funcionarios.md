# ADR 0008 — Atendimento ao Cliente e Diretório de Funcionários

- Status: Aceito
- Data: 2026-10-24

## Contexto
O sistema necessita centralizar a comunicação com o cliente e facilitar a comunicação interna. O CRM atual cobre vendas, mas não o suporte pós-venda ou dúvidas operacionais. Além disso, funcionários precisam de um diretório para encontrar colegas (e-mails, telefones, equipes) sem depender de sistemas externos.

## Decisão

### 1. Módulo de Atendimento (Help Desk)
- Adicionar o item **Atendimento** na navegação principal (abaixo de CRM).
- Layout em 3 colunas: Fila de Chamados (Esquerda), Chat (Centro), Detalhes do Cliente (Direita).
- **Integração com Demandas:** O atendente pode criar uma `Task` diretamente do chat, vinculando o cliente e o histórico.
- O chat é uma simulação visual (MVP). Integrações reais (WhatsApp, E-mail) ficam para fases futuras.
- Acesso: Todos os funcionários (`Member` vê a fila pública e seus chamados; `Manager`/`Admin` veem todos).

### 2. Diretório de Funcionários
- Adicionar o item **Funcionários** na navegação principal.
- Tela com visualização em **Grade** (cards com foto, nome, cargo, e-mail, telefone, equipe) e **Lista** (tabela com os mesmos dados).
- **Regra de Acesso:** Todos os funcionários podem ver o diretório. **Não** exibe permissões ou papéis de acesso.

### 3. Tela de Equipes
- Promover o item **Equipes** para a navegação principal.
- Exibir cards ricos com: membros (fotos), métricas de resultado (ex: Metas, Negociação, Atrasos) e barra de progresso do Kanban.
- Edição de equipes restrita ao `Admin`.

## Consequências
- Novas entidades de banco: `Ticket`, `Message`, `DepartmentMetrics`.
- Novo item na sidebar (Atendimento, Funcionários, Equipes).
- Atualização dos Docs 04 (Modelo) e 06 (UX).