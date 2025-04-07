import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import SignUpPage from '../signup/page'
import { createClient } from '@/lib/supabase/client'

// Mock the client-side Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signUp: jest.fn(),
    },
  })),
}))

describe('SignUpPage', () => {
  let mockSignUp: jest.Mock

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
    
    // Set up mock for signUp
    mockSignUp = jest.fn()
    ;(createClient as jest.Mock).mockImplementation(() => ({
      auth: {
        signUp: mockSignUp,
      },
    }))
  })

  it('renders sign up form', () => {
    render(<SignUpPage />)
    expect(screen.getByRole('heading', { name: 'Create Account' })).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('handles successful sign up', async () => {
    mockSignUp.mockResolvedValueOnce({ error: null })
    
    render(<SignUpPage />)
    
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm Password')
    const submitButton = screen.getByRole('button', { name: /create account/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        options: {
          emailRedirectTo: 'https://xplr-app.pages.dev/auth/callback',
        },
      })
      expect(screen.getByText('Check your email for the confirmation link.')).toBeInTheDocument()
    })
  })

  it('shows error when passwords do not match', async () => {
    render(<SignUpPage />)
    
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm Password')
    const submitButton = screen.getByRole('button', { name: /create account/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'differentpassword' } })
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Passwords do not match')).toBeInTheDocument()
      expect(mockSignUp).not.toHaveBeenCalled()
    })
  })

  it('displays error message on failed sign up', async () => {
    const errorMessage = 'Email already registered'
    mockSignUp.mockResolvedValueOnce({ 
      error: { message: errorMessage }
    })
    
    render(<SignUpPage />)
    
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm Password')
    const submitButton = screen.getByRole('button', { name: /create account/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
    fireEvent.submit(submitButton)

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument()
    })
  })

  it('shows loading state during submission', async () => {
    mockSignUp.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<SignUpPage />)
    
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm Password')
    const submitButton = screen.getByRole('button', { name: /create account/i })

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })
    fireEvent.submit(submitButton)

    expect(screen.getByText('Creating account...')).toBeInTheDocument()
  })
}) 