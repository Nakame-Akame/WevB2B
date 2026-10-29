# FacturaPro E-commerce

A production-ready ecommerce platform for B2B and B2C, designed to work with an existing FacturaPro/Supabase installation without duplicating product inventory or pricing.

## Project structure

- `backend/` – Express API, Supabase integration, business rules and tests
- `frontend/` – React + Vite storefront and checkout flow
- `docs/` – architecture, data model and API documentation

## Quick start

```bash
cd facturapro-ecommerce/backend
npm install
npm run dev
```

```bash
cd facturapro-ecommerce/frontend
npm install
npm run dev
```

## Core principles

- Reuse existing FacturaPro data and pricing tables
- Keep a single source of truth for products and stock
- Separate business logic from transport and persistence
- Support B2B pricing, B2C pricing and sales validation
