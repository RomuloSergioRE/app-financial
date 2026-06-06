# App Financial

Dashboard financeiro para controle de receitas, despesas, categorias e métricas financeiras.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript (strict mode)
- **UI:** styled-components + Atomic Design (atoms → molecules → templates)
- **Estado Server:** TanStack React Query
- **Formulários:** react-hook-form + Zod + @hookform/resolvers
- **Notificações:** sonner
- **Gráficos:** recharts
- **Ícones:** react-icons (Heroicons v2)
- **HTTP:** Axios
- **Cookies:** js-cookie
- **Deploy:** Vercel

## Pré-requisitos

- Node.js 20 (`.nvmrc`)
- Yarn
- API backend rodando em `http://localhost:3000` (ou configurar `NEXT_PUBLIC_API_URL`)

## Setup

```bash
cp .env.example .env
yarn install
```

## Desenvolvimento

```bash
yarn dev        # http://localhost:3001
yarn lint       # ESLint
yarn format     # Prettier
yarn build      # Produção
```

## Estrutura

```
src/
├── app/            # Next.js App Router (páginas e layouts)
├── components/     # Atomic Design
│   ├── atoms/      # Button, Input, Text, Skeleton, ThemeToggle
│   ├── molecules/  # Modal, Sidebar, Toast, Select, forms
│   └── templates/  # AppLayout, ErrorPage, LoadingPage, NotFoundPage
├── contexts/       # AuthContext, ThemeContext
├── hooks/          # Custom hooks com TanStack Query
├── lib/            # Utilitários (format, currency, download, logger)
├── schemas/        # Schemas Zod (validação runtime + tipos)
├── services/       # API services com Axios
├── styles/         # Temas dark/light + global styles
└── types/          # Tipos inferidos dos schemas Zod
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `yarn dev` | Servidor de desenvolvimento (porta 3001) |
| `yarn build` | Build de produção |
| `yarn start` | Servidor de produção |
| `yarn lint` | ESLint |
| `yarn format` | Prettier (escreve) |
| `yarn format:check` | Prettier (apenas verifica) |
| `yarn generate` | Plop — gerar novo componente |

## Geração de Componentes

```bash
yarn generate
```

Segue o padrão Atomic Design com `index.tsx` + `style.ts` + `types.ts`.

## Design System

Ver [DESIGN.md](./DESIGN.md) para tokens de design e diretrizes de UI.

## Deploy

O frontend é deployado na Vercel automaticamente a partir da branch principal.
API backend hospedada no Render.
