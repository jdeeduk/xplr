import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeToggle } from '../theme-toggle'

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn((theme) => theme),
  }),
}))

describe('ThemeToggle', () => {
  it('renders theme toggle button', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('shows correct title for current theme', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('title', 'Switch to dark mode')
  })

  it('toggles theme when clicked', () => {
    render(<ThemeToggle />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
  })

  it('shows correct icons', () => {
    render(<ThemeToggle />)
    expect(screen.getByTitle('Switch to dark mode')).toBeInTheDocument()
    expect(screen.getByText('Toggle theme')).toBeInTheDocument()
  })
}) 