# AGENTS.md — AgileFlowHub

## Papel
Atue como parceiro de engenharia. Converta requisitos em entregas pequenas, testadas, seguras e compreensíveis. Não invente decisões de produto.

## Antes de cada tarefa
- Leia este arquivo e os documentos relevantes em `docs/`.
- Inspecione workspace e Git; confirme a raiz antes de criar arquivos.
- Apresente plano curto, arquivos afetados, critérios de aceite e riscos.

## Segurança operacional
- Não apague/sobrescreva arquivos não relacionados nem altere outros repositórios.
- Não faça commit, push, deploy, crie infraestrutura paga ou altere serviços externos sem autorização explícita.
- Nunca versione senhas, tokens, connection strings privadas, chaves JWT ou certificados.
- Não use dados reais de funcionários/documentos em seeds, fixtures, logs ou screenshots.
- Não diga que testes passaram sem executá-los; não desative testes para obter build verde.

## Regras de implementação
1. Comece com monólito modular simples; não use microsserviços sem necessidade demonstrada.
2. Valide entradas no servidor e aplique autorização no servidor em cada endpoint/recurso.
3. Proteger documentos, downloads e resultados de busca; URL ou ID difícil de adivinhar não é autorização.
4. Nunca aceite caminhos arbitrários do cliente; proteja contra path traversal e uploads maliciosos.
5. Operações críticas (empréstimo de equipamento, mudança de etapa de oportunidade, criação de tarefa vinculada a oportunidade) devem ser atômicas e resistentes à concorrência.
6. Armazene datas em UTC e exiba-as no fuso configurado.
7. Use paginação, estados de carregamento/vazio/erro e feedback claro.
8. Escreva testes junto com as regras implementadas.
9. Não implemente integração com arquivos locais, rede, OneDrive/SharePoint ou Google Drive sem decisão explícita.
10. Não declare funcionalidade pronta se for mock, dado fixo ou botão sem ação.
11. Atualize documentação e migrations; nunca crie segredo fixo para produção.
12. Antes de criar/alterar entidade, leia `04-modelo-de-dados.md` **e** os ADRs relacionados (0005 para CRM, 0006 para navegação). Não crie FK por analogia ao protótipo visual; siga o modelo aprovado.
13. Campos que aparecem em protótipo mas não existem no modelo (ex.: cliente em Task) devem ser tratados como "não implementar" — e a divergência reportada, não corrigida silenciosamente.
14. **Navegação ≠ domínio.** Que uma entidade apareça na UI dentro de outra área (ex.: `CorporateLink` como aba de Documentos) **não** significa que deve ser fundida com a entidade "hospedeira" (`DocumentRecord`) nem compartilhar tabela. Consultar doc 03 §"Nota sobre links corporativos" e ADR 0006 antes de decidir.

## Escopo funcional (resumo)
- Demandas e Kanban (Fase 3)
- Painel diário (Fase 4)
- Equipamentos e empréstimos (Fase 5)
- Documentos e catálogo (Fase 6)
- CRM leve: clientes, contatos, oportunidades, atividades (Fase 6.5 — ADR 0005)
- Auditoria (transversal, RF-08)
- Administração: usuários, equipes, identidade visual, preferências

A navegação oficial está em **ADR 0006**. Design tokens em **ADR 0007**.

## Documentos históricos vs. vivos
- `docs/09-prompt-inicial.md` é **histórico** da primeira sessão de planejamento — não reescrever.
- `AGENTS.md`, `docs/03-arquitetura.md`, `docs/04-modelo-de-dados.md`, `docs/06-ux-e-telas.md` e ADRs são **vivos** e devem refletir a decisão corrente.

## Stack inicial proposta
C#, ASP.NET Core, Blazor Web App, Entity Framework Core, SQLite para desenvolvimento, testes automatizados e CI. Verifique `dotnet --info` e escolha uma versão LTS suportada disponível no ambiente. Decida o banco de produção antes do deploy.

## Fluxo obrigatório
1. Resumir objetivo e critérios.
2. Inspecionar código relevante.
3. Propor a menor mudança útil.
4. Implementar código e testes.
5. Executar testes/build e relatar resultados reais.
6. Revisar autorização, validação, acessibilidade e erros.
7. Atualizar docs e informar limitações/próximos passos.

## Definition of Done
Critérios atendidos, testes relevantes executados, build verificado, segurança revisada, documentação atualizada e limitações declaradas.
