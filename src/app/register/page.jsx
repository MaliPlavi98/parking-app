'use client'

import { Button } from '../../components/button'
import { GradientBackground } from '../../components/gradient'
import { Link } from '../../components/link'
import { Field, Input, Label } from '@headlessui/react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { apiRegister } from '../api/auth'

export default function Register() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      await apiRegister({ username: userName, password, confirmPassword })
      router.push('/login')
    } catch {
      setError('Registration failed. Please try again.')
    }
  }

  return (
    <main className="overflow-hidden bg-gray-50">
      <GradientBackground />
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
          <form onSubmit={handleSubmit} className="p-7 sm:p-11">
            {/* LOGO / TITLE */}
            <div className="flex items-start">
              <Link href="/" title="Home">
                <span className="text-xl font-semibold tracking-tight text-black">
                  MyApp
                </span>
              </Link>
            </div>

            <h1 className="mt-8 text-base/6 font-medium">Create account</h1>
            <p className="mt-1 text-sm/5 text-gray-600">
              Sign up to get started.
            </p>

            {/* ERROR MESSAGE */}
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">Username</Label>
              <Input
                required
                autoFocus
                type="text"
                name="username"
                onChange={(e) => setUserName(e.target.value)}
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
                  'px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 sm:text-sm/6',
                  'data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black',
                )}
              />
            </Field>

            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">Password</Label>
              <Input
                required
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
                  'px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 sm:text-sm/6',
                  'data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black',
                )}
              />
            </Field>

            <Field className="mt-8 space-y-3">
              <Label className="text-sm/5 font-medium">Confirm password</Label>
              <Input
                required
                type="password"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={clsx(
                  'block w-full rounded-lg border border-transparent shadow-sm ring-1 ring-black/10',
                  'px-[calc(--spacing(2)-1px)] py-[calc(--spacing(1.5)-1px)] text-base/6 sm:text-sm/6',
                  'data-focus:outline-2 data-focus:-outline-offset-1 data-focus:outline-black',
                )}
              />
            </Field>

            <div className="mt-8">
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </div>
          </form>

          <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
            Already have an account?{' '}
            <Link href="/login" className="font-medium hover:text-gray-600">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
