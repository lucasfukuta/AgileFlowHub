# 8. Decisões pendentes

Responder antes de implementar integração documental ou implantação. Não inventar respostas.

## Origem dos arquivos
- [ ] Pastas locais Windows
- [ ] Compartilhamento de rede/servidor
- [ ] OneDrive/SharePoint
- [ ] Google Drive
- [ ] Vários locais
- [ ] Outro: ______

## O que fazer com arquivos
- [ ] Catalogar e abrir na origem
- [ ] Guardar arquivos no AgileFlowHub
- [ ] Ambas as opções
- [ ] Mover/renomear com confirmação e auditoria

## Pesquisa
- [ ] Nome, tags e metadados
- [ ] Conteúdo de PDFs/Office
- [ ] OCR de documentos digitalizados
- Formatos prioritários: ______

## Organização e identidade
- [ ] Uma empresa por instalação
- [ ] Várias empresas isoladas
- Usuários simultâneos estimados: ______
- Login/senha da aplicação, Microsoft Entra ID ou outro: ______

## Hospedagem e dados
- Local, servidor próprio, nuvem ou indefinido: ______
- Banco exigido/preferido: ______
- Infraestrutura existente: ______
- Backup e recuperação necessários: ______
- Precisamos importar dados existentes? ______

## Regras de negócio
- Quem cria demandas? ______
- Pode haver vários responsáveis? ______
- Precisa de aprovação para concluir? ______
- Notificações/recorrência no MVP? ______
- Tipos prioritários de equipamento e uso de patrimônio/código de barras: ______

## CRM (novo — ADR 0005)
- [ ] CRM entra no MVP ou é fase posterior? (recomendação: **Fase 6.5, após Documentos**)
- [ ] Oportunidade em "Ganho" ou "Perdido" bloqueia novas atividades? (recomendação: **sim**)
- [ ] Etapa "Ganho" **sugere** tarefa de onboarding (modal) ou cria automaticamente? (recomendação: **sugere, com confirmação**)
- [ ] Probabilidade por etapa é fixa ou editável? (recomendação: **fixa por etapa no MVP-CRM**)
- [ ] Relatório comercial (oportunidades por etapa, conversão) entra no MVP-CRM? (recomendação: **depois**)
- [ ] Multi-funil (vários pipelines simultâneos) é necessário? (recomendação: **não no MVP-CRM**)
- [ ] `Member` pode criar oportunidades ou apenas `Manager`/`Admin`? (recomendação: **Member cria para clientes atribuídos a ele; `Manager`/`Admin` para qualquer cliente**)

## Navegação e módulos (ADR 0006)
- [x] **Decidido:** "Links corporativos" ficam como **aba dentro de Documentos** (não item de menu próprio). ADR 0006.
  - Reavaliação futura: se o volume de links crescer significativamente, promover a item de primeiro nível via novo ADR.
- [ ] `Member` acessa Auditoria com escopo limitado às próprias ações ou **não acessa**? (recomendação: **não acessa**; escopo pessoal, se necessário, será filtro futuro)
- [ ] `Manager` acessa "Usuários e permissões" em modo somente leitura? (recomendação: **sim, somente leitura**; escrita apenas `Admin`)

## Design tokens (ADR 0005 de tokens)
- [ ] Confirmar paleta `#011E5D`, `#4401FC`, `#02DAC6`, `#F5F7FB`, `#FFFFFF`, `#2B3544`, `#69778C`, `#E1E7F0`.
- [ ] Confirmar aderência ao visual Bootstrap/Blazor (uso preferencial de `btn-primary`, `card`, `text-muted`).