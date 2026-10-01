# DESIGN.md — Sistema de design do Pergunta ao Zé

Este documento é a fonte de verdade para todas as decisões visuais e de voz
do projeto. Qualquer mudança de design deve obedecer ao que aqui está —
ou atualizar este documento primeiro, com motivo.

> Útil primeiro, engraçado depois. Sempre.

---

## 1. Princípios

1. **Útil primeiro** — uma piada nunca pode atrapalhar quem está stressado.
   Utilidade mede-se em: passos corretos, fonte oficial, contacto à mão.
2. **Humor com regras** — o Zé goza com a burocracia (filas, senhas,
   formulários), nunca com o utilizador nem com a situação dele. Ver §7.
3. **Independência visível** — não somos o Estado. O disclaimer está sempre
   presente; o visual não pode imitar o design system do Estado (Ágora) ao
   ponto de gerar confusão.
4. **Portugalidade pela linguagem, não pelo folclore** — "senha", "fila",
   "B-23", "guia chatos". Não usamos padrões de azulejo em fundos, galos,
   bandeiras ou calçada decorativa (ver §11, decisões registadas).
5. **Acessibilidade não é opcional** — serviço público é para todos:
   contraste AA, foco visível, `prefers-reduced-motion` respeitado.
6. **Conversação é o produto** — a homepage abre com uma bolha do Zé, os
   exemplos são mini-conversas, o chat é o centro. O site parece o produto.

## 2. Marca

### 2.1 Nome e assinatura

- Nome: **Pergunta ao Zé** — a marca é o gesto do utilizador.
- Tagline: *"Os serviços públicos, sem fila nem senha."*
- Personagem: o **Zé** — descendente espiritual do Zé Povinho: o cidadão
  comum que já passou pelas filas todas e sabe os atalhos. Não é mascote
  colada; é o conceito do produto.

### 2.2 Dois símbolos, dois papéis

| Símbolo | Ficheiro | Onde se usa |
|---|---|---|
| **ZeMark** — balão verde com "Zé" | `components/ZeMark.tsx` | Logotipo (header, footer), favicon. Só marca. |
| **ZeFace** — balão verde com cara | `components/ZeFace.tsx` | Avatar do Zé no chat, hero, estado vazio, 404, CTA. Só personagem. |

Regras:
- O ZeFace aparece **uma vez por contexto** — é quem fala, não é papel de
  parede. Nunca em cada cartão, nunca em fundos.
- Rotações suaves permitidas (`-rotate-3`, `rotate-3`) para dar vida.
- Cores fixas: verde `#046a38`, cara branca, pupilas `#0b3d24`.

### 2.3 Cartão de partilha

`app/opengraph-image.tsx` gera o OG card: fundo creme, balão + nome +
tagline + URL + "Grátis. Sem registo.". Atualizar se a identidade mudar.

## 3. Cores

### 3.1 Tokens (`app/globals.css` → `@theme`)

| Token | Hex | Papel semântico |
|---|---|---|
| `--color-paper` | `#faf8f4` | Fundo base — calor editorial |
| `--color-ink` | `#1b1d22` | Texto principal |
| `--color-band-verde` | `#046a38` | **Ação** — botões primários, foco, bolhas do utilizador, "avançar" |
| `--color-band-verde-escuro` | `#035129` | Hover de ação, bandas escuras |
| `--color-band-vermelho` | `#d5232f` | **Aviso/negação** — "não faz", alertas. Nunca decoração |
| `--color-azulejo` | `#1d4f9c` | **Fonte oficial/link externo** — cartões de fonte, links gov |
| `--color-azulejo-suave` | `#eef3fb` | Superfície de fonte (hover, fundo suave) |

Neutros: escala `stone` do Tailwind (bordas `stone-200`, texto secundário
`stone-500/600`, desativado `stone-400`).

### 3.2 Regras de cor

- **Verde = agir.** Botão primário é sempre verde; nada mais o é.
- **Azul = fonte oficial.** Links para fora usam azul; confiança visual.
- **Vermelho = apenas aviso/negação** ("Não faz", erros). Proibido como
  acento decorativo — foi essa a lição da risca de bandeira.
- **Verde sobre branco/cream**: `#046a38` tem contraste 7.9:1 → AA/AAA.
  Verde claro para texto: mínimo `#0f6b4f` sobre fundos claros.
- `::selection` verde — detalhe de marca subtil.

## 4. Tipografia

| Papel | Fonte | Peso |
|---|---|---|
| Títulos (h1, h2, h3), citações, marca | **Newsreader** (serif editorial) | 500–600, `tracking-tight` |
| Corpo, UI, botões, tabelas | **Inter** | 400–500 |
| Metadados/etiquetas | Inter, `uppercase`, `tracking-wide`, `text-[11px]` | 500 |

Escala em uso (rem): `0.6875` meta · `0.8125` small · `0.9375` body-sm ·
`1.125` lead · `1.5–1.55` h3 · `2.25–3` h2 · `3.4–4.5` h1.

Regras:
- Serif = voz e editorial; sans = funcional. Nunca misturar no mesmo elemento.
- Line-height: títulos `1.05–1.1`, corpo `relaxed`.
- O italic da Newsreader é reservado para citações/exemplos.

## 5. Layout e forma

- **Containers**: `max-w-3xl` (hero, FAQ, conversas) · `max-w-5xl`
  (header/footer) · `max-w-6xl` (secções de conteúdo).
- **Ritmo vertical**: secções `py-20`, hero `pt-14 md:pt-20`.
- **Raios**: `rounded-2xl` para bolhas de chat · `rounded-[1.75rem]` para
  cartões · `rounded-full` para pills/botões/chips.
- **Cantos de bolha**: bolha do utilizador `rounded-br-sm`; do Zé
  `rounded-tl-sm` — a geometria diz quem fala.
- **Sombras**: discretas — `shadow-sm` em cartões; elevada só no hover
  (`hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)]`) e na caixa hero.
- **Bordas**: `border-stone-200` por defeito; `border-stone-300` em inputs.

## 6. Componentes

### 6.1 Inventário atual

| Componente | Ficheiro | Notas |
|---|---|---|
| Header | `Header.tsx` | Sticky, disclaimer verde no topo, ZeMark + wordmark, CTA |
| HeroBox | `HeroBox.tsx` | Caixa de pergunta com placeholder animado + cartão rotativo por baixo |
| Chat | `Chat.tsx` | Bolhas, avatar ZeFace, fontes com contactos, sugestões |
| TemaArt | `TemaArt.tsx` | Banda pastel + pontilhado + cartão branco com ícone Lucide |
| FloatingAsk | `FloatingAsk.tsx` | Pill flutuante "Pergunta ao Zé" |
| Fontes (página) | `app/fontes/page.tsx` | Cartões por entidade: telefone, horário, email, links |
| Footer | `Footer.tsx` | Wordmark, disclaimer, autor, links sociais |

### 6.2 Estados obrigatórios

Todo o elemento interativo tem de ter:
- `:hover` — mudança visível (cor, elevação ou deslocamento ≤4px)
- `:focus-visible` — anel verde `ring-band-verde` (ver §8)
- `disabled` — `opacity-40` + `cursor-not-allowed`
- Transição `transition-colors` ou `transition-all` ≤300ms

### 6.3 Regras específicas

- **Botão primário**: `bg-band-verde` pill, texto branco, hover
  `bg-band-verde-escuro`. Só existe um primário por vista.
- **Cartão de fonte**: azul (`azulejo`) para o título + domínio ↗ —
  azul = "isto é oficial e está lá fora".
- **Faixa "Ligar:"**: fundo `stone-50`, telefone em `font-medium` — frio
  e legível, sem decoração.
- **Ilustração de tema**: sempre `TemaArt` — pastel + dots + cartão
  inclinado com ícone Lucide `strokeWidth={1.6}`. Ícones novos só da
  Lucide, mesmo peso.

## 7. Voz e tom

### 7.1 A matriz do humor

| Contexto | Humor? | Exemplo aprovado |
|---|---|---|
| Hero/tagline/placeholder | ✔ leve | "sem apanhar a fila das 7h" |
| Estado vazio/loading do chat | ✔ | "A folhear os guias oficiais…" |
| 404 | ✔ | "Esta página entrou para a fila e nunca mais voltou." |
| FAQ/footer | ✔ leve | "Nem sequer temos onde meter um IBAN." |
| **Corpo das respostas** | ✖ nunca | passos curtos, factuais |
| **Temas sensíveis** (desemprego, saúde, óbito, multas, dívidas, imigração em vulnerabilidade) | ✖ | máximo: abertura neutra |
| Erros técnicos | ✖ | erro claro + solução |
| Emojis | ✖ em respostas; ✔ raros em marketing | o Zé é a cara — não precisa de emojis |

### 7.2 Gramática

- Português europeu sempre: "dirige-te", "inscreve-te", gerúndio proibido
  ("está a carregar", não "carregando"), "ecrã" não "tela", "telemóvel".
- Frases curtas. Passos em imperativo informal ("Agenda", "Leva").
- O Zé fala em 1.ª pessoa só para se apresentar: "já li os guias chatos
  por ti". Nas respostas, some — não há "eu acho".

### 7.3 Proibido escrever

- Piadas sobre temas sensíveis (§7.1)
- Goço com o utilizador, a entidade ou os funcionários
- "Nós" institucional — somos um projeto de uma pessoa; "o Zé" ou "nós"
  informal conforme o contexto
- Promessas absolutas ("resolve tudo", "sempre correto")

## 8. Acessibilidade

- Contraste de texto ≥ 4.5:1 (AA). Cores semânticas já o cumprem.
- `:focus-visible` em todos os interativos: anel `ring-2 ring-band-verde
  ring-offset-2 ring-offset-paper`.
- `aria-label` em ícones-only, `aria-hidden` em decorativos, `sr-only`
  para contexto extra.
- `prefers-reduced-motion`: animações desligadas (ver §9).
- Ilustrações (`TemaArt`) são `aria-hidden` — decoração, nunca informação.
- Toque mínimo 44×44px nos alvos de toque em mobile.

## 9. Motion

- Micro-animações existentes: `fade-in-up` (cartão de exemplo),
  `caret-blink` (placeholder), `faq-plus` (rotação do +), hovers.
- Durações: ≤300ms transições; ≤450ms entradas. Easing `ease`.
- Deslocamento: translate ≤4px em hover; ≤10px em entradas.
- `prefers-reduced-motion`: desligar caret, typewriter e translates.
- O Zé pode "escrever" (typing dots) — única animação de status
  permitida para além do texto de loading.

## 10. Conteúdo e dados

- Só fontes oficiais verificadas (`curl`/browser antes de entrar).
- Contactos: telefone + horário + email/formulário, sempre da página
  oficial. Horários de balcões físicos → link para o localizador (Siga),
  nunca inventados.
- Respostas: 3–5 passos; nota âmbar (`amber-50`) para exceções.

## 11. Decisões registadas (não voltar atrás sem motivo)

| Data | Decisão | Motivo |
|---|---|---|
| 2026-10 | Removidos azulejo em fundo, calçada, faixa de bandeira, Galo de Barcelos | "Mudança por mudança" — ficou folclórico, não português |
| 2026-10 | ZeMark/ZeFace = único sistema visual de personagem | Coerência logo↔mascote |
| 2026-10 | Identidade portuguesa pela linguagem, não por decoração | Portugalidade real vs. cliché |
| 2026-10 | Verde=ação, azul=fonte, vermelho=aviso | Convenção GOV.UK; semântica previsível |
| 2026-10 | Humor só fora das respostas | Matriz §7.1 — referência: guia de voz Mailchimp |

## 12. Referências externas

- **GOV.UK Design Principles** — "do the hard work to make it simple";
  cores funcionais; disciplina tipográfica.
- **Ágora Design System (AMA)** — referência de rigor e acessibilidade
  para serviços públicos PT (não copiar — somos independentes).
- **Italia Aperta** — calor editorial, ilustrações pastel, conversação.
- **Mailchimp Voice & Tone** — humor nos momentos calmos, nunca no stress.
- **Bordalo Pinheiro / Zé Povinho** — legitimidade cultural do Zé.

---

## 13. Roadmap de execução por fases

Cada fase é pequena, verificável (build + screenshots desktop/mobile) e
reversível. Não avançar sem checkpoint.

- [x] **F0 — Documento** (esta página): tokens, voz, regras, anti-padrões
- [x] **F1 — Fundações**: tokens semânticos completos no `@theme`
  (superfícies de sucesso/aviso), `focus-visible` global, respeito por
  `prefers-reduced-motion` (CSS + JS do typewriter e do scroll do chat)
- [x] **F2 — Microcopy**: auditoria contra a matriz §7.1 — erro de rede
  passou a mensagem honesta (antes disfarçava erro técnico de falha de
  conteúdo); email em `/fontes` é `mailto:`; resto já conforme
- [x] **F3 — Componentes**: classes partilhadas `btn-primary`,
  `btn-outline`, `chip`, `chip-sm` (header, hero, chat, 404, homepage);
  typing dots do Zé no loading do chat (respeita reduced-motion)
- [x] **F4 — Homepage**: entrada em cascata no hero (greeting → título →
  subtítulo → caixa, 120ms entre cada); cartões de tema com seta subtil
  (cinza → verde + deslocamento no hover) em vez de círculos verdes
  repetidos
- [ ] **F5 — Páginas secundárias**: `/fontes`, `/privacidade`, `/termos`,
  404 — consistência de títulos, espaçamento, tom
- [ ] **F6 — Motion**: entrada das mensagens no chat (stagger suave),
  typing dots, reduced-motion verificado
- [ ] **F7 — Revisão final**: acessibilidade (foco, contraste, labels),
  mobile pass completo, atualização deste documento
