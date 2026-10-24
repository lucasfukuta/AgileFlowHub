# ADR 0001 — Stack inicial
- Status: Aceito
- Data: 2026-10-20

## Contexto
Projeto greenfield com interesse em C#/.NET e necessidade de manutenção simples.

## Opções
1. ASP.NET Core + Blazor Web App + EF Core.
2. ASP.NET Core API + frontend independente.
3. Outra stack conforme exigências organizacionais.

## Decisão
Começar com ASP.NET Core/Blazor Web App sobre .NET 10 LTS, SDK 10.0.402, e testes. A base inicial contém `src/AgileFlowHub.Web/` e `tests/AgileFlowHub.UnitTests/`. SQLite e Entity Framework Core permanecem adiados até haver modelo de dados aprovado; o banco de produção será decidido antes do deploy.

## Consequências
Stack majoritariamente C# e adequada para aprendizado/manutenção. A estrutura mínima reduz complexidade inicial. Reavaliar Blazor se requisitos reais apontarem outra direção. Banco de produção, identidade e origem documental ainda não estão definidos.
