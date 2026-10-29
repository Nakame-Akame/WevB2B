# FacturaPro E-commerce architecture

This project is organized in two independent layers:

- `backend/` exposes a versioned REST API under `/api/v1`
- `frontend/` provides the storefront interface and checkout experience

## Backend modules

- `routes/` – endpoint declarations and middleware chaining
- `controllers/` – HTTP orchestration
- `services/` – business logic
- `repositories/` – Supabase reads/writes
- `validators/` – Zod schema validation
- `middlewares/` – auth, errors, and request enrichment
- `config/` – environment and Supabase client setup

## Frontend modules

- `pages/` – product, cart, checkout, account and order views
- `components/` – reusable UI pieces
- `services/` – centralized HTTP client and domain services
- `features/` – product and payment domain logic

## Data strategy

The platform reads master data from the existing FacturaPro/Supabase instance instead of creating duplicate product records. This keeps inventory, stock, prices and customer metadata in sync with the source of truth.

## API versioning

All backend routes are exposed under `/api/v1`.

## Security

- Validate all inputs with Zod
- Restrict data access by business role
- Use Supabase row-level security and service-role separation
- Do not expose order or payment data to anonymous users
