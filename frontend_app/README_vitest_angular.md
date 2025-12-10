# Vitest Angular-like Component Testing (Scoped Demo)

This repository includes a React app (Create React App) and a **scoped** Angular-like component testing demo powered by **Vitest** and **Vite**.  
We do not modify the React build/test workflows. The demo lives in a separate folder and can be run independently.

## Location

- Demo root: `frontend_app/angular_vitest_demo/`
  - `package.json` (scoped dev deps and scripts)
  - `vitest.config.ts` (jsdom environment, coverage)
  - `vitest.setup.ts` (Testing Library matchers)
  - `tsconfig.json` (scoped TypeScript configuration)
  - `src/testing/angular-like.ts` (minimal Angular-like utilities: OutputEmitter, base component)
  - `src/components/counter.component.ts` (example Angular-like component)
  - `src/components/counter.component.spec.ts` (Vitest specs with @testing-library/dom + user-event)

## Why Angular-like?

Full Angular runtime with Vite + Vitest requires many Angular packages and specific versioning rules.  
For the purpose of demonstrating **Angular component-style specs** (Inputs, Outputs, DOM), this demo provides a **minimal Angular-compatible abstraction**:
- `OutputEmitter` simulates `@Output()` event emitters.
- `AngularLikeComponent` simulates lifecycle and DOM rendering via `mount()` and `destroy()`.

This lets you write tests close to Angular style while leveraging jsdom + Testing Library.

## Install & Run Tests

From the project root or the `frontend_app` directory:

1. Navigate to the demo:
   ```bash
   cd frontend_app/angular_vitest_demo
   ```

2. Install dev dependencies:
   ```bash
   npm install
   ```

3. Run tests:
   ```bash
   npm run test
   ```

4. Run tests in UI mode:
   ```bash
   npm run test:ui
   ```

5. Watch mode:
   ```bash
   npm run test:watch
   ```

> Note: This demo is self-contained and does not affect the existing React app commands:
> - `npm start`, `npm test`, `npm run build` in `frontend_app/` continue to work as before.

## Extending

- Add more Angular-like components under `src/components/`.
- Write new specs in `src/**/*.spec.ts`.
- If you later decide to integrate real Angular, ensure all `@angular/*` packages use the exact same version per Angular rules and update the Vite/Vitest config accordingly.
