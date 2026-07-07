# ZenyFin

Dashboard financeiro para pequenos negócios e freelancers — controle de receitas, despesas, orçamentos, metas e métricas em tempo real.

> 🔗 **Produção:** [https://app-financial.vercel.app](https://app-financial.vercel.app)  
> 🔗 **API:** [https://api-financial-279h.onrender.com](https://api-financial-279h.onrender.com) · [Swagger](https://api-financial-279h.onrender.com/api-docs)

---

## Funcionalidades

| Módulo | Descrição |
|--------|-----------|
| **Dashboard** | Resumo financeiro com gráficos (balanço, pizza, série mensal, top categorias) |
| **Transações** | CRUD completo com filtros, importação/exportação (CSV, PDF) |
| **Categorias** | Organização de receitas e despesas |
| **Tags** | Classificação avançada (plano Pro) |
| **Orçamentos** | Limites por categoria com alertas (plano Pro) |
| **Metas** | Acompanhamento de objetivos financeiros (plano Pro) |
| **Regras Recorrentes** | Automação de transações periódicas (plano Pro) |
| **Organizações** | Multiusuário com gestão de membros (plano Enterprise) |
| **Admin** | Painel administrativo com usuários, categorias globais, auditoria e analytics |
| **i18n** | Internacionalização: português, inglês, espanhol |
| **Temas** | Dark/Light mode |
| **RBAC** | Controle de acesso por papel (user, company, admin) e plano (free, pro, enterprise) |

---

## Stack

| Camada | Tecnologia |
|--------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Linguagem** | TypeScript (strict mode) |
| **Estilização** | styled-components v6 + Atomic Design |
| **Estado Server** | TanStack React Query v5 |
| **Formulários** | react-hook-form + Zod + @hookform/resolvers |
| **Gráficos** | recharts |
| **HTTP** | Axios (com interceptors para refresh token) |
| **i18n** | next-intl v4 (pt-BR, en-US, es-ES) |
| **Notificações** | sonner |
| **Ícones** | react-icons (Heroicons v2) |
| **Fontes** | Inter + JetBrains Mono (valores financeiros) |
| **Deploy** | Vercel |

---

## Arquitetura

```
Pages (App Router)
  │
  ├─ layout.tsx / page.tsx
  │
  ▼
Custom Hooks (useTransactions, useBudgets, ...)
  │
  ├─ TanStack Query (fetch / mutate / cache)
  │
  ▼
Services (Axios instances)
  │
  ├─ Interceptor → refresh token on 401
  │
  ▼
API Backend (Render)
```

### Camadas

```
src/
├── app/          → Rotas e layouts (Next.js App Router)
├── components/   → UI atômica (atoms → molecules → organisms → templates)
├── hooks/        → TanStack Query hooks (1 por domínio)
├── services/     → Chamadas HTTP com Axios
├── schemas/      → Validação Zod (runtime + tipos)
├── types/        → Tipos inferidos dos schemas
├── contexts/     → Auth, Theme, UpgradeModal
├── lib/          → Utilitários (currency, format, date, permissions, logger)
├── i18n/         → Mensagens e roteamento i18n
├── styles/       → Temas dark/light + global styles
└── utils/        → Helpers (error handling)
```

---

## Pré-requisitos

- Node.js 20 (`.nvmrc`)
- Yarn
- API backend rodando (ou usar a de produção)

## Setup

```bash
cp .env.example .env
yarn install
```

### Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NEXT_PUBLIC_API_URL` | URL da API backend | `http://localhost:3000` |

Edite `.env` com a URL da sua API local ou deixe a de produção.

---

## Desenvolvimento

```bash
yarn dev           # http://localhost:3001
yarn lint          # ESLint
yarn format        # Prettier
yarn format:check  # Prettier (check only)
yarn build         # Build de produção
```

### Gerar Componentes

```bash
yarn generate
```

Gera `index.tsx` + `style.ts` + `types.ts` no padrão Atomic Design.

---

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

---

## Deploy na Vercel

### Passo a Passo

1. **Crie uma conta** em [vercel.com](https://vercel.com) (login com GitHub)
2. **Importe o repositório**
   - clique em **Add New → Project**
   - conecte seu GitHub e selecione o repositório `app-financial`
3. **Configuração automática** — a Vercel detecta Next.js e define:
   - Framework Preset: `Next.js`
   - Build: `next build`
   - Install: `yarn install`
4. **Adicione a variável de ambiente**:
   - Vá em **Project Settings → Environment Variables**
    - `NEXT_PUBLIC_API_URL` = `https://api-financial-279h.onrender.com`
5. **Ajuste a versão do Node**:
   - Vá em **Project Settings → General → Node.js Version**
   - Selecione **20.x**
6. **Deploy automático** — na primeira vez clique em **Deploy**
   - commits na branch `main` geram deploy automático

### Checklist

- [ ] Repositório importado na Vercel
- [ ] `NEXT_PUBLIC_API_URL` configurada
- [ ] Node.js Version 20.x
- [ ] Build passa sem erros
- [ ] Domínio configurado (opcional)

---

## Demonstração

Acesse o frontend (após deploy na Vercel) e faça login:

| Campo | Valor |
|-------|-------|
| **Email** | `demo@zenyfin.app` |
| **Senha** | `Demo@123456` |
| **Plano** | Pro (todas as funcionalidades liberadas) |

> O usuário de demonstração é criado automaticamente na primeira inicialização da API.

---

## Licença

MIT
