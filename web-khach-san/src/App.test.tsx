import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main app content', () => {
  render(<App />);
  // Update the text below to match actual text rendered by App component
  // For example, if your App component renders "Welcome to My Hotel", use that text:
  const mainElement = screen.getByText(/App/i); // Replace /App/i with actual text from App component
  expect(mainElement).toBeInTheDocument();
});
