import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

test('renders HomePage and checks welcome text', async () => {
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  // Wait for the welcome text to appear in the document
  expect(await screen.findByText(/chào mừng đến với khách sạn abc/i)).toBeInTheDocument();
});