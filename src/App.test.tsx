import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import App from './App';

test('renders greeting', () => {
  render(
    <HashRouter>
      <App />
    </HashRouter>
  );
  const greeting = screen.getByText(/Hola/i);
  expect(greeting).toBeInTheDocument();
});
