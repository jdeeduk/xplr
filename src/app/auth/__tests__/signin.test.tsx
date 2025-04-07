import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignInPage from '../signin/page'
import { createClient } from '@/lib/supabase/client'

// Mock the client-side Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn(),
    },
  })),
}))

// Mock window.location
const mockLocation = {
  href: '',
}
Object.defineProperty(window, 'location', {
  value: mockLocation,
  writable: true,
})

describe('SignInPage', () => {
  let mockSignIn: jest.Mock

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
    mockLocation.href = ''
    
    // Set up mock for signInWithPassword
    mockSignIn = jest.fn()
    ;(createClient as jest.Mock).mockImplementation(() => ({
      auth: {
        signInWithPassword: mockSignIn,
      },
    }))
  })

  it('renders sign in form', () => {
    render(<SignInPage />)
    expect(screen.getByRole('heading', { name: 'Sign In' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('handles successful form submission', async () => {
    mockSignIn.mockResolvedValueOnce({ error: null })
    
    render(<SignInPage />)
    
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
      expect(mockLocation.href).toBe('/dashboard')
    })
  })

  it('displays error message on failed sign in', async () => {
    const errorMessage = 'Invalid login credentials'
    mockSignIn.mockResolvedValueOnce({ 
      error: { message: errorMessage }
    })
    
    render(<SignInPage />)
    
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } })
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  it('shows loading state during submission', async () => {
    mockSignIn.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<SignInPage />)
    
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.submit(submitButton)

    expect(screen.getByText('Signing in...')).toBeInTheDocument()
  })
}) 