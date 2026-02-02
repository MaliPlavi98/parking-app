'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { apiMe, apiLogout } from './api/auth'

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initAuth() {
      try {
        // 🔐 1. Ensure CSRF cookie exists
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/csrf`, {
          credentials: 'include',
        })

        // 👤 2. Load current user
        const me = await apiMe()
        setUser(me)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  const login = (userData) => {
    setUser(userData)
  }

  const logout = async () => {
    await apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
