# 3. Arquitetura proposta

## Direção
Monólito modular, simples de desenvolver e operar. Sem microsserviços no MVP.

## Stack inicial
- C# e ASP.NET Core sobre .NET 10 LTS, conforme SDK estável disponível no ambiente.
- Blazor Web App para manter a stack majoritariamente em C# e reduzir complexidade inicial.
- Entity Framework Core.
- SQLite no desenvolvimento; banco de produção pendente até definir hospedagem, concorrência e backup.
- Testes unitários e de integração; E2E para jornadas críticas.
- CI com restore, build, testes e verificação de dependências.
- Verificar `dotnet --info` e escolher versão LTS suportada disponível; registrar a decisão.

## Estrutura sugerida
Estrutura inicial aprovada: `src/AgileFlowHub.Web/`, `tests/AgileFlowHub.UnitTests/`, `docs/` e `.github/workflows/`. Os projetos `Application`, `Domain`, `Infrastructure` e testes de integração serão adicionados quando houver regras ou integrações que justifiquem sua separação. Não criar projetos mecanicamente se isso gerar complexidade desnecessária.

## Módulos
Identidade/autorização; demandas/histórico; equipamentos/movimentações; documentos/metadados/busca (incluindo links corporativos); painel; auditoria; crm (clientes, contatos, oportunidades, atividades — ADR 0005).

### Nota sobre "links corporativos"
Os **links corporativos** (RF-09) são uma **capacidade distinta** de Documentos, mas **não um módulo de navegação próprio** (ADR 0006). Arquiteturalmente:

- **Domínio e persistência:** `CorporateLink` é entidade própria (doc 04), com tabela, campos e endpoints próprios. Não é um tipo de `DocumentRecord`.
- **UI:** aparecem como **aba "Links corporativos" dentro de Documentos** (doc 06), não como item de menu.
- **Autorização:** herdam RF-01 e RF-09 — validação no servidor por recurso, com regra "somente usuários autorizados editam".
- **Justificativa:** o volume de links no MVP é baixo e o caso de uso ("encontrar informação") é o mesmo de Documentos; promover a item próprio criaria ruído de navegação sem ganho.
- **Evolução:** se o volume de links crescer de forma significativa, a promoção a item de primeiro nível é **reavaliável por novo ADR** — não deve ser feita silenciosamente.

## Persistência
IDs estáveis, chaves estrangeiras, datas UTC, migrations revisadas, transações para operações críticas, índices em filtros e paginação estável. Definir retenção/exclusão antes de dados reais.

## Identidade
Escolher mecanismo após confirmar hospedagem e contas corporativas. Cookies exigem configuração CSRF e flags seguras; tokens exigem estratégia de armazenamento, expiração e mitigação de XSS. Nunca usar segredo fixo em produção.

## Documentos
Separar a lógica de negócio dos adaptadores de armazenamento. Decidir se o sistema cataloga links, armazena arquivos ou ambos; escolher uma única origem inicial; mapear permissões; lidar com arquivos movidos/excluídos/versões; decidir se precisa busca por conteúdo.
A aplicação web não tem acesso irrestrito ao Explorador de Arquivos. Pastas locais/rede exigem agente, permissões explícitas ou integração adequada. Não criar sincronização bidirecional genérica no MVP.

**Links corporativos:** entidade própria, com endpoints próprios, exposta na UI como aba de Documentos. A decisão de armazenar arquivos, catalogar links externos ou ambos continua pendente (ADR 0002) e é independente dos links corporativos internos.

## Ambientes
Configuração separada por ambiente; segredos em variáveis/cofre; arquivos de exemplo sem valores sensíveis; HTTPS em ambientes remotos; logs sem credenciais/conteúdo; health checks, backup e rollback documentados.

## ADRs
Registrar contexto, opções, decisão, consequências e data em `docs/adr/` para decisões significativas.

## Nota (2026-10-22) — Origem documental e CRM
A origem documental segue pendente (ver `docs/adr/0002-estrategia-documentos.md` e `08-decisoes-pendentes.md`). O CRM (Fase 6.5) **não depende** dessa decisão e pode ser implementado em paralelo às negociações de origem documental.