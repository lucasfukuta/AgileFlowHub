# ADR 0007 — Design tokens e componentes

- Status: Aceito
- Data: 2026-10-22

## Contexto
O projeto precisa de uma linguagem visual consistente para o protótipo e para a implementação em Blazor. A base é o visual padrão Bootstrap/Blazor já em uso, evoluído com a identidade da marca.

## Decisão

### Paleta
| Token | Valor | Uso |
|---|---|---|
| `--navy` | `#011E5D` | Sidebar, títulos de alto contraste |
| `--primary` | `#4401FC` | Ações primárias, links, seleção |
| `--primary-600` | `#3501C9` | Hover de ações primárias |
| `--primary-50` | `#EEE9FF` | Fundos de destaque suave, tags |
| `--teal` | `#02DAC6` | Destaques pontuais e indicadores positivos (nunca em texto pequeno — verificar contraste) |
| `--bg` | `#F5F7FB` | Fundo geral das páginas |
| `--surface` | `#FFFFFF` | Cards, tabelas, formulários |
| `--text` | `#2B3544` | Texto de leitura |
| `--muted` | `#69778C` | Metadados e descrições |
| `--border` | `#E1E7F0` | Divisórias e limites |
| `--success` | `#0E9F6E` | Estados de sucesso (com rótulo textual) |
| `--warning` | `#B45309` | Alertas (com rótulo textual) |
| `--danger` | `#C81E1E` | Erros e ações destrutivas |

### Tipografia
- Fonte: `Inter`, `-apple-system`, `system-ui`, `sans-serif`.
- Escala: `11px` (labels), `12px` (small), `14px` (body), `16px` (h3), `20px` (h2), `24px` (h1), `28px` (display).
- Peso: `400` corpo, `600` rótulos e títulos, `700` ênfase.

### Espaçamento e raio
- Base `4px`: `4 · 8 · 12 · 16 · 24 · 32 · 48`.
- Raio: `6px` (inputs/botões), `10px` (cards), `14px` (modais).

### Sombras
- `--shadow-sm`: `0 1px 2px rgba(1,30,93,.05)`.
- `--shadow`: `0 1px 3px rgba(1,30,93,.06), 0 8px 24px rgba(1,30,93,.06)`.

### Componentes
- **Button:** variantes `primary` · `secondary` · `ghost` · `danger`; tamanhos `sm` · `md` · `lg`; estados `default` · `hover` · `focus` · `disabled` · `loading`.
- **Input / Select / Textarea:** estados `default` · `focus` · `error` · `disabled`.
- **Tag / Badge:** `neutral` · `success` · `warning` · `danger` · `info` · `teal`.
- **Card**, **Table**, **Tabs**, **Modal**, **Toast**, **EmptyState**, **Skeleton**, **TimelineItem**, **KanbanCard**, **SidebarItem**, **Breadcrumb**.

### Aderência a Bootstrap/Blazor
- Usar, sempre que possível, classes do Bootstrap (`btn-primary`, `card`, `text-muted`, `bg-primary-subtle`).
- Evitar controles excessivamente customizados, animações e efeitos decorativos.
- A logo aparece **uma única vez** (topo da sidebar e na tela de login); não duplicar com o wordmark textual se o arquivo da logo já contiver o nome.

### Acessibilidade
- Foco visível em todos os controles (`outline`/ring com `--primary` a 25% de opacidade).
- Contraste mínimo AA.
- Não depender só de cor para indicar estado.

## Consequências
- Implementação em Blazor deve mapear esses tokens para variáveis CSS e, quando conveniente, para as variáveis do Bootstrap (ex.: `--bs-primary`).
- O protótipo HTML de referência usa essa paleta; ao implementar, manter a paridade visual.
- Alterações futuras de paleta exigem novo ADR.