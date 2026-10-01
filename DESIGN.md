# DESIGN.md — Sistema de design do Pergunta ao Zé

Este documento é a fonte de verdade para todas as decisões visuais e de voz
do projeto. Qualquer mudança de design deve obedecer ao que aqui está —
ou atualizar este documento primeiro, com motivo.

> **O visual é a piada; a resposta do chat fica sóbria e legível.**
> O site não *fala* sobre burocracia — o site *É* burocracia: senhas de
> atendimento com picotado, carimbos, formulário em triplicado, painel LED,
> livro de reclamações. Os objetos são a ESTRUTURA da página, não
> decoração por cima de uma grelha educada. Quem está a ler passos
> oficiais tem clareza total; o carnaval fica à volta.

---

## 1. Princípios

1. **O visual é a piada** — a sátira vive nos objetos (senhas, carimbos,
   formulários), não em texto engraçado. A piada é que "um site sobre
   burocracia parece burocracia".
2. **Útil na hora certa** — dentro da bolha de resposta e das fontes, zero
   estilos de brincadeira: tipografia limpa, passos legíveis, links azuis.
   O carnaval fica à volta; o conteúdo fica sóbrio.
3. **Independência visível** — não somos o Estado. O disclaimer LED está
   sempre presente; a estética de formulário é paródia carinhosa, nunca
   imitação de um site oficial.
4. **Sólido e saturado** — cores chapadas, bordas grossas, sombras duras.
   Nada de gradientes subtis, pastel fofo ou sombras esbatidas.
5. **Acessibilidade não é opcional** — contraste AA, foco visível,
   `prefers-reduced-motion` respeitado. Neo-brutalismo com leitura limpa.
6. **Conversação é o produto** — o Zé (balão com cara) é quem fala; os
   objetos burocráticos são o cenário.

## 2. Marca

### 2.1 Nome e assinatura

- Nome: **Pergunta ao Zé**
- Tagline: *"Os serviços públicos, sem fila nem senha."* — e o site goza
  precisamente com senhas e filas.
- Personagem: o **Zé** — o cidadão comum que já passou pelas filas todas.
  Balão de fala verde com cara.

### 2.2 Três símbolos, três papéis

| Símbolo | Ficheiro | Onde se usa |
|---|---|---|
| **ZeMark** — balão verde com "Zé" | `components/ZeMark.tsx` | Logotipo (header, footer), favicon. Só marca. |
| **ZeFace** — balão verde com cara | `components/ZeFace.tsx` | Avatar pequeno no chat e balões de fala. |
| **ZePersonagem** — Zé completo | `components/ZePersonagem.tsx` | Cabeça de balão verde + corpo atrás do balcão: óculos, crachá, caneta atrás da orelha, pilha de papéis. Traço grosso, cores chapadas. |

**Estados do Zé** (prop `estado`):

| Estado | Contexto real |
|---|---|
| `normal` | Hero (olhos seguem o cursor), repouso |
| `pensar` | Loading do chat ("a pedir carimbo ao chefe…") |
| `carimbar` | Resposta recebida / submissão do formulário |
| `panico` | Erro / sem resultados |
| `aliviado` | Resposta útil, FAQ, 404 resolvido |

Regras:
- ZePersonagem/ZeFace **uma vez por contexto** — é quem fala, não papel de parede.
- Na hero o Zé tem ≥200px e os olhos seguem o cursor (`olhosVivos`).
- Cores fixas: verde `#046a38`, cara branca, pupilas `#0b3d24`.

## 3. Cores

### 3.1 Tokens (`app/globals.css` → `@theme`)

| Token | Hex | Papel |
|---|---|---|
| `--color-paper` | `#faf6ec` | Fundo — papel de formulário |
| `--color-ink` | `#1b1d22` | Texto + **bordas de todos os objetos** |
| `--color-band-verde` | `#046a38` | Ação primária, bolhas do utilizador, Zé |
| `--color-band-verde-escuro` | `#035129` | Hover de ação |
| `--color-band-vermelho` | `#d5232f` | **Tinta de carimbo** — selos, "urgente", avisos |
| `--color-azulejo` | `#1d4f9c` | Fonte oficial / link externo |
| `--color-azulejo-suave` | `#eef3fb` | Hover de fontes |
| `--color-form-amarelo` | `#f5c518` | Vias de formulário / destaques saturados |
| `--color-amarelo-papel` | `#f5e27a` | Fundo de secção — papel de formulário |
| `--color-esferografica` | `#1b3fa0` | Fundo de secção — azul esferográfica |
| `--color-led` | `#ffb020` | Texto do painel LED (sobre preto) |

Neutros: escala `stone` para texto secundário; bordas de objetos são
**sempre `ink`**, nunca `stone`.

### 3.2 Regras de cor

- **Verde = agir.** Botão primário verde; nada mais o é.
- **Vermelho = carimbo.** Só para selos rotacionados, avisos e negações.
- **Azul = fonte oficial.** Links para fora e cartões de fonte.
- **Amarelo = via de formulário** — segundo plano de cópia em triplicado,
  destaques de painel.
- Cor de fundo sólida dentro de bordas ink — sem gradientes.

## 4. Tipografia

| Papel | Fonte | Uso |
|---|---|---|
| **Display** | `Archivo Black` (`--font-display`) | Títulos h1/h2, palavras de impacto. Caixa alta opcional, `tracking-tight` |
| **Mono** | `Space Mono` (`--font-mono`) | Etiquetas de formulário, números de senha, domínios, metadados, cabeçalhos de talão |
| **Corpo** | Inter (`--font-sans`) | Texto, respostas, botões |

Regras:
- Display só em títulos — nunca em corpo.
- Mono é a "letra de máquina de escrever/talão": uppercase + tracking para
  etiquetas (`FORMULÁRIO Z-01`, `SENHA`, `BALCÃO`).
- Respostas do chat: Inter normal — **proibido** mono/display dentro da
  bolha de resposta.

## 5. Forma e materiais

- **Bordas**: `2px solid ink` em todos os objetos (cartões, botões,
  inputs, selos). Finas `1px` só dentro de conteúdo legível.
- **Sombras duras**: `box-shadow: 4px 4px 0 ink` por defeito; `8px 8px 0`
  no hero/cartões grandes; sem blur, sem alpha.
- **Raios**: pequenos (`rounded-lg`, `rounded-xl`) — documentos têm
  cantos retos; pills só para chips/CTAs se fizer sentido (senhas são
  retangulares — preferir retos para objetos de papel).
- **Perfuração**: separadores tracejados (`border-dashed`) e semicírculos
  de corte nas laterais de senhas/talões.
- **Hover**: deslocamento físico — o objeto "levanta": `translate(-2px,
  -2px)` e a sombra cresce para `6px 6px 0` (ou fica `8px`).

### Motivos — os objetos SÃO a estrutura

1. **Senha de atendimento** (`SenhaTema`) — talão com picotado serrilhado
   em cima/baixo, entalhes laterais na linha de picotar, número grande
   `A-047`, `À SUA FRENTE: N PESSOAS`, `BALCÃO 3 · ENTIDADE`, pergunta no
   corpo do talão. Rotações ±1-2°; no hover a via rasga-se (o talão de
   cima desloca).
2. **Carimbo** — caixa de tinta vermelha mono uppercase, rotação -6° a
   -12°. "SEM FILA", "DEFERIDO", "VIA DO CIDADÃO". O botão de submeter É
   um carimbo que bate (slam de ~180ms) antes de navegar.
3. **Formulário** — `FORMULÁRIO Z-01` (caixa de pergunta), `Z-02`
   (faz/não faz): etiqueta mono, linhas pautadas, ✓/✗ manuscritos.
4. **Painel LED** — barra/painel preto, texto mono âmbar; usado para o
   hero ("é a tua vez") e para as estatísticas (dígitos a rodar).
5. **Livro de reclamações** — FAQ: lombada vermelha, folha com via do
   cidadão, entradas "RECLAMAÇÃO Nº 01".
6. **Setas à mão** — traço irregular a apontar para o CTA ("carimba aqui").

Regras de composição:
- Fundos alternam: creme → amarelo-papel → azul-esferográfica → creme.
  Nunca uma faixa uniforme de creme.
- Cada secção tem pelo menos um elemento a sair do contentor, sobreposto
  ou rodado 1-3°. Nada alinhado e educado demais.
- Títulos enormes em display uppercase.
- Verde só para marca e ação primária; tintas de carimbo: vermelho,
  azul-esferográfica, preto-fotocópia.

## 6. Componentes (direção v2 — decidido)

| Componente | Objeto |
|---|---|
| Hero | **Assimétrico**: texto+formulário à esquerda, Zé atrás do balcão à direita (≥200px, olhos vivos). Botão = carimbo que bate. Seta à mão "carimba aqui" |
| Senha de tema | `components/SenhaTema.tsx` — talão picotado (ver §5.1) |
| Estatísticas | `components/PainelLED.tsx` — painel preto, dígitos âmbar a rodar |
| FAQ | Livro de Reclamações — lombada vermelha, entradas "RECLAMAÇÃO Nº" |
| Faz / Não faz | `FORMULÁRIO Z-02` — folha única, ✓/✗ manuscritos, linhas pautadas |
| Caixa de pergunta | `FORMULÁRIO Z-01` — etiqueta mono, perfuração, carimbo "SEM FILA" |
| Fontes na resposta | Cartão azul claro sóbrio — **zona sem brincadeiras** |
| Chat | (R3, após aprovação) bolhas ink + sombra dura; resposta sóbria |
| 404 | Senha "A SUA VEZ É DAQUI A 3 ANOS" + Zé panico/aliviado |

## 7. Voz e tom

### 7.1 Matriz do humor

| Contexto | Humor | Exemplo |
|---|---|---|
| Objetos visuais (selos, etiquetas, senhas) | ✔ **aqui mora a piada** | `FORMULÁRIO Z-01`, `SEM FILA`, `VIA ÚNICA` |
| Hero/tagline/placeholder | ✔ | "sem apanhar a fila das 7h" |
| Estado vazio/loading/404 | ✔ | "A folhear os guias oficiais…" |
| FAQ/footer | ✔ leve | "Nem sequer temos onde meter um IBAN." |
| **Bolha de resposta do Zé** | ✖ sóbria | passos + fontes, sem enfeites |
| Temas sensíveis | ✖ | máximo: abertura neutra |
| Erros técnicos | ✖ | erro claro + solução |
| Emojis | ✖ | os objetos fazem o trabalho |

### 7.2 Gramática

- PT-PT sempre; frases curtas; imperativo informal nos passos.
- Etiquetas mono em **uppercase** com o vocabulário da repartição:
  SENHA, BALCÃO, VIA, URGENTE, TRIPLICADO, CARIMBO, REGISTO.
- O Zé fala em 1.ª pessoa só para se apresentar; nas respostas, some.

### 7.3 Proibido

- Goço com o utilizador, funcionários ou situações sensíveis
- Piadas dentro da bolha de resposta
- Azulejo, galo, bandeira, calçada (ver §11)

## 8. Acessibilidade

- Contraste AA: texto ≥4.5:1. Led-âmbar `#ffb020` só sobre preto; carimbo
  vermelho só como decoração (o texto real vai em ink).
- `focus-visible`: anel `2px solid band-verde` + offset — visível mesmo
  com bordas ink grossas.
- `aria-hidden` em selos, perfurações, LED decorativo; texto repetido em
  `sr-only` quando necessário.
- Marquee/LED desligado com `prefers-reduced-motion`.

## 9. Motion

- Entradas `fade-in-up` ≤450ms; hovers com translate físico ≤4px.
- Typing dots no loading do chat (Zé a escrever).
- LED marquee lento opcional — única animação contínua permitida, e off
  com reduced-motion.
- Sem parallax, sem scroll-jacking.

## 10. Conteúdo e dados

- Só fontes oficiais verificadas; contactos com telefone/horário/email
  confirmados na página oficial.
- Respostas: 3–5 passos; nota âmbar para exceções; fontes sempre.

## 11. Decisões registadas

| Data | Decisão | Motivo |
|---|---|---|
| 2026-10 | Removidos azulejo/calçada/flag/galo | Folclore decorativo, não português de produto |
| 2026-10 | ZeMark/ZeFace = sistema de personagem | Coerência marca↔mascote |
| 2026-10 | Verde=ação, azul=fonte, vermelho=carimbo/aviso | Semântica previsível |
| 2026-10 | **Direção v2: burocracia como objeto físico** (neo-brutalismo pop) | Direção escolhida pelo autor; a sátira vive nos objetos |
| 2026-10 | Resposta do chat sempre sóbria | Quem lê passos oficiais precisa de clareza |
| 2026-10 | **Objetos = estrutura, não decoração** | A v1 aplicou só uma "pele" sobre a mesma grelha — rejeitado. Senhas, formulários, livro e LED passam a ser o layout (home: hero assimétrico, senhas picotadas, stats em LED, FAQ = livro de reclamações) |
| 2026-10 | **Chat: a moldura é a piada, a resposta é séria** | Regras do /chat: mensagem do utilizador = senha Z-00x; resposta = ficha sóbria com FONTES OFICIAIS ≥14px; carimbo DEFERIDO só no canto, nunca sobre texto; sem resultado sempre com saída útil (link/sugestão); erro de rede sem piada, com retry; em mobile a ficha ocupa a largura toda (o Zé não reserva coluna) |

## 12. Referências

- **Neo-brutalismo pop** (Gumroad, Figma Config): bordas grossas, sombras
  duras, cores saturadas chapadas, composição atrevida, tipografia enorme.
- **Duolingo** — a personagem é o produto: o Zé tem corpo, crachá e
  estados reais (pensar, carimbar, pânico, aliviado), nunca só um avatar.
- **A burocracia real** — senhas de atendimento, impressos em triplicado,
  carimbos, painéis LED de senhas, livro de reclamações.
- **Mailchimp Voice & Tone** — humor nos momentos calmos, nunca no stress.
- (Rigor informativo: GOV.UK/Ágora ficam só como referência de clareza de
  conteúdo — não de tom nem visual.)

---

## 13. Roadmap do redesign (v2)

Regra: **apresentar antes de aplicar**. A home foi aprovada como piloto.

- [x] **R0 — Documento v2**: esta direção
- [x] **R1 — Piloto home** (estrutura, não pele): hero assimétrico com
  ZePersonagem, temas = senhas picotadas, stats = painel LED, faz/não faz
  = formulário Z-02, FAQ = Livro de Reclamações — **aprovada**
- [x] **R2 — Sistema**: `.senha`, `.carimbo`, `.led-bar`, `.folha-linhas`
  consolidados em `globals.css`
- [x] **R3 — Chat**: bolhas ink + sombra; input = formulário Z-01 com
  carimbo ENVIAR; loading = Zé pensar + frases de balcão; resposta entra
  com carimbo "DEFERIDO"; sem resultados = Zé panico + saída útil;
  erro de rede sóbrio com "Tentar de novo". Resposta sempre sóbria
- [ ] **R4 — Secundárias**: `/fontes` (arquivo com fichas de pasta),
  legais (impresso sóbrio), 404 (senha A-404 "a sua vez é daqui a 3 anos")
- [ ] **R5 — Revisão**: mobile, reduced-motion, contraste AA, consola
