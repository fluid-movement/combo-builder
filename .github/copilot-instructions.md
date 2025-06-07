# Copilot Instructions for SvelteKit + Svelte 5 Project

## Project Overview
This is a SvelteKit application built with Svelte 5, utilizing the latest features including runes, snippets, and the new reactivity system.

## Technology Stack
- **Framework**: SvelteKit (latest)
- **UI Library**: Svelte 5 with runes
- **State Management**: Svelte stores
- **Routing**: SvelteKit routing
- **Component Library**: shadcn-svelte
- **Language**: TypeScript
- **Styling**: Tailwind CSS (or CSS modules/vanilla CSS)
- **Package Manager**: npm/pnpm/yarn
- **Node Version**: 18+ (or 20+)

## Code Style & Conventions

### File Structure
```
src/
├── lib/
│   ├── components/
│   ├── stores/
│   ├── utils/
│   └── types/
├── routes/
├── app.html
└── app.d.ts
```

### Svelte 5 Specific Guidelines

#### Use Runes Instead of Legacy Reactivity
- Use `$state()` for reactive state instead of `let` variables
- Use `$derived()` for computed values instead of `$:` reactive statements
- Use `$effect()` for side effects instead of `$:` reactive statements
- Use `$props()` for component props instead of `export let`

```typescript
// ✅ Svelte 5 with runes
let count = $state(0);
let doubled = $derived(count * 2);

$effect(() => {
  console.log('Count changed:', count);
});

// Component props
let { title, items = [] } = $props();
```

#### Component Structure
- Prefer `<script lang="ts">` for TypeScript
- Use proper prop destructuring with `$props()`
- Implement proper TypeScript interfaces for props
- Use snippets for reusable template logic

```svelte
<script lang="ts">
  interface Props {
    title: string;
    items?: string[];
    onClick?: () => void;
  }
  
  let { title, items = [], onClick }: Props = $props();
  let isVisible = $state(false);
</script>
```

### SvelteKit Specific Guidelines

#### Route Structure
- Use `+page.svelte` for pages
- Use `+layout.svelte` for layouts
- Use `+page.server.ts` for server-side logic
- Use `+page.ts` for universal load functions
- Use `+error.svelte` for error pages

#### Load Functions
```typescript
// +page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url, fetch }) => {
  // Server-side logic here
  return {
    data: await fetchData()
  };
};
```

#### Form Actions
```typescript
// +page.server.ts
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    // Form handling logic
  }
};
```

### TypeScript Guidelines
- Always use TypeScript for `.ts` and `.svelte` files
- Define proper interfaces for component props
- Use proper typing for stores and utilities
- Leverage SvelteKit's generated types from `$types`

### Component Best Practices
- Keep components small and focused
- Use proper prop validation with TypeScript
- Implement proper event handling with `createEventDispatcher` or callback props
- Use Svelte 5's snippet feature for reusable template logic

```svelte
{#snippet button(text: string, onClick: () => void)}
  <button class="btn" onclick={onClick}>{text}</button>
{/snippet}

{@render button('Click me', handleClick)}
```

### State Management
- Use `$state()` for local component state
- Use SvelteKit stores for global state
- Consider using `$state.frozen()` for immutable state
- Use `$bindable()` for two-way binding in child components

### Styling Preferences
- Use Tailwind CSS utility classes when available
- Follow mobile-first responsive design
- Use CSS custom properties for theming
- Prefer component-scoped styles with `<style>` tags

### Performance Considerations
- Use `$derived()` for expensive computations
- Implement proper lazy loading for routes
- Use SvelteKit's preloading features
- Optimize images and assets

### Testing
- Write unit tests for utility functions
- Use Playwright for end-to-end testing
- Test components with Vitest and Testing Library
- Mock external APIs in tests

### Error Handling
- Use proper error boundaries with `+error.svelte`
- Implement proper form validation
- Handle loading states appropriately
- Use SvelteKit's error helpers

### Accessibility
- Use semantic HTML elements
- Implement proper ARIA attributes
- Ensure keyboard navigation works
- Use proper heading hierarchy
- Test with screen readers

### Security
- Sanitize user inputs
- Use SvelteKit's CSRF protection
- Implement proper authentication patterns
- Follow security best practices for forms

## Common Patterns

### Data Fetching
```typescript
// Prefer server-side data fetching
export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch('/api/data');
  return {
    data: await response.json()
  };
};
```

### Form Handling
```svelte
<script lang="ts">
  import { enhance } from '$app/forms';
  
  let { form } = $props();
</script>

<form method="POST" use:enhance>
  <input name="email" type="email" required />
  <button type="submit">Submit</button>
</form>
```

### Navigation
```svelte
<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  
  const navigateToPage = () => {
    goto('/dashboard');
  };
</script>
```

## Avoid These Patterns
- Don't use legacy Svelte reactivity syntax (`$:`, `export let`)
- Avoid client-side data fetching when server-side is possible
- Don't use `any` types in TypeScript
- Avoid deeply nested component structures
- Don't forget to handle loading and error states

## File Naming Conventions
- Use PascalCase for component files: `MyComponent.svelte`
- Use kebab-case for route directories: `user-profile/`
- Use camelCase for utility functions: `formatDate.ts`
- Use UPPER_CASE for constants: `API_ENDPOINTS.ts`

## Import/Export Preferences
- Use absolute imports from `$lib/` when possible
- Group imports: external libraries, SvelteKit imports, local imports
- Use named exports for utilities
- Use default exports for components

```typescript
// ✅ Good import structure
import { writable } from 'svelte/store';
import { page } from '$app/stores';
import { MyComponent } from '$lib/components';
import { formatDate } from '$lib/utils';
```