import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

test('renders HomePage', () => {
  render(<HomePage />);
  // Thay đổi dòng dưới cho phù hợp với nội dung thực tế của HomePage
  expect(screen.getByText(/home/i)).toBeInTheDocument();
});