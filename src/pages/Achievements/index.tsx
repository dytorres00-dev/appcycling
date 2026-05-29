import { useState } from 'react'
import { Button } from '../../components/ui'
import { Lock, Flame } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

interface BadgeItem {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  condition: string
}

const mockBadges: BadgeItem[] = [
  { id: '1', name: 'Primera Clase', description: 'Completaste tu primera clase', icon: '🚴', unlocked: true, condition: '1 clase completada' },
  { id: '2', name: '10 Clases', description: 'Diez clases completadas', icon: '🔥', unlocked: true, condition: '10 clases completadas' },
  { id: '3', name: '25 Clases', description: 'Veinticinco clases completadas', icon: '⚡', unlocked: false, condition: '25 clases completadas' },
  { id: '4', name: '50 Clases', description: 'Cincuenta clases — leyenda', icon: '👑', unlocked: false, condition: '50 clases completadas' },
  { id: '5', name: 'Racha Semanal', description: '7 días consecutivos de actividad', icon: '📅', unlocked: true, condition: '7 días de racha' },
  { id: '6', name: 'Racha Mensual', description: '30 días consecutivos', icon: '🏆', unlocked: false, condition: '30 días de racha' },
  { id: '7', name: 'Madrugador', description: 'Asististe a 5 clases antes de las 7am', icon: '🌅', unlocked: false, condition: '5 clases < 7am' },
  { id: '8', name: 'Estrella Comunidad', description: 'Publicaste 10 veces en el feed', icon: '⭐', unlocked: false, condition: '10 posts' },
]

const Achievements = () => {
  const [selectedBadge, setSelectedBadge] = useState<BadgeItem | null>(null)
  const [unlockingBadge, setUnlockingBadge] = useState<string | null>(null)

  const handleUnlock = (badge: BadgeItem) => {
    setUnlockingBadge(badge.id)
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#84cc16', '#ffffff', '#166534']
    })
    setTimeout(() => setUnlockingBadge(null), 3000)
  }

  return (
    <div className="p-6 space-y-8 max-w-[430px] mx-auto pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display text-text-primary uppercase tracking-wider">Mis Logros</h2>
        <p className="text-text-secondary text-xs uppercase tracking-widest">Colecciona insignias y sube de nivel</p>
      </div>

      {/* Streak Section */}
      <section className="flex flex-col items-center justify-center py-8 bg-bg-secondary border border-border-custom relative overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="relative z-10"
        >
          <Flame className="w-20 h-20 text-green-neon drop-shadow-[0_0_15px_rgba(132,204,22,0.5)]" />
        </motion.div>
        <div className="text-center mt-4 relative z-10">
          <div className="text-text-primary font-display text-4xl">12 DÍAS</div>
          <div className="text-text-secondary text-xs uppercase tracking-widest">Racha Actual</div>
        </div>
        {/* Flame glow effect */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-neon/20 blur-3xl rounded-full" />
      </section>

      {/* Badges Grid */}
      <section className="grid grid-cols-3 gap-4">
        {mockBadges.map((badge) => (
          <div
            key={badge.id}
            onClick={() => setSelectedBadge(badge)}
            className="cursor-pointer group relative"
          >
            <div className={`aspect-square rounded-full flex flex-col items-center justify-center border-2 transition-all duration-300 ${
              badge.unlocked
                ? 'bg-green-dark/20 border-green-neon shadow-[0_0_10px_rgba(132,204,22,0.3)]'
                : 'bg-bg-tertiary border-border-custom opacity-60 grayscale'
            }`}>
              <span className="text-3xl mb-1">{badge.icon}</span>
              {badge.unlocked && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-neon rounded-full border-2 border-bg-primary" />}
            </div>
            <div className="text-center mt-2">
              <span className={`text-[10px] uppercase font-bold ${badge.unlocked ? 'text-text-primary' : 'text-text-muted'}`}>
                {badge.name}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* Next Badge Progress */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary text-xs uppercase font-bold">Siguiente Insignia</span>
          <span className="text-green-neon font-mono text-xs">14 / 25 Clases</span>
        </div>
        <div className="w-full h-2 bg-bg-tertiary overflow-hidden">
          <div className="h-full bg-green-neon transition-all duration-1000" style={{ width: '56%' }} />
        </div>
      </section>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-bg-secondary border border-border-custom w-full max-w-sm p-8 text-center space-y-6"
            >
              <div className="relative flex justify-center">
                <span className={`text-7xl p-6 rounded-full border-4 ${selectedBadge.unlocked ? 'border-green-neon shadow-[0_0_30px_rgba(132,204,22,0.4)]' : 'border-border-custom opacity-50'}`}>
                  {selectedBadge.icon}
                </span>
                {!selectedBadge.unlocked && (
                  <Lock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-text-muted" />
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-display text-text-primary uppercase">{selectedBadge.name}</h3>
                <p className="text-text-secondary text-sm px-4">{selectedBadge.description}</p>
              </div>

              <div className="p-4 bg-bg-tertiary border border-border-custom text-left">
                <span className="text-[10px] uppercase text-text-muted font-bold block mb-1">Requisito</span>
                <span className="text-text-primary font-mono text-xs">{selectedBadge.condition}</span>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => setSelectedBadge(null)}
                >
                  CERRAR
                </Button>
                {!selectedBadge.unlocked && (
                  <Button
                    className="flex-1"
                    onClick={() => {
                      handleUnlock(selectedBadge)
                      setSelectedBadge(null)
                    }}
                  >
                    SIMULAR GANANCIA
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unlocking Animation */}
      <AnimatePresence>
        {unlockingBadge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="fixed inset-0 z-[110] pointer-events-none flex items-center justify-center"
          >
            <div className="bg-green-neon text-bg-primary p-8 rounded-none font-display text-4xl shadow-[0_0_50px_rgba(132,204,22,0.6)]">
              ¡LOGRO DESBLOQUEADO!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Achievements
