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

  // Load user from backend via cookie
  useEffect(() => {
    async function loadUser() {

      debugger;
      try {
        const me = await apiMe()
        setUser(me)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = (userData) => {
    // login API already set cookie
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
