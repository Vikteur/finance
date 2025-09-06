# Copilot Modes — Chat & Compose (for this repo)

Purpose: quick, copyable guidance and prompt templates for the two Copilot modes you use most: Chat (conversational) and Compose/Generate. Tailored to this repo: React (Vite), Jest, clean architecture, and strict accessibility (WCAG 2.1 AA).

Checklist
- Use Chat mode for multi-file plans, stepwise refactors, and code review.
- Use Compose/Generate to scaffold components, hooks, feature folders, and tests (one small unit at a time).
- Always run lint, tests, and accessibility checks on generated code before merging.

Chat mode — when and how
- Use when you need a plan, trade-offs, or iterative edits across files (refactors, PR reviews, architecture decisions).
- Provide repo context up-front (example):
  - "React app (Vite), tests: Jest + RTL, accessibility: WCAG 2.1 AA, code lives under `src/` with `components`, `features`, `hooks`."
- Ask for a numbered plan and request diffs/file patches. Ask for one file change at a time if you want safer review cycles.

Chat templates
- Refactor plan (multi-step)
```
Context: React + Vite + Jest. File: `src/features/payments/PaymentList.jsx`.
Task: Propose a numbered plan to extract API calls into `src/features/payments/api.js`, move state into `src/features/payments/usePayments.js`, and update tests. Keep behavior identical and preserve accessibility.
Please return: (1) plan steps, (2) exact file diffs or full file replacements, (3) tests to add.
```

- Code review prompt
```
Context: PR changes for `src/components/Modal/Modal.jsx` and its tests.
Task: Review for a11y issues, missing tests, and propose minimal fixes with code snippets. List risk/cost for each fix.
Paste diff: <paste here>
```

Compose / Generate — when and how
- Use to scaffold new files or small feature sets: component + CSS/module + test. Keep generated units small and reviewable.
- Be explicit about paths, props, ARIA, keyboard behavior, and test expectations (jest-axe inclusion recommended).

Compose templates
- Accessible component + test
```
Generate: `src/components/SearchInput/SearchInput.jsx`, `SearchInput.module.css`, `SearchInput.test.jsx`.
Requirements: controlled input (value,onChange), visually-hidden label linked via `htmlFor`, Enter triggers `onSubmit`, include PropTypes, and add a jest-axe test asserting no violations.
Return full file contents for each file.
```

- Feature scaffold
```
Create folder `src/features/accounts` with: `api.js` (fetchAccounts), `useAccounts.js` (hook with loading/error), `AccountList.jsx` (presentational), `AccountList.test.jsx`, and a README.md. Return full files.
```

Verification commands (Windows cmd.exe)
```
npm install
npm run lint
npm test
npm run build
```

Quick rules for accepting generated code
- Prefer file-by-file diffs. Reject large blunt changes; ask for stepwise application.
- Require tests and at least one jest-axe accessibility test for UI components.
- Run the three-step local smoke: install, lint, test.

Small safety notes
- Never accept generated secrets or credentials. Pin and audit any third-party packages introduced. Review license/compatibility.

If you want, I can now: (A) scaffold one accessible component + tests using Compose, or (B) run a Chat-mode refactor plan on a specific file — tell me which and provide the filename or paste the file.
