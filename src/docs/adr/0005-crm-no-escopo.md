# ADR 0005 — Inclusão do CRM (Clientes, Contatos, Oportunidades) no escopo

- Status: Aceito
- Data: 2026-10-22

## Contexto
O Product Brief (01) e o Roadmap (07) definiam o MVP sem CRM. O modelo de dados (04) não possuía entidades de Cliente, Contato ou Oportunidade. Foi solicitada a inclusão de um CRM leve, com fluxo Clientes → Contatos → Oportunidades → Atividades → Tarefas vinculadas, após validação de protótipo visual.

## Decisão
1. O CRM entra como **Fase 6.5** do roadmap, **após** Documentos e **antes** da Integração documental.
2. Entidades mínimas: `Client`, `Contact`, `Opportunity`, `Activity`.
3. Alteração cirúrgica em `Task`: campo `OpportunityId` (FK nullable) para permitir vínculo opcional.
4. Item de navegação: **CRM / Clientes** (ADR 0006).
5. Regras de negócio canônicas:
   - Oportunidade em "Ganho" ou "Perdido" não aceita novas atividades.
   - Marcar como "Ganho" **sugere** (via modal) a criação de uma tarefa de onboarding com `OpportunityId` preenchido.
   - Toda mudança de etapa e toda criação de tarefa vinculada disparam auditoria (RF-08).
6. Autorização herda RF-01: `Member` gerencia apenas clientes atribuídos a ele; `Manager` e `Admin` gerenciam qualquer cliente.
7. **Fora do escopo do MVP-CRM:** automação de follow-up, scoring, integração com e-mail, multi-funil e relatórios analíticos avançados.

## Consequências
- Doc 01, 02, 04, 06, 07 e 08 atualizados.
- Doc 04 recebe as entidades e índices do CRM.
- Testes de autorização e concorrência obrigatórios na Fase 6.5.
- Auditoria passa a registrar `ResourceType = "Opportunity" | "Task"`.