# 7. Roadmap greenfield

Cada fase termina com testes/build e revisão antes de avançar.
A navegação oficial está em **ADR 0006**; a inclusão do CRM em **ADR 0005**.

## Fase 0 — Base do projeto
Criar diretório/repositório independente; verificar SDK; escolher .NET 10; criar solução mínima, Git, README, CI e teste automatizado.
**Saída:** clone limpo compila e testes passam.

## Fase 1 — Esqueleto
Layout com sidebar (dois grupos — ver ADR 0006), topbar, navegação, configuração por ambiente, logging, tratamento de erros e health check.
**Saída:** app shell navegável com placeholders dos módulos da sidebar.

## Fase 2 — Identidade
Login/logout, papéis (`Admin`, `Manager`, `Member`), gestão de usuários e testes de autorização (401/403).
**Saída:** `Member` não acessa Administração; `Admin` gerencia usuários; testes de autorização negada passam.

## Fase 3 — Demandas
CRUD, estados, prioridade, responsável, prazo, Kanban, lista, calendário, filtros e histórico.
**Saída:** transições de estado persistem; alternativa ao drag-and-drop funcional; testes de transição inválida negada pelo servidor.

## Fase 4 — Painel diário
Hoje/atrasadas/concluídas, checkbox persistente (confirmação **apenas após resposta do servidor**), filtros e estados de interface.
**Saída:** RF-04 aceito integralmente, incluindo repetição sem duplicar histórico e erro de rede com feedback.

## Fase 5 — Equipamentos
Inventário, empréstimo/devolução, histórico e testes de concorrência.
**Saída:** operações atômicas impedem empréstimos simultâneos; estados `Disponível`, `Emprestado`, `Em manutenção`, `Baixado` implementados; testes de concorrência passam.

## Fase 6 — Catálogo documental
Categorias, tags, metadados, busca, paginação, autorização e auditoria.
**Links corporativos (RF-09)** implementados como entidade própria, expostos como aba dentro de Documentos (ADR 0006).
**Saída:**
- Busca e download respeitam permissões; URL direta não contorna autorização; paginação estável; testes de autorização passam.
- Aba "Links corporativos" funcional: lista, criação/edição por `Admin`/`Manager`, consulta por `Member`, validação de URL, estados de vazio/sem resultados/erro.
- Auditoria registra criação/edição/desativação de link (`ResourceType = "CorporateLink"`).

## Fase 6.5 — CRM leve (ADR 0005)
Clientes, contatos, oportunidades, pipeline e atividades. Vínculo opcional de Tarefa a Oportunidade (`OpportunityId`). Fluxo cliente → oportunidade → atividade → ganho → tarefa vinculada.
**Saída:** fluxo completo navegável com testes de sucesso, erro, autorização e concorrência em mudança de etapa; auditoria registra mudança de etapa e criação de tarefa vinculada.

## Fase 6.8 — Atendimento e IA
Implementação do Help Desk (Ticket/Message) e configuração dos guardrails de IA (Regras de IA). Integração com RAG para respostas automáticas. Testes de escalação e Human Takeover.
**Saída:** Tela de Atendimento funcional, IA respondendo com base na base de conhecimento, logs de auditoria e tela de configuração de IA.

## Fase 6.9 — Funcionários e Equipes
Implementação da tela de diretório (Funcionários) com busca e visualização Grade/Lista. Implementação dos cards ricos de Equipes com métricas agregadas.
**Saída:** Diretório funcional (Grade/Lista), cards de equipe com métricas, integração com `DepartmentMetrics`.

## Fase 7 — Integração documental
Confirmar provedor; implementar uma integração de ponta a ponta; mapear permissões, erros e arquivos movidos/excluídos. Busca de conteúdo/OCR só se priorizada.

## Fase 8 — Produção
Escolher banco/hospedagem/armazenamento; configurar HTTPS, segredos, backups, restauração, monitoramento, análise de segurança, smoke test e rollback. Deploy somente com autorização explícita.

## Definition of Done
Critérios atendidos; testes e build executados; segurança/acessibilidade revisadas; documentação atualizada; limitações reportadas; nenhuma mudança destrutiva sem aprovação.