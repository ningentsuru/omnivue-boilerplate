# Vue 3 + Vite + TypeScript + shadcn-vue + Storybook + Vitest + Playwright

A modern, type-safe, and component-driven Vue 3 project setup featuring shadcn-vue for accessible UI primitives, isolated component development with Storybook, and robust testing with Vitest.

## 🚀 Tech Stack

- Framework: Vue 3 (Composition API, `<script setup lang="ts">`)
- Build Tool: Vite
- Language: TypeScript
- Component Workshop: Storybook
- Unit Testing: Vitest
- E2E Testing: Playwright
- Scaffolding: Plop
- Linting & Formatting: ESLint, Oxlint, Prettier
- UI System: shadcn-vue (Reka UI + Tailwind CSS)

## 📦 Getting Started

### Prerequisites

Ensure you have Node.js (^22.18.0 >= 24.12.0 recommended) and npm installed.

### Installation

```bash
pnpm install
```

### Development

Start the local development server with hot-reload:

```bash
pnpm dev
```

### Component Generation

Generate a new Vue component with associated Storybook stories and Vitest tests automatically:

```bash
pnpm make-component
```

Follow the CLI prompts to define the component path and props.

## 🛠 Available Scripts

| Command                | Description                                                              |
| :--------------------- | :----------------------------------------------------------------------- |
| `pnpm dev`             | Starts the Vite development server.                                      |
| `pnpm build`           | Runs type-check and builds the project for production.                   |
| `pnpm preview`         | Locally previews the production build.                                   |
| `pnpm storybook`       | Starts the Storybook UI on port 6006 for isolated component development. |
| `pnpm build-storybook` | Builds the Storybook instance for static deployment.                     |
| `pnpm test:unit`       | Runs unit tests using Vitest.                                            |
| `pnpm test:e2e`        | Runs end-to-end tests using Playwright.                                  |
| `pnpm type-check`      | Runs `vue-tsc` to verify TypeScript types.                               |
| `pnpm lint`            | Runs both Oxlint and ESLint to fix linting issues.                       |
| `pnpm format`          | Formats code using Prettier.                                             |
| `pnpm ui:add`          | Adds a new shadcn-vue component (e.g., pnpm ui:add button).              |

## 🧪 Testing Strategy

This project employs a multi-layered testing approach:

### Unit Testing (Vitest)

Located alongside components (e.g., Component.spec.ts). Tests logic, props, and rendering in isolation.

Integration: Tests are automatically generated to use Storybook Default.args, ensuring consistency between visual development and unit tests.

```bash
pnpm test:unit
```

### End-to-End Testing (Playwright)

Located in e2e/ directory. Tests critical user flows in a real browser environment.

```bash
pnpm test:e2e
```

## 🎨 Component Development Workflow

Scaffold: Run pnpm make-component.
Develop: Open Storybook (pnpm storybook) to build the component in isolation.
Test: Run pnpm test:unit to verify logic and prop handling.
Integrate: Import the component into your main application.

## 🎨 UI Components (shadcn-vue)

This project uses [shadcn-vue](https://www.shadcn-vue.com/) for high-quality, accessible UI primitives. Unlike traditional component libraries, shadcn-vue copies component code directly into your project, giving you full ownership and customization control.

### Adding Components

Use the CLI to add components to your `src/components/ui` directory:

```bash
npx shadcn-vue@latest add [component-name]
or
pnpm ui:add [component-name]
```

Note: It is recommended not to add all components at once, as some of the components have known bugs. Only install what you need.

## Directory Structure

shadcn-vue components are typically stored in:

- `src/components/ui/`: Core shadcn components (Button, Input, Card, etc.)
- `src/components/`: Your custom business components (which may use shadcn primitives)

## 📂 Project Structure

```
src/
├── components/ # Reusable Vue components
│ ├── ui/ # shadcn-vue primitives (Button, Input, etc.)
│ ├── atoms/ # Basic building blocks (buttons, inputs)
│ ├── molecules/ # Groups of atoms (search bars, cards)
│ └── organisms/ # Complex sections (headers, footers)
├── stories/ # Storybook story files (often co-located)
├── e2e/ # Playwright E2E tests
├── assets/ # Static assets (images, fonts)
└── main.ts # Application entry point
.plop-templates/ # Templates for component scaffolding
.storybook/ # Storybook configuration
```

## 🔧 Configuration & Quality Assurance

- Type Safety: Strict TypeScript checking is enforced during the build process (vue-tsc).
- Linting: A dual-linting approach using Oxlint (for speed) and ESLint (for deep rules).
- Formatting: Prettier ensures consistent code style across the team.

Run the full quality check suite:

```bash
pnpm lint
pnpm format
pnpm type-check
```

## 📚 Resources

- Vue 3 Documentation
- Vite Documentation
- Storybook for Vue 3
- Vitest Documentation
- Playwright Documentation
- Shadcn-vue (for UI components)
