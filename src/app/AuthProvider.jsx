'use client'

import { createContext, useContext, useEffect, useState } from 'react'

// Create context
const AuthContext = createContext(null)

// Export hook
export function useAuth() {
  return useContext(AuthContext)
}

// Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Example: load user from localStorage or cookie
  useEffect(() => {
    const saved = localStorage.getItem('user')
    if (saved) {
      try {
        setUser(JSON.parse(saved))
      } catch {
        localStorage.removeItem('user')
      }
    }
  }, [])

  // Login function (example)
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
