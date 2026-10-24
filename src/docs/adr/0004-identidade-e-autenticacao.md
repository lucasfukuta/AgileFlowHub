# ADR 0004 — Mecanismo de Identidade, Autenticação e Papéis

- Status: Aceito
- Data: 2026-10-21

## Contexto
A Fase 2 do roadmap exige autenticação corporativa segura (login/logout), controle de acesso no servidor e gestão de usuários e papéis, com proibição explícita de auto-cadastro público de administradores (RF-01).

## Decisão
1. **Framework:** Utilizar ASP.NET Core Identity com Entity Framework Core e SQLite para ambiente local de desenvolvimento e testes automatizados. O framework garante hash seguro de senhas (PBKDF2/SHA256), proteção de token antiforgery e normalização de e-mails/usuários.
2. **Sessão:** Autenticação baseada em Cookies seguros com flags `HttpOnly`, `SameSite=Lax`, expiração controlada e validação contínua no servidor.
3. **Papéis Canônicos:**
   - **`Admin`**: Gestão de usuários, alteração de status/papéis, auditoria de eventos e configurações globais.
   - **`Manager`**: Gestão operacional de demandas de equipe, equipamentos e autorizações operacionais.
   - **`Member`**: Acesso ao Meu dia, demandas atribuídas, catálogo documental conforme permissões e equipamentos (não pode alterar status de equipamentos de outros membros, somente o que está disponível).
4. **Inicialização / Seed:** O sistema cria os três papéis canônicos no startup caso não existam. Se a base de usuários estiver completamente vazia, inicializa um administrador com credenciais configuráveis para garantir o bootstrap inicial da operação, sem expor dados confidenciais fixos de produção.

## Consequências
- A aplicação possui controle estrito de autorização no servidor em cada endpoint e componente protegido (`[Authorize]`, `[Authorize(Roles = "...")]`).
- Membros comuns não conseguem acessar áreas administrativas nem elevar privilégios.
- Os testes de integração conseguem validar cenários reais de autenticação e negação de acesso (401/403).

## Módulo de Atendimento (ADR 0008)

### Ticket (Chamado)
Id, ClientId (FK), Subject, Status (Aberto/EmAndamento/Resolvido), Priority (Baixa/Média/Alta), AssignedToUserId, CreatedAtUtc, UpdatedAtUtc, IsAiHandled (boolean).

### Message (Mensagem)
Id, TicketId (FK), SenderType (Cliente/Atendente/IA), SenderId (FK opcional para User), Body, CreatedAtUtc.

### AI_AuditLog (Decisões da IA)
Id, TicketId (FK opcional), Action (Responded/Escalated/Classified), ConfidenceScore (decimal), TopicDetected, OccurredAtUtc.

## Módulo de IA e Guardrails (ADR 0009)

### AIConfig (Configuração por tenant)
Id, MinimumConfidence (decimal, default 0.85), ProhibitedTopics (JSON array), IsAutoResponseEnabled (boolean).

## Módulo de Equipes

### DepartmentMetrics (Métricas de Equipe)
Id, DepartmentId (FK), TotalGoals (decimal), AchievedGoals (decimal), OpenTasks (int), LateTasks (int), UpdatedAtUtc.