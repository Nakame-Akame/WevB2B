# Data model notes

The project is designed to adapt to the current FacturaPro schema. The following structure is expected to exist in Supabase and may vary by installation:

- `products` – product master data, categories and status
- `categories` – product grouping and navigation
- `customers` – business and retail customers
- `orders` – primary sales records
- `order_items` – line items and quantities
- `inventory_movements` – stock changes
- `prices` – pricing rows and price type mapping
- `sales_documents` – invoices, receipts and electronical documents

The business rule is that the storefront reads these tables and applies pricing rules based on the customer type and product context.
