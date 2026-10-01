# Pergunta ao Zé

Os serviços públicos portugueses, numa só pergunta. O **Zé** responde com base
em páginas oficiais e diz-te por onde começar.

Projeto independente — não é um site do Estado.

## Stack

- Next.js 15 (App Router) + TypeScript + Tailwind CSS v4
- Deploy pensado para Vercel, mas corre em qualquer host Node

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

## Como funciona o motor de respostas

`lib/engine.ts` expõe a interface `AnswerEngine`. Dois motores:

- **KeywordEngine** (defeito): respostas curadas com matching por palavras e
  radicais sobre a base de conhecimento em `lib/data/temas.ts`. Grátis e
  instantâneo.
- **LlmEngine**: provider OpenAI-compatible — Groq, OpenRouter, Gemini e
  outros têm tiers grátis (ver `.env.example`). Usa a base curada como
  contexto (RAG leve) e só cita fontes fornecidas. Se o provider falhar,
  cai no KeywordEngine.

Ativar o LLM — ver `.env.example`:

```bash
ANSWER_ENGINE=llm
LLM_BASE_URL=...    # ex.: http://localhost:8000/v1 (vLLM/AMALIA)
LLM_API_KEY=...
LLM_MODEL=...
```

## Estrutura

```
app/                  páginas (/, /chat, /fontes, /privacidade, /termos)
app/api/responder/    POST { pergunta } -> resposta do motor
components/           Header, Footer, QuestionBox, Chat
lib/data/temas.ts     base de conhecimento curada (temas, perguntas, fontes)
lib/data/fontes.ts    lista de fontes oficiais derivada da base
lib/engine.ts         motores de resposta (keyword + LLM)
```

## Adicionar conteúdo

Edita `lib/data/temas.ts`: cada tema tem perguntas com `palavras`
(keywords normalizadas, sem acentos) e uma resposta com passos + fontes
oficiais. A página /fontes e as estatísticas da homepage atualizam-se
automaticamente.
