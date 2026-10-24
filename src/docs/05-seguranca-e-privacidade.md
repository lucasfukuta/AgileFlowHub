# 5. Segurança e privacidade

## Ameaças iniciais
Acesso anônimo/indevido; acesso cruzado entre departamentos; URL direta de documento; upload malicioso/grande; path traversal; segredos em logs; alteração de auditoria; corrida em empréstimos; abuso de endpoints.

## Controles obrigatórios
- Framework de autenticação suportado e autorização no servidor por recurso.
- Validação e normalização de entradas.
- Limite e validação de upload; não confiar apenas em extensão ou Content-Type.
- Nomes internos de arquivo; armazenamento fora de diretórios executáveis; downloads por endpoint autorizado.
- Nunca concatenar caminhos fornecidos pelo usuário.
- Rate limiting e limites de paginação quando apropriado.
- HTTPS remoto; segredos em ambiente/cofre; logs minimizados.
- Auditoria de ações críticas; dependências verificadas; backup e restauração testados.

## Documentos
Filtrar autorização antes de devolver resultados e validar novamente ao abrir/baixar. UUID ou URL difícil de adivinhar não é autorização. Mapear permissões da origem para a aplicação; se não for possível garantir equivalência, restringir o recurso e documentar a limitação.

## Privacidade
Antes de produção, definir dados necessários, finalidade, acesso, retenção/exclusão, resposta a solicitações, backups e resposta a incidentes. Considerar LGPD e políticas da organização; este documento não substitui análise jurídica.

## Checklist por entrega
- [ ] Autorização backend e teste de acesso negado.
- [ ] Entrada validada e limites aplicados.
- [ ] Logs sem segredos/conteúdo confidencial.
- [ ] Erros não revelam detalhes internos.
- [ ] Upload/download protegido, se aplicável.
- [ ] Concorrência/transações revisadas, se aplicável.

## CRM — controles específicos (ADR 0005)

Ameaças adicionais: acesso cruzado a clientes/oportunidades entre departamentos; URL direta de oportunidade; enumeração de CNPJ; alteração de etapa sem autorização; criação de tarefa vinculada a oportunidade alheia; vazamento de valor estimado em logs.

Controles obrigatórios:
- Autorização por recurso em **toda** operação de Client, Contact, Opportunity e Activity (não apenas no endpoint de listagem).
- `Member` só acessa clientes cujo `OwnerUserId == currentUser`. `Manager`/`Admin` acessam conforme ADR 0005.
- URL direta (ID/UUID) **não** é autorização — revalidar no servidor ao abrir, editar, mudar etapa e criar atividade.
- Mudança de etapa é transacional (token de concorrência em `Opportunity`), e registra auditoria com `ResourceType = "Opportunity"`.
- Criação de tarefa de onboarding vinculada é operação composta: valida autorização em `Opportunity` **e** em `Task`; se qualquer uma falhar, aborta tudo (transação única).
- Oportunidade em "Ganho" ou "Perdido" rejeita novas atividades **no servidor** — não confiar apenas no botão desabilitado da UI.
- Logs de erro/evento não incluem valor estimado nem CNPJ; usar `ResourceId` opaco.

Checklist adicional por entrega (CRM):
- [ ] Teste de acesso negado para `Member` em cliente/oportunidade alheia.
- [ ] Teste de URL direta sem permissão retornando 403/404 (não 200).
- [ ] Teste de concorrência em mudança de etapa (último commit vence, ou conflito explícito).
- [ ] Teste de atomicidade da criação de tarefa vinculada (falha em Task = rollback em Opportunity).