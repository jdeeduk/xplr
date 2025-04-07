import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import DashboardPage from '../page'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'

// Mock the client-side Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
      signOut: jest.fn(),
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

describe('DashboardPage', () => {
  let mockGetUser: jest.Mock
  let mockSignOut: jest.Mock
  let mockUnsubscribe: jest.Mock
  let mockOnAuthStateChange: jest.Mock

  const mockUser: User = {
    id: '123',
    email: 'test@example.com',
    last_sign_in_at: '2024-03-20T12:00:00Z',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: '2024-03-20T12:00:00Z',
  }

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks()
    mockLocation.href = ''
    
    // Set up mocks
    mockGetUser = jest.fn()
    mockSignOut = jest.fn()
    mockUnsubscribe = jest.fn()
    mockOnAuthStateChange = jest.fn()

    ;(createClient as jest.Mock).mockImplementation(() => ({
      auth: {
        getUser: mockGetUser,
        onAuthStateChange: mockOnAuthStateChange.mockReturnValue({
          data: { subscription: { unsubscribe: mockUnsubscribe } },
        }),
        signOut: mockSignOut,
      },
    }))
  })

  it('shows loading state initially', async () => {
    mockGetUser.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    
    render(<DashboardPage />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('displays user information when loaded', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: mockUser } })
    
    render(<DashboardPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText(`Email: ${mockUser.email}`)).toBeInTheDocument()
      expect(screen.getByText(/Last Sign In:/)).toBeInTheDocument()
    })
  })

  it('handles sign out', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: mockUser } })
    mockSignOut.mockResolvedValueOnce({ error: null })
    
    render(<DashboardPage />)
    
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument()
    })

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /sign out/i }))
    })

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled()
      expect(mockLocation.href).toBe('/')
    })
  })

  it('updates user data on auth state change', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: mockUser } })
    
    render(<DashboardPage />)
    
    await waitFor(() => {
      expect(mockOnAuthStateChange).toHaveBeenCalled()
    })

    const updatedUser = { ...mockUser, email: 'updated@example.com' }
    
    await act(async () => {
      const [[callback]] = mockOnAuthStateChange.mock.calls
      callback('SIGNED_IN', { user: updatedUser })
    })

    await waitFor(() => {
      expect(screen.getByText(`Email: ${updatedUser.email}`)).toBeInTheDocument()
    })
  })

  it('cleans up subscription on unmount', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: mockUser } })
    
    const { unmount } = render(<DashboardPage />)
    
    await waitFor(() => {
      expect(mockOnAuthStateChange).toHaveBeenCalled()
    })

    unmount()
    expect(mockUnsubscribe).toHaveBeenCalled()
  })

  it('handles getUser error gracefully', async () => {
    mockGetUser.mockRejectedValueOnce(new Error('Failed to get user'))
    
    render(<DashboardPage />)
    
    await waitFor(() => {
      expect(mockLocation.href).toBe('/auth/signin')
    })
  })
}) 