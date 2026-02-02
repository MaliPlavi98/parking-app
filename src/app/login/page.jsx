import LoginForm from "../../components/login-form"

export const metadata = {
  title: 'Login',
  description: 'Sign in to your account to continue.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginPage() {
  return <LoginForm />
}
