'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from '../AuthProvider.jsx'

export default function AdminRoute({ children }) {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.replace('/login')
      return
    }

    if (user.role !== 'ADMIN') {
      router.replace('/403')
    }
  }, [user, loading, router])

  if (loading || !user || user.role !== 'ADMIN') {
    return null
  }

  return children
}
