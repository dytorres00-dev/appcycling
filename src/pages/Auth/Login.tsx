import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AnimatedBike from '../../components/bike/AnimatedBike'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signIn } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signIn(email, password)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Error logging in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center p-6 text-text-primary font-body">
      <div className="w-full max-w-sm flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-display text-green-neon leading-none tracking-tight mb-2">
            TORRES<br />CYCLING
          </h1>
          <p className="text-text-secondary text-sm uppercase tracking-widest">
            Push your limits
          </p>
        </div>

        <AnimatedBike speed={0.3} className="mb-12" />

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 bg-bg-tertiary border border-border-custom rounded-none text-text-primary focus:outline-none focus:border-green-neon transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 bg-bg-tertiary border border-border-custom rounded-none text-text-primary focus:outline-none focus:border-green-neon transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-danger text-xs text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 bg-green-neon text-bg-primary font-display text-2xl hover:bg-green-mid transition-colors disabled:opacity-50"
          >
            {loading ? 'Cargando...' : 'INGRESAR'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-text-secondary text-sm">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-green-neon hover:underline">
              Regístrate aquí
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
