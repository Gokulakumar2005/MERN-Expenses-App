import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { axe, toHaveNoViolations } from 'axe-core';

expect.extend?.({});

describe('App basic render', () => {
  it('renders header links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(/ExpenseTracker/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Home/i)[0]).toBeInTheDocument();
  });
});
