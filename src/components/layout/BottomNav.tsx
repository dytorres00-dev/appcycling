import { Link, useLocation } from 'react-router-dom'
import { Home, BarChart2, Users, Trophy, User } from 'lucide-react'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/progress', icon: BarChart2, label: 'Progreso' },
  { path: '/community', icon: Users, label: 'Comunidad' },
  { path: '/achievements', icon: Trophy, label: 'Logros' },
  { path: '/profile', icon: User, label: 'Perfil' },
]

const BottomNav = () => {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-bg-secondary border-t border-border-custom px-4 py-3 flex justify-between items-center safe-area-bottom z-50">
      {navItems.map(({ path, icon: Icon, label }) => {
        const isActive = location.pathname === path
        return (
          <Link
            key={path}
            to={path}
            className="flex flex-col items-center justify-center relative group"
          >
            <Icon
              className={`w-6 h-6 transition-colors ${isActive ? 'text-green-neon' : 'text-text-secondary'}`}
            />
            <span className={`text-[10px] mt-1 transition-colors ${isActive ? 'text-green-neon' : 'text-text-secondary'}`}>
              {label}
            </span>
            {isActive && (
              <div className="absolute -bottom-1 w-1 h-1 bg-green-neon rounded-full" />
            )}
          </Link>
        )
      })}
    </nav>
  )
}

export default BottomNav
