import { useStore } from '../../store/useStore'
import AnimatedBike from '../../components/bike/AnimatedBike'
import { Card } from '../../components/ui'
import { Flame, Calendar, Target, TrendingUp } from 'lucide-react'

const Home = () => {
  const { profile } = useStore()

  // Mock data for now
  const mockStats = {
    totalClasses: 42,
    currentStreak: 3,
    nextGoal: { title: '50 Clases', progress: 84 },
    rank: 7,
    nextClass: {
      title: 'Morning Burn',
      time: '2026-06-01T07:00:00Z',
      location: 'Smart Fit Cali'
    }
  }

  return (
    <div className="p-6 space-y-8 max-w-[430px] mx-auto">
      {/* Hero Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-display text-text-primary leading-tight">
              Bienvenido de vuelta,<br />
              <span className="text-green-neon">{profile?.full_name || 'Atleta'} 🔥</span>
            </h2>
          </div>
          <div className="w-12 h-12 bg-bg-secondary border border-border-custom rounded-full overflow-hidden">
            <img src={profile?.avatar_url || 'https://via.placeholder.com/48'} alt="profile" />
          </div>
        </div>

        <Card className="relative overflow-hidden group">
          <div className="flex flex-col items-center py-8">
            <AnimatedBike speed={(mockStats.currentStreak / 4) || 0.3} className="mb-4" />
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-green-neon font-mono text-2xl">
                <Flame className="w-6 h-6" />
                <span>{mockStats.currentStreak} Semanas de Racha</span>
              </div>
              <p className="text-text-secondary text-sm mt-1">¡Sigue pedaleando fuerte!</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Quick Stats Grid */}
      <section className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col items-center justify-center text-center py-6">
          <div className="text-green-neon font-display text-4xl mb-1">{mockStats.totalClasses}</div>
          <div className="text-text-secondary text-xs uppercase tracking-widest flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Clases
          </div>
        </Card>
        <Card className="flex flex-col items-center justify-center text-center py-6">
          <div className="text-green-neon font-display text-4xl mb-1">{mockStats.rank}º</div>
          <div className="text-text-secondary text-xs uppercase tracking-widest flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Ranking
          </div>
        </Card>
        <Card className="col-span-2 flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Target className="text-green-neon w-6 h-6" />
            <div className="text-left">
              <div className="text-text-primary font-body text-sm font-bold">{mockStats.nextGoal.title}</div>
              <div className="text-text-secondary text-xs">{mockStats.nextGoal.progress}% completado</div>
            </div>
          </div>
          <div className="w-24 h-2 bg-bg-tertiary rounded-full overflow-hidden">
            <div
              className="h-full bg-green-neon transition-all duration-1000"
              style={{ width: `${mockStats.nextGoal.progress}%` }}
            />
          </div>
        </Card>
      </section>

      {/* Next Class Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-display text-text-primary uppercase tracking-wider">Próxima Clase</h3>
        <Card className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border-l-4 border-l-green-neon">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-lg font-display text-text-primary">{mockStats.nextClass.title}</div>
              <div className="text-text-secondary text-sm flex items-center gap-1">
                <span className="opacity-70">📍</span> {mockStats.nextClass.location}
              </div>
            </div>
            <div className="text-right">
              <div className="text-green-neon font-mono text-xl font-bold">07:00 AM</div>
              <div className="text-text-muted text-[10px] uppercase">Mañana</div>
            </div>
          </div>
        </Card>
      </section>

      {/* My Week Section */}
      <section className="space-y-4 pb-8">
        <h3 className="text-xl font-display text-text-primary uppercase tracking-wider">Mi Semana</h3>
        <div className="grid grid-cols-7 gap-2">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
            <div key={day} className="flex flex-col items-center gap-2">
              <span className="text-text-muted text-[10px] font-bold uppercase">{day}</span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${i === 2 || i === 4 ? 'bg-green-neon border-green-mid text-bg-primary' : 'border-border-custom text-text-secondary'}`}>
                {i === 2 || i === 4 ? '✓' : '•'}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
