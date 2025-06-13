
import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import SignInCard from '../src/components/signin/SignInCard'
import { AuthContext } from '../src/contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

// Mock navigate
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => vi.fn()
  }
})

// Mock axios
vi.mock('axios', () => ({
  default: {
    post: vi.fn(() => Promise.resolve({
      data: {
        tokens: {
          access: 'mockAccessToken',
          refresh: 'mockRefreshToken',
        }
      }
    }))
  }
}))

describe('SignInCard', () => {
  beforeEach(() => {
    render(
      <AuthContext.Provider value={{ userInfo: null, logout: vi.fn() }}>
        <BrowserRouter>
          <SignInCard />
        </BrowserRouter>
      </AuthContext.Provider>
    )
  })

  it('renders username and password fields', () => {
    expect(screen.getByPlaceholderText('نام کاربری')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('رمز عبور')).toBeInTheDocument()
  })

  it('allows typing in the username and password fields', () => {
    const usernameInput = screen.getByPlaceholderText('نام کاربری')
    const passwordInput = screen.getByPlaceholderText('رمز عبور')

    fireEvent.change(usernameInput, { target: { value: 'myuser' } })
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } })

    expect(usernameInput.value).toBe('myuser')
    expect(passwordInput.value).toBe('mypassword')
  })
})
