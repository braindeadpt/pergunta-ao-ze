# TWA — publicar o Pergunta ao Zé na Play Store

O site é servido tal como está dentro de uma **Trusted Web Activity** (Chrome a full-screen,
sem barra de URL). Workflow usado nos outros projetos (VenTu): **[PWABuilder](https://www.pwabuilder.com)**
— gera o `.aab`/`.apk`/`assetlinks.json`/`signing.keystore` sem instalações locais.
(O caminho alternativo com [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)
local está no fim deste doc.)

## O que já está no repo

| Peça | Onde |
|---|---|
| Web App Manifest | `app/manifest.ts` → servido em `/manifest.webmanifest` |
| Ícones (192/512, maskable) | `public/icons/` — regenerar com `node scripts/gerar-icones.mjs` |
| Ícone Apple | `app/apple-icon.png` (convenção Next, URL versionado) |
| Service worker | `public/sw.js` + `components/ServiceWorkerRegistration.tsx` (precisa dos critérios PWA do PWABuilder) |
| Digital Asset Links | `public/.well-known/assetlinks.json` — fingerprint da keystore já incluído |
| `theme-color` / splash | `app/layout.tsx` (`#046a38`) |
| Keystore + password | `E:\perguntaaoze-backup\perguntaaoze.keystore` + `KEYSTORE.txt` |

## PWABuilder (caminho principal, como o VenTu)

Pré-requisito: fazer merge/deploy destas alterações para o manifest e o `sw.js`
ficarem live — o PWABuilder lê o site em produção.

1. Abrir `https://www.pwabuilder.com` → meter `https://perguntaaoze.pt` →
   **Package for Stores** → **Android**
2. Opções do pacote:
   - **Package ID**: `pt.perguntaaoze.twa` (tem de bater com `assetlinks.json`)
   - **App name**: `Pergunta ao Zé` · **Launcher name**: `Zé`
   - **Start URL**: `/`
   - **Theme/nav color**: `#046a38` · **Background**: `#faf6ec`
   - **Signing key**: fazer upload de `E:\perguntaaoze-backup\perguntaaoze.keystore`
     (alias `ze`, password em `KEYSTORE.txt`) — é esta a chave cujo fingerprint
     já está no `assetlinks.json`. Se deixares o PWABuilder gerar uma nova,
     tens de acrescentar o fingerprint novo ao array
3. Download do pacote → contém `app-release-bundle.aab` (para a Play),
   `.apk` (para testes) e `assetlinks.json`
5. Backup do pacote para `E:\perguntaaoze-backup\` (como `E:\ventu-android\package\`)

> **Play App Signing** (recomendado pela Google): se o ativares na Play Console,
> o fingerprint que conta é o do *app signing key* em
> **Setup → App integrity → App signing key certificate** — mete **os dois**
> fingerprints no array (upload key + app signing key).

## Play Console

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

## Verificação pós-publicação

- `https://perguntaaoze.pt/.well-known/assetlinks.json` serve JSON válido
- Instalar a app **a partir do canal de testes internos da Play** → deve abrir
  **sem** barra de URL (full-screen). Testa sempre a build distribuída pela Play:
  o APK local usa a upload key, mas a Play pode assinar com outra chave —
  só a versão distribuída valida o assetlinks de verdade
- Links externos (fontes oficiais) abrem fora do TWA, no browser — comportamento correto

## Atualizações

- Mudanças **web** (conteúdo, design): deploy normal na Vercel — a app reflete logo.
- Mudanças de **manifest/ícones**: editar `app/manifest.ts`/`scripts/gerar-icones.mjs`,
  **fazer bump ao `CACHE_NAME` em `public/sw.js`** (senão os clientes instalados
  ficam com os assets antigos em cache), deploy, e gerar um pacote novo no
  PWABuilder (ou `merge`/`update`/`build` se usares Bubblewrap — ver abaixo).

## Alternativa: Bubblewrap local

Requer JDK 17+ e Android SDK Command-line Tools.

```sh
keytool -genkeypair -v -keystore perguntaaoze.keystore -alias ze \
  -keyalg RSA -keysize 2048 -validity 10000   # já feita — está no E:
npm install -g @bubblewrap/cli
mkdir twa-app && cd twa-app
bubblewrap init --manifest https://perguntaaoze.pt/manifest.webmanifest
bubblewrap build        # produz app-release-bundle.aab + app-release-signed.apk
keytool -list -v -keystore perguntaaoze.keystore -alias ze | grep SHA256
```

Respostas ao `init`: Package ID `pt.perguntaaoze.twa`, app `Pergunta ao Zé`,
launcher `Zé`, start `/`, tema `#046a38`, background `#faf6ec`, keystore do E:.

Atualizações Bubblewrap:

1. `bubblewrap merge --ignore name short_name --skipVersionUpgrade` — importa o
   web manifest para o `twa-manifest.json` **sem** sobrescrever os nomes
   escolhidos no `init` (`Zé` no launcher) e sem subir a versão duas vezes
2. `bubblewrap update` — regenera o projeto Android e incrementa o
   `appVersionCode` automaticamente (não é preciso bump manual)
3. `bubblewrap build` → novo upload do `app-release-bundle.aab`
