import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import AnimatedBike from '../../components/bike/AnimatedBike'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { signUp } = useAuth()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await signUp(email, password, fullName)
      navigate('/')
    } catch (err: any) {
      setError(err.message || 'Error creating account')
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
            Únete a la comunidad
          </p>
        </div>

        <AnimatedBike speed={0.3} className="mb-12" />

        <form onSubmit={handleRegister} className="w-full space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nombre completo"
              className="w-full p-4 bg-bg-tertiary border border-border-custom rounded-none text-text-primary focus:outline-none focus:border-green-neon transition-colors"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
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
              placeholder="Contraseña"
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
            {loading ? 'Creando cuenta...' : 'REGISTRARSE'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-text-secondary text-sm">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-green-neon hover:underline">
              Inicia sesión
            </Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Register
