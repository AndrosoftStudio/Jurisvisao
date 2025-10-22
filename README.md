# CF/88 — Next.js + TypeScript (dados locais)

Portal local da Constituição Federal (CF/88) usando Next.js (App Router), React e TypeScript, sem APIs nem scraping.
Os dados vêm de **`public/dados/cf88.json`**.

## Rodar

```bash
npm install
npm run dev
# abra http://localhost:3000
```

## Estrutura
- `public/dados/cf88.json` — seu JSON completo (já incluí um arquivo gerado).
- `lib/` — carregamento do JSON e transformação para a árvore usada pela UI.
- `components/` — Sidebar, Search, Article view.
- `app/` — páginas Home e Artigo.
- `styles/` — Tailwind e estilos base.

## Atualizar o JSON
Substitua `public/dados/cf88.json` pelo seu arquivo mais recente. Não precisa rebuild — Next lê em runtime no server.
