
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the App component', () => {
    render(<App />)

    const linkElement = screen.getByText(/Contáctanos/i);
    expect(linkElement).toBeInTheDocument();
  })
})