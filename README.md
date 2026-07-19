# 🚀 OmniVue

OmniVue is a production-ready Vue 3 boilerplate designed for seamless cross-platform development. Build once, deploy everywhere. It unifies Web, Mobile (via Capacitor), and Desktop (via Tauri) targets into a single codebase with shared logic and optimized build pipelines.

# ✨ Core Features

- 🌐 Unified Codebase: Share components, state (Pinia), and routing across Web, iOS, Android, and Desktop.
- ⚡ High Performance: Leverages Vite for instant server start and lightning-fast HMR.
- 🔌 Native-Ready Architecture: Pre-integrated with Capacitor and Tauri bridges. Easily enable native features (Camera, Geolocation, File System) with context-aware permission handling.
- 🛠️ Production Ready: Pre-configured linting, testing (Vitest/Playwright), and optimized build scripts for all platforms.

# 📦 Installation

> ⚠️ **Important**: This is a **project template**, not a library.
> Do **not** run `npm install omnivue-boilerplate`.
> Use the command below to scaffold a new project:

```bash
npx degit ningentsuru/omnivue-boilerplate my-omnivue-project
cd my-omnivue-project
pnpm install
```

# Prerequisites

Ensure you have the following installed before running platform-specific commands:

- Node.js (22.18.0 >= 24.12.0) & pnpm
- Web: Any modern browser
- Mobile: Android Studio (for Android) and Xcode (for iOS/macOS)
- Desktop: Rust toolchain (required for Tauri)

# 💻 Development Commands

Run the development server for your target platform. Hot Module Replacement (HMR) is enabled for all environments.

Web Development
Starts the Vite development server.

```bash
pnpm dev
```

> Opens http://localhost:5173 in your default browser.

# Mobile Development

These commands build the web assets and open the respective native IDEs. Note: You must hit the "Play" button within the IDE to launch the emulator or device.

## Android

```bash
pnpm dev:android
```

> Launches Android Studio. Sync Gradle if prompted, then run the app.

## iOS

```bash
pnpm dev:ios
```

> Launches Xcode. Select your signing team and scheme, then run the app.

# Desktop Development

Builds and launches the desktop application using Tauri.

```bash
pnpm dev:desktop
```

# 🏗️ Production Builds

Generate optimized assets and native binaries for distribution.

## Web Build

Generates static assets in the /dist directory ready for hosting (Vercel, Netlify, S3, etc.).

```bash
pnpm build
```

# Mobile Builds

These commands prepare the native projects. You must complete the build process (Archive/Generate Signed Bundle) inside the native IDE.

## Android (APK/AAB)

```bash
pnpm build:android
```

> Opens Android Studio. Use Build > Generate Signed Bundle / APK to create the final artifact.

## iOS (IPA)

```bash
pnpm build:ios
```

> Opens Xcode. Use Product > Archive to validate and distribute the app via TestFlight or App Store.

# Desktop Installers

Generates standalone installers for Windows (.msi/.exe), macOS (.dmg/.app), and Linux (.AppImage/.deb).

```bash
pnpm build:desktop
```

> Artifacts are located in src-tauri/target/release/bundle/.

# 📂 Project Structure

```bash
├── src/
│   ├── components/         # Atomic Design components & UI primitives
│   │   ├── ui/             # [Optional] shadcn-vue primitives (unstyled/headless)
│   │   ├── atoms/          # Basic building blocks (Buttons, Inputs, Labels)
│   │   ├── molecules/      # Groups of atoms (SearchBars, FormFields, Cards)
│   │   ├── organisms/      # Complex sections (Navbars, Footers, DataTables)
│   │   └── templates/      # Page layouts without data logic
│   ├── assets/             # Static assets (images, styles)
│   ├── composables/        # Reusable logic hooks
│   ├── constants/          # App-wide constants and enums
|   ├── lib/                # Third-party library configurations and utilities
|   ├── router/             # Vue Router configuration and routes
│   ├── stores/             # Pinia state management
|   ├── test/
│   |   └── setup.ts        # Global test configuration (Vitest)
│   └── views/              # [Legacy/Alternative] Simple page components if not using templates
├── src-tauri/              # Tauri backend (Rust) and desktop config
├── android/                # Generated Android native project (Capacitor)
├── ios/                    # Generated iOS native project (Capacitor)
├── public/                 # Public static files
└── package.json            # Dependencies and scripts
```

# 📜 Component Generation Documentation

This document outlines the standards, logic, and file structure for generating components in the OmniVue project using plop.

## 1. Generation Workflow

The generator enforces Atomic Design principles and ensures every component is created with its corresponding tests and documentation stories.

### A. Category Selection

Users must select where the component resides, enforcing the project structure:

- Atoms: Basic UI elements (Buttons, Inputs).
- Molecules: Groups of atoms (Search Bars, Form Fields).
- Organisms: Complex sections (Navbars, Data Tables).
- Layouts: High-level page wrappers.
- Views: Full page views (must end with View suffix).
- Custom Path: For advanced use cases.

### B. Naming Conventions

- PascalCase: All component names must be in PascalCase (e.g., UserProfile, HomeView).
- View Suffix: Components placed in src/views/ must end with View (e.g., DashboardView). The generator automatically validates this.
- File Naming: The generated folder and files will match the component name exactly.

### C. Prop Definition

The generator supports interactive prop definition:

1. Prompt: Asks if the component requires props.
2. Definition Loop: Allows adding multiple props with:
   - Name: Must be a valid JavaScript identifier.
   - Type: string, number, boolean, object, array, or function.
   - Array Sub-type: If array is selected, you must specify the element type (e.g., string[]).
3. Output: Generates a TypeScript interface or defineProps definition based on inputs.

## 2. Output File Structure

For a component named MyComponent in the atoms category, the generator creates:

```bash
src/components/atoms/MyComponent/
├── MyComponent.vue         # Main component with <script setup lang="ts">
├── MyComponent.spec.ts     # Vitest unit test scaffold
├── MyComponent.stories.ts  # Storybook story with typed args
└── index.ts                # Barrel export (export { default } from './MyComponent.vue')
```

### File Templates Logic

| File        | Description     | Key Features                                                                                        |
| ----------- | --------------- | --------------------------------------------------------------------------------------------------- |
| .vue        | Component Logic | Uses `<script setup lang="ts">`. Includes defineProps with types derived from the prompt.           |
| .spec.ts    | Unit Test       | Imports the component via index.ts. Includes a basic mount test using @vue/test-utils.              |
| .stories.ts | Storybook       | Uses Meta and StoryObj types. Auto-generates args based on defined props for immediate interaction. |
| index.ts    | Export          | Ensures clean imports: import MyComponent from '@/components/atoms/MyComponent'.                    |

## 3. Helper Functions

The plopfile.cjs includes specific helpers to ensure consistent naming across files:

- camelCase: Converts input to camelCase (used for variable names).
- constantCase: Converts input to CONSTANT_CASE (used for test descriptions or constants).
- removeViewText: Specifically for Views; strips the "View" suffix and converts to kebab-case for router path generation (e.g., HomeView → home).

## 4. Usage Example

Scenario: Creating a new Button Atom.

1. Run: pnpm make-component
2. Category: Select (Atoms) : (src/components/atoms/).
3. Name: Enter PrimaryButton.
4. Props:
   - Confirm Yes.
   - Prop 1: label (string).
   - Prop 2: isActive (boolean).
   - Prop 3: tags (array of strings).
5. Result:
   - Creates `src/components/atoms/PrimaryButton/`.
   - Generates PrimaryButton.vue with typed props:

```bash
interface Props {
  label: string;
  isActive: boolean;
  tags: string[];
}
withDefaults(defineProps<Props>(), {
  label: '',
  isActive: false,
  tags: ['']
})
```

- Generates PrimaryButton.stories.ts with controls for label, isActive, and tags.

# 🧪 Testing Documentation

OmniVue employs a robust Testing Pyramid strategy, combining fast unit tests for logic/components with reliable end-to-end (E2E) tests for critical user flows.

## 1. Testing Stack

- Unit Testing: Powered by Vitest. It runs in parallel with your Vite dev server, offering instant feedback, native TypeScript support, and compatibility with Vue 3's `<script setup>`.
- E2E Testing: Powered by Playwright. It provides cross-browser testing (Chromium, Firefox, WebKit) for real-world user scenarios, handling network mocking, mobile emulation, and visual regression out of the box.

## 2. Available Commands

The package.json scripts are configured to run these tools independently or together.

### Run All Tests

Executes both unit and E2E suites sequentially.

```bash
pnpm test
```

Internally runs run-s test:unit test:e2e.

### Unit Tests Only

Runs Vitest in watch mode by default (re-runs on file save).

```bash
pnpm test:unit
```

- Coverage: Add --coverage flag to generate reports.
- UI Mode: Run pnpm vitest --ui for an interactive dashboard.
- File Structure: Tests live alongside components (e.g., ComponentName.spec.ts).

### E2E Tests Only

Runs Playwright tests against the production build or dev server.

```bash
pnpm test:e2e
```

- Headed Mode: pnpm playwright test --headed (visually see the browser).
- Debug Mode: pnpm playwright test --debug (step-through debugging).
- UI Mode: pnpm playwright test --ui (interactive test runner).
- File Structure: Tests reside in the /e2e directory (e.g., e2e/user-flow.spec.ts).

## 3. Configuration & Best Practices

### Vitest Configuration (vitest.config.ts)

Ensure Vitest ignores E2E tests to prevent conflicts:

```bash
test: {
  // ... your existing config
  exclude: ['**/node_modules/**', '**/e2e/**', '**/dist/**'],
}
```

### Playwright Configuration (playwright.config.ts)

Configures the test runner to spin up the Vite dev server automatically:

```bash
export default defineConfig({
  // ... your existing config
  webServer: {
    command: process.env.CI ? 'pnpm preview' : 'pnpm dev',
    port: process.env.CI ? 4173 : 5173,
    reuseExistingServer: !process.env.CI,
  },
})
```

## Writing Tests

- Unit: Focus on isolated component behavior, props, and emitted events. Use @vue/test-utils or Vitest's browser mode for rendering.
- E2E: Focus on critical user journeys (Login, Checkout, Navigation). Use data-testid attributes for stable selectors rather than CSS classes.

<!-- # 🤝 Contributing // I still need to finish the final phase before opening this to contributions and beginning collaboration.

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a feature branch (git checkout -b feature/amazing-feature).
3. Commit your changes (git commit -m 'Add amazing feature').
4. Push to the branch (git push origin feature/amazing-feature).
5. Open a Pull Request. -->

# 📄 License

This project is open source and available under the MIT License.

### Built with ❤️ using Vue 3, Vite, Capacitor, and Tauri.
