# 4. Modelo conceitual de dados

Modelo inicial para revisão; não gerar migrations até aprovar requisitos e estratégia de identidade/documentos.

## User
Id, DisplayName, Email normalizado, IsActive, CreatedAtUtc e papel/claims conforme mecanismo escolhido. Preferir framework de identidade em vez de armazenar senhas manualmente.

## Department
Id, Name, IsActive.

## Task
Id, Title, Description, Status, Priority, CreatedByUserId, AssigneeUserId opcional, DepartmentId opcional, DueAtUtc opcional, CreatedAtUtc, UpdatedAtUtc, CompletedAtUtc opcional e token de concorrência quando suportado.

## TaskComment (posterior, se necessário)
Id, TaskId, AuthorUserId, Body, CreatedAtUtc.

## Equipment
Id, Name, Category, AssetTag, SerialNumber opcional, Status, Location, Notes, CreatedAtUtc, UpdatedAtUtc.

## EquipmentMovement
Id, EquipmentId, MovementType, PerformedByUserId, AssignedToUserId opcional, OccurredAtUtc, DueAtUtc opcional, Notes. Disponibilidade deve ser consistente e transacional.

## DocumentRecord
Id, DisplayName, OriginalFileName opcional, Description, CategoryId, DepartmentId opcional, OwnerUserId opcional, StorageProvider, ProviderObjectId/referência segura, OriginalLocationUrl opcional, AccessClassification, CreatedAtUtc, UpdatedAtUtc, IsArchived. Não tratar caminho arbitrário do cliente como confiável.

## DocumentCategory, Tag, DocumentTag
Categorias ativas; tags normalizadas e relação muitos-para-muitos. Evitar schema genérico complexo sem necessidade comprovada.

## AuditEvent
Id, ActorUserId opcional para eventos de sistema, Action, ResourceType, ResourceId, OccurredAtUtc, CorrelationId e metadados mínimos não sensíveis. Append-only para usuários normais.

## CorporateLink
Id, Title, Url, Category, IsActive, CreatedByUserId, CreatedAtUtc.

## Relações e índices
Usuário cria/assume tarefas; equipamento tem várias movimentações; documento tem categoria e tags. Email normalizado único; AssetTag único quando preenchido; índices para status/responsável/prazo, estado/patrimônio e campos de busca. Definir exclusão lógica e retenção antes de dados reais.

## CRM (ADR 0005)

### Client
Id, LegalName, TaxId (CNPJ normalizado, único quando preenchido), Segment, OwnerUserId, Status (Ativo/Lead/Inativo), CreatedAtUtc, UpdatedAtUtc.

### Contact
Id, ClientId (FK obrigatório), FullName, Role, Email (normalizado), Phone, CreatedAtUtc, UpdatedAtUtc.

### Opportunity
Id, ClientId (FK obrigatório), Title, EstimatedValue (decimal), Stage (NovoLead/Qualificacao/Proposta/Negociacao/Ganho/Perdido), OwnerUserId, ExpectedCloseAtUtc, CreatedAtUtc, UpdatedAtUtc, Token de concorrência.

### Activity
Id, OpportunityId (FK obrigatório), Type (Reuniao/Ligacao/Email/Nota), Body, AuthorUserId, OccurredAtUtc.

### Alteração em Task
- Adicionar `OpportunityId` (FK nullable) para permitir tarefa de onboarding vinculada.

### Índices
- Client: TaxId único quando preenchido; Status; OwnerUserId.
- Contact: ClientId; Email.
- Opportunity: ClientId; Stage; OwnerUserId; ExpectedCloseAtUtc.
- Activity: OpportunityId; OccurredAtUtc.

### Relações
Cliente 1—N Contatos; Cliente 1—N Oportunidades; Oportunidade 1—N Atividades; Oportunidade 1—N Tarefas (opcional).