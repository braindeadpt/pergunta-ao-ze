# TWA — publicar o Pergunta ao Zé na Play Store

O site é servido tal como está dentro de uma **Trusted Web Activity** (Chrome a full-screen,
sem barra de URL), via [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap).

## O que já está no repo

| Peça | Onde |
|---|---|
| Web App Manifest | `app/manifest.ts` → servido em `/manifest.webmanifest` |
| Ícones (192/512, maskable, apple) | `public/icons/` — regenerar com `node scripts/gerar-icones.mjs` |
| Digital Asset Links | `public/.well-known/assetlinks.json` — **falta o fingerprint** |
| `theme-color` / splash | `app/layout.tsx` (`#046a38`) |

## Pré-requisitos

- JDK 17+ (`java -version`)
- Android SDK Command-line Tools (o Bubblewrap instala se não encontrar)
- Conta Google Play Console (25 $ únicos)

## Passos

### 1. Gerar a keystore (guardar com cuidado — perder = nunca mais atualizar a app)

```sh
keytool -genkeypair -v -keystore perguntaaoze.keystore -alias ze \
  -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Gerar o projeto Android

```sh
npm install -g @bubblewrap/cli
mkdir twa-app && cd twa-app
bubblewrap init --manifest https://perguntaaoze.pt/manifest.webmanifest
```

Respostas ao assistente:

- **Package ID**: `pt.perguntaaoze.app` (tem de bater com `assetlinks.json`)
- **App name**: `Pergunta ao Zé`
- **Launcher name**: `Zé`
- **Start URL**: `/`
- **Theme/nav color**: `#046a38`, background `#faf6ec`
- **Keystore**: caminho para `perguntaaoze.keystore`, alias `ze`

### 3. Build do AAB

```sh
bubblewrap build
# produz app-release-bundle.aab (para a Play) e app-release-signed.apk
```

O fingerprint `sha256_cert_fingerprints` obtém-se da keystore:

```sh
keytool -list -v -keystore perguntaaoze.keystore -alias ze | grep SHA256
```

### 4. Ligar o domínio à app

Colocar o fingerprint em `public/.well-known/assetlinks.json` (formato
`AA:BB:CC:...`), commit + deploy. Sem isto, a app abre com barra de URL em vez de
full-screen.

> **Play App Signing** (recomendado pela Google): se o ativares na Play Console,
> o fingerprint que conta é o do *app signing key* em
> **Setup → App integrity → App signing key certificate** — mete **os dois**
> fingerprints no array (upload key + app signing key).

### 5. Play Console

1. **Create app** → nome `Pergunta ao Zé`, app gratuita
2. **Main store listing**: descrição curta/longa, ícone 512×512 (`public/icons/icon-512.png`),
   feature graphic 1024×500, screenshots de telemóvel (mín. 2) e tablet (opcional)
3. **Categorization**: aplicação → Ferramentas/Governo
4. **Contact details**: `ze@perguntaaoze.pt` + URL `https://perguntaaoze.pt`
5. **Privacy policy**: `https://perguntaaoze.pt/privacidade`
6. **Content rating** (questionário IARC): app de informação, sem conteúdo sensível
7. **Target audience**: 18+ / todos
8. **Data safety**: declarar que `/api/responder` guarda perguntas anonimizadas
   **e** que as perguntas podem ser enviadas a um fornecedor externo de IA
   (motor LLM — ver `privacidade`); ambos os fluxos entram na declaração
9. **Government declaration**: **não** é app governamental — declarar app privada/independente
   (o Google pergunta explicitamente apps relacionadas com governo)
10. Upload do `.aab` em **Production** ou **Internal testing** → submeter para revisão

### 6. Verificação pós-publicação

- `https://perguntaaoze.pt/.well-known/assetlinks.json` serve JSON válido
- Instalar a app → deve abrir **sem** barra de URL (full-screen)
- Links externos (fontes oficiais) abrem fora do TWA, no browser — comportamento correto

## Atualizações

- Mudanças **web** (conteúdo, design): deploy normal na Vercel — a app reflete logo.
- Mudanças de **manifest/ícones**: editar `app/manifest.ts`/`scripts/gerar-icones.mjs`,
  fazer deploy, depois:
  1. `bubblewrap merge --ignore name short_name --skipVersionUpgrade` — importa o
     web manifest para o `twa-manifest.json` **sem** sobrescrever os nomes
     escolhidos no `init` (`Zé` no launcher) e sem subir a versão duas vezes
  2. `bubblewrap update` — regenera o projeto Android e incrementa o
     `appVersionCode` automaticamente (não é preciso bump manual)
  3. `bubblewrap build` → novo upload do `app-release-bundle.aab`
