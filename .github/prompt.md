````markdown
# React App Prompt

You are building a React frontend application that must:
- Use the latest stable versions of all dependencies (React, Jest, etc.)
- Be installed and managed with npm
- Implement a high standard of clean architecture
- Ensure all components and flows follow accessibility guidelines (WCAG, ARIA)

## Requirements
- **React**: Use functional components and hooks. Always use the latest stable version.
- **Jest**: All business logic and components must be covered by unit and integration tests using the latest Jest and React Testing Library.
- **Clean Architecture**:
  - Separate UI, business logic, and data access.
  - Components are presentational; state and logic live in feature modules or hooks.
  - Features depend on abstractions (interfaces/types), not concrete implementations.
  - All business logic is unit-testable and decoupled from UI.
  - Components are atomic, stateless when possible, and documented with PropTypes or TypeScript.
- **Accessibility**:
  - All UI must meet WCAG 2.1 AA standards.
  - Use semantic HTML elements and ARIA attributes where appropriate.
  - Ensure keyboard navigation and screen reader support for all interactive elements.
  - Use eslint-plugin-jsx-a11y and test accessibility with automated tools and manual checks.

## Project Setup
Opinionated starter using Vite (recommended) and Jest for testing.

1. Initialize with npm and Vite:
  ```cmd
  npm init vite@latest my-app -- --template react
  cd my-app
  npm install
  ```

2. Add testing and accessibility dev dependencies:
  ```cmd
  npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom jest-axe eslint eslint-plugin-react eslint-plugin-jsx-a11y prettier
  ```

3. Add scripts to `package.json` (adjust if you prefer `react-scripts`):
  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "start": "vite preview",
    "test": "jest --config=jest.config.js",
    "test:watch": "jest --watch",
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\""
  }
  ```

4. Jest notes when using Vite:
  - Vite doesn't provide Jest out of the box. Use `jest` with `jest-environment-jsdom` and optional `babel-jest` or `ts-jest` for TypeScript.
  - Add a minimal `jest.config.js` with `testEnvironment: 'jsdom'` and `setupFilesAfterEnv: ['<rootDir>/src/setupTests.js']`.

5. Accessibility tooling:
  - Add `eslint-plugin-jsx-a11y` and include it in `.eslintrc`.
  - Add `jest-axe` to test components for common accessibility issues.

## Example Component Pattern
```jsx
// src/components/Button/Button.jsx
import React from 'react';
import PropTypes from 'prop-types';

export function Button({ children, onClick, ariaLabel }) {
  return (
    <button onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string.isRequired,
};
```

## Testing Pattern
```jsx
// src/components/Button/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

test('renders button with accessible label', () => {
  render(<Button ariaLabel="Submit" onClick={() => {}}>Submit</Button>);
  const button = screen.getByRole('button', { name: /submit/i });
  expect(button).toBeInTheDocument();
});
```

---
*Always update dependencies to the latest versions. Document new conventions, workflows, and accessibility decisions for future contributors and AI agents.*
````
