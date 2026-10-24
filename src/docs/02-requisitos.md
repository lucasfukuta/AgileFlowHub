# 2. Requisitos e critérios de aceitação

## RF-01 Identidade e acesso
Login/logout seguros; administração de usuários e papéis; sem cadastro público de administrador; autorização por recurso no servidor.
**Aceite:** usuário anônimo não acessa dados privados e funcionário não consegue executar ações administrativas chamando a API diretamente.

## RF-02 Demandas
Campos mínimos: título, descrição, estado, prioridade, criador, responsável, criação e prazo opcional. Estados: A fazer, Em andamento, Em revisão, Concluída e Cancelada.
**Aceite:** CRUD autorizado; filtros por estado/responsável/prioridade/prazo; histórico de estado e responsável; demanda concluída deixa de aparecer como pendente; falha de salvamento não aparenta sucesso.

## RF-03 Kanban
Colunas representam estados válidos; cartões mostram título, responsável, prioridade e prazo. Arrastar/soltar é opcional e deve haver alternativa acessível.
**Aceite:** estado persiste após recarga; transições inválidas são recusadas pelo servidor.

## RF-04 Painel diário
Mostrar demandas de hoje, atrasadas e concluídas; checkbox de conclusão ligado ao backend; filtros por responsável/equipe conforme permissões.
**Aceite:** confirmar conclusão somente após resposta do servidor; repetição não duplica histórico; erro de rede oferece feedback e nova tentativa.

## RF-05 Equipamentos
Campos: nome, tipo, patrimônio/serial, estado, localização, observações e responsável atual. Estados: Disponível, Emprestado, Em manutenção, Baixado. Registrar empréstimo/devolução e histórico.
**Aceite:** operações atômicas impedem empréstimos simultâneos; itens em manutenção/baixados não podem ser emprestados.

## RF-06 Catálogo e pesquisa
Metadados: título, nome original, categoria, departamento, tags, responsável, descrição, origem/localização, classificação de acesso e datas. Pesquisa por nome/metadados, filtros combinados, paginação e links autorizados.
**Aceite:** busca e download respeitam permissões; URL direta não contorna autorização; resultados paginados. Busca no conteúdo PDF/Office e OCR são capacidades separadas, não presumidas.

## RF-07 Padronização
Categorias e campos obrigatórios configuráveis; orientação de classificação; convenção sugerida configurável, por exemplo `AAAA-MM-DD_Departamento_Tipo_Assunto_Versao`. Nunca renomear arquivos externos silenciosamente.

## RF-08 Auditoria
Registrar mudanças de estado/responsável, empréstimos/devoluções e alterações de permissão. Guardar ator, ação, recurso e data/hora, apenas com dados necessários. Usuários comuns não alteram a auditoria.

## RF-09 Links corporativos
Links internos com título, URL, categoria e estado ativo/inativo; edição autorizada e validação de URL.

## RF-10 CRM leve
Campos de Cliente: razão social, CNPJ (validado), segmento, responsável, situação (Ativo/Lead/Inativo).
Campos de Contato: nome, cargo, e-mail (validado), telefone, FK Cliente.
Campos de Oportunidade: título, valor estimado (decimal), etapa (Novo lead, Qualificação, Proposta, Negociação, Ganho, Perdido), responsável, data prevista de fechamento, FK Cliente.
Campos de Atividade: tipo (Reunião, Ligação, E-mail, Nota), descrição, FK Oportunidade, autor, data/hora UTC.
Vínculo opcional: Tarefa pode referenciar `OpportunityId`.

**Aceite:**
- Todas as operações exigem autorização por recurso (herda RF-01).
- Marcar oportunidade como "Ganho" permite criar tarefa de onboarding com `OpportunityId` preenchido.
- Auditoria registra mudanças de etapa e criação de tarefa vinculada (herda RF-08).
- URL direta de oportunidade de outro departamento não contorna autorização.
- Oportunidade em "Ganho" ou "Perdido" não aceita novas atividades.

## Requisitos não funcionais
- Segurança: validação de entrada, autorização por recurso, proteção XSS/CSRF conforme arquitetura, limites de upload, rate limiting quando adequado.
- Privacidade: minimização, retenção e exclusão definidas antes de produção; observar LGPD aplicável.
- Confiabilidade: transações para operações críticas e erros previsíveis.
- Desempenho: paginação e índices para consultas frequentes.
- Acessibilidade: teclado, foco visível, labels e contraste.
- Operação: logs estruturados sem segredos, health checks, backup e teste de restauração.

## Definition of Done
Critérios atendidos, testes de sucesso/erro/autorização, build executado, documentação atualizada, nenhum segredo versionado e limitações declaradas.
