# E-commerce — Multi-step Add Product Form

Recruitment task: a three-step add product form embedded in a modal dialog, with live validation,
a product table and pagination synchronised with the URL.

## Live Demo

https://ecommerce-task-ochre.vercel.app/

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **shadcn/ui** (Radix UI) — UI components
- **TanStack Form** — form state and step navigation
- **Zod** — validation schemas for each step
- **nuqs** — table pagination synced with URL parameters
- **Tailwind CSS 4** — styling
- **sonner** — toast notifications

## Requirements

- Node.js 20+
- npm

## Getting Started

Clone the repository and install the dependencies:

```bash
git clone https://github.com/AdamskiJakub/ecommerce-task.git
cd ecommerce-task
npm install
npm run dev
```

The app will be available at the URL printed in the terminal (default: `http://localhost:5173`).

## Other Scripts

```bash
npm run build
npm run preview
npm run lint
```

## Features

### Dialog — Add Product

- Opened via the **"Dodaj produkt"** button.
- Closing the dialog resets the form back to step 1.
- After saving, the product is prepended to the table and a confirmation toast is shown.

### Step 1 — Basic Information

| Field            | Type         | Validation                                |
| ---------------- | ------------ | ----------------------------------------- |
| Product name     | Text         | Required, min. 3 characters               |
| Product SKU      | Text         | Required, letters and digits only, max 24 |
| Description      | Textarea     | Optional                                  |
| Producer         | Select       | Pick from a predefined list               |
| Category         | Select       | Pick from a predefined list               |
| Product features | Multi-select | One or more values from the list          |

### Step 2 — Pricing

The price fields are linked and recalculate automatically in both directions:

```
gross = net × (1 + VAT / 100)
net   = gross / (1 + VAT / 100)
```

- Editing the **net price** immediately recalculates the **gross price**.
- Editing the **gross price** immediately recalculates the **net price**.
- Changing the **VAT rate** recalculates the gross price from the current net price.
- The validation schema additionally verifies that both prices are consistent with the VAT rate.

### Step 3 — Availability and Stock

| Field                | Type     | Validation                                         |
| -------------------- | -------- | -------------------------------------------------- |
| Product is available | Switch   | Boolean value                                      |
| Limited product      | Checkbox | When checked, the stock quantity field appears     |
| Stock quantity       | Number   | Required only when "limited"; non-negative integer |
| Min. cart quantity   | Number   | Integer ≥ 1; not greater than max.                 |
| Max. cart quantity   | Number   | Integer ≥ 1; not less than min.                    |

### Table and Pagination

- 7 mock products — intentionally more than `PAGE_SIZE` (5) so pagination is visible and testable.
- Columns: name, SKU, category, gross price with currency, availability, stock.
- The page number is kept in the `?page=` parameter (nuqs) — refreshing preserves the view.
- On narrow screens the table is replaced by a list of cards.

## Project Structure

```
src/
├── components/ui/            # shadcn/ui components
├── features/products/
│   ├── components/           # views and form steps
│   ├── data/                 # mock data and form options
│   ├── lib/                  # form, product mapping, formatting, styles
│   ├── schemas/              # Zod schemas (steps + full wizard)
│   └── types.ts              # product model
├── App.tsx
└── main.tsx
```

## Validation

- Each step has its own Zod schema ([`product-form.ts`](src/features/products/schemas/product-form.ts)).
- Moving forward is only possible when the current step's data is valid.
- Going back to a previous step does not lose the entered values.
- Validation errors are shown next to the relevant fields.
- Validation runs live (on field change) and on the attempt to move forward.
