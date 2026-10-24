# ADR 0009 — Estratégia de IA, Automação e Guardrails

- Status: Aceito
- Data: 2026-10-24

## Contexto
A IA deve atuar de forma autônoma no atendimento para não travar o cliente aguardando aprovação humana. Porém, ela não pode inventar respostas, negociar valores ou quebrar regras de negócio.

## Decisão

1. **IA Copiloto Autônoma com Guardrails:** A IA responde em tempo real no Atendimento, mas apenas dentro de limites estritos.
2. **Base de Conhecimento (RAG):** A IA só pode responder usando documentos com classificação "Todos" ou "Público" no módulo de Documentos. Nenhuma resposta fora do RAG é permitida.
3. **Tópicos Proibidos (Blacklist):** A IA não responde sobre preços, contratos, questões jurídicas ou reclamações formais. Se detectar, escala para humano.
4. **Confiança Mínima:** Se a IA não tiver 85% de confiança, ela responde com um *fallback* ("Vou verificar e já te retorno") e escala.
5. **Human Takeover:** Um atendente pode assumir a conversa a qualquer momento. A IA para imediatamente.
6. **Auditoria:** Toda resposta ou decisão da IA é registrada na auditoria com timestamp e nível de confiança.
7. **Classificação de Documentos:** A IA sugere categoria, tags e nível de acesso ao subir um arquivo. O humano aprova antes de salvar.

## Consequências
- Nova tela de administração "Regras de IA" (`/admin/ia`).
- Necessidade de integração com LLM no backend.
- Novo serviço de auditoria para decisões da IA.