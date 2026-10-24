# 1. Product Brief

## Visão
O AgileFlowHub centraliza a organização e pesquisa de documentos, o acompanhamento de demandas, o controle de equipamentos compartilhados e o relacionamento comercial com clientes (CRM leve).

## Problema
Arquivos são salvos em locais diferentes e nomeados de formas inconsistentes. Funcionários perdem tempo navegando por pastas ou perguntando a colegas. Demandas, prazos e equipamentos também podem estar espalhados por planilhas e ferramentas distintas.

## Valor
- Encontrar documentos por metadados mesmo quando o nome não ajuda.
- Padronizar a classificação documental.
- Saber o que precisa ser feito hoje, quem é responsável e o que está atrasado.
- Ver equipamentos disponíveis, emprestados ou em manutenção.
- Manter histórico de alterações e responsabilidades.

## Papéis
- Administrador: usuários, papéis, categorias e configurações.
- Gestor: distribui demandas e acompanha a equipe.
- Funcionário: consulta itens permitidos e atualiza suas demandas.
- Gestor documental/patrimonial: administra documentos/equipamentos conforme permissão.
Papéis podem se acumular, mas cada operação exige autorização explícita.

## MVP
1. Autenticação e autorização.
2. Demandas e quadro Kanban.
3. Painel diário com checklist.
4. Inventário, empréstimo e devolução de equipamentos.
5. Catálogo documental com metadados, tags e pesquisa.
6. Auditoria de ações relevantes.
7. CRM leve: clientes, contatos, oportunidades e atividades vinculadas a tarefas.
8. Testes, CI, configuração por ambiente e documentação operacional.

## Fora do MVP
Sincronização bidirecional genérica com qualquer pasta; app móvel nativo; OCR/classificação por IA sem validação; automações complexas; microsserviços; conectores simultâneos a vários provedores.

## Princípios e métricas
Pesquisar deve ser mais fácil que navegar manualmente; segurança e histórico são requisitos desde o início. Medir tempo para encontrar documentos, metadados completos, tarefas no prazo, tarefas sem responsável e estado dos equipamentos.

## Hipóteses
Interface em português brasileiro, uso inicial via navegador, uma empresa por instalação e uma origem documental prioritária. A aplicação não terá acesso irrestrito ao computador do usuário.
