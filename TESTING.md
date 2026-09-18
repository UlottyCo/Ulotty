# Testing Guide

This project includes comprehensive tests for server actions and React components.

## Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test -- --watch

# Run tests with coverage
npm run test -- --coverage

# Run specific test file
npm run test -- properties.test.ts

# Run tests matching pattern
npm run test -- --testNamePattern="getProperties"
```

## Test Structure

### Server Actions (`src/app/actions/__tests__/`)
- `properties.test.ts` - Tests for property CRUD operations and stats
- `users.test.ts` - Tests for user/agent management operations

**Test Coverage:**
- Filtering by status, type, role, verified status
- Getting individual items by ID
- Stats calculations
- Error handling for non-existent items
- Multiple filter combinations

### Components (`src/components/admin/__tests__/`)
- `search-bar.test.tsx` - SearchBar component with debounce
- `filter-panel.test.tsx` - FilterPanel component with reset functionality

**Test Coverage:**
- Rendering with default and custom props
- Event handling (onChange, onClick)
- Debouncing behavior
- Collapsible functionality
- Filter state management

## Adding New Tests

1. Create test file in appropriate `__tests__` directory
2. Follow naming convention: `[component-name].test.ts(x)`
3. Use descriptive test names with `describe` and `it` blocks
4. Mock external dependencies and server actions
5. Test both happy path and error cases

## Testing Best Practices

- Test user interactions, not implementation details
- Use `@testing-library` for component testing
- Mock server actions in component tests
- Keep tests focused and readable
- Aim for high coverage on critical paths

## CI/CD Integration

Tests run automatically on:
- Pre-commit hooks (if configured)
- GitHub Actions (if configured)
- Before deployment (if configured)

Ensure all tests pass before merging to main branch.
