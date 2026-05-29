import { useState } from 'react'
import { Card, Button } from '../../components/ui'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { Target, Activity, Heart, Droplet, Wind } from 'lucide-react'
import confetti from 'canvas-confetti'

type Tab = 'attendance' | 'goals' | 'body' | 'wellness'

const Progress = () => {
  const [activeTab, setActiveTab] = useState<Tab>('attendance')

  const renderTab = () => {
    switch (activeTab) {
      case 'attendance': return <AttendanceTab />
      case 'goals': return <GoalsTab />
      case 'body': return <BodyTab />
      case 'wellness': return <WellnessTab />
    }
  }

  return (
    <div className="p-6 space-y-6 max-w-[430px] mx-auto">
      <h2 className="text-3xl font-display text-text-primary uppercase tracking-wider">Mi Progreso</h2>

      <div className="flex bg-bg-secondary p-1 rounded-none border border-border-custom">
        {(['attendance', 'goals', 'body', 'wellness'] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs uppercase font-bold transition-all ${
              activeTab === tab ? 'bg-green-neon text-bg-primary' : 'text-text-secondary'
            }`}
          >
            {tab === 'attendance' ? 'Asistencia' : tab === 'goals' ? 'Metas' : tab === 'body' ? 'Cuerpo' : 'Bienestar'}
          </button>
        ))}
      </div>

      {renderTab()}
    </div>
  )
}

const AttendanceTab = () => {
  const data = [
    { month: 'Dic', classes: 12 },
    { month: 'Ene', classes: 15 },
    { month: 'Feb', classes: 10 },
    { month: 'Mar', classes: 18 },
    { month: 'Abr', classes: 22 },
    { month: 'May', classes: 14 },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <div className="text-green-neon font-display text-6xl mb-2">81</div>
        <div className="text-text-secondary text-xs uppercase tracking-widest">Clases Totales</div>
      </div>

      <Card className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ backgroundColor: '#111111', border: '1px solid #262626', borderRadius: '0px' }}
              itemStyle={{ color: '#84cc16' }}
            />
            <Bar dataKey="classes" fill="#84cc16" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="space-y-3">
        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider">Últimas Clases</h3>
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="flex justify-between items-center py-3">
            <div className="text-left">
              <div className="text-text-primary text-sm font-bold">Smart Fit Cali</div>
              <div className="text-text-muted text-[10px] uppercase">22 Mayo, 2026</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-green-neon font-mono text-xs">Esfuerzo: 4/5</div>
              <div className="text-green-neon font-mono text-xs">😊</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

const GoalsTab = () => {
  const goals = [
    { id: '1', title: 'Llegar a 50 clases', progress: 84, type: 'attendance', unit: 'clases' },
    { id: '2', title: 'Bajar 2kg de grasa', progress: 60, type: 'body', unit: 'kg' },
    { id: '3', title: 'Racha de 30 días', progress: 20, type: 'habit', unit: 'días' },
  ]

  const completeGoal = (_id: string) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#84cc16', '#ffffff', '#166534']
    })
  }

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <Card key={goal.id} className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-green-neon" />
              <span className="text-text-primary font-body text-sm font-bold">{goal.title}</span>
            </div>
            <span className="text-green-neon font-mono text-xs">{goal.progress}%</span>
          </div>
          <div className="w-full h-2 bg-bg-tertiary overflow-hidden">
            <div
              className="h-full bg-green-neon transition-all duration-1000"
              style={{ width: `${goal.progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-text-muted text-[10px] uppercase">{goal.unit}</span>
            <Button
              className="px-3 py-1 text-xs font-display"
              onClick={() => completeGoal(goal.id)}
            >
              MARCAR LOGRO
            </Button>
          </div>
        </Card>
      ))}
      <Button className="w-full mt-4 font-display text-xl py-4">
        NUEVA META +
      </Button>
    </div>
  )
}

const BodyTab = () => {
  const data = [
    { date: 'Ene', weight: 85, fat: 22 },
    { date: 'Feb', weight: 84, fat: 21 },
    { date: 'Mar', weight: 83, fat: 20 },
    { date: 'Abr', weight: 82, fat: 19 },
    { date: 'May', weight: 81, fat: 18 },
  ]

  return (
    <div className="space-y-6">
      <Card className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ backgroundColor: '#111111', border: '1px solid #262626', borderRadius: '0px' }}
              itemStyle={{ color: '#84cc16' }}
            />
            <Line type="monotone" dataKey="weight" stroke="#84cc16" strokeWidth={3} dot={{ r: 4, fill: '#84cc16' }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider">Registro Semanal</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-text-muted text-xs uppercase block">Peso (kg)</label>
            <input type="number" className="w-full p-3 bg-bg-tertiary border border-border-custom text-text-primary focus:outline-none focus:border-green-neon" placeholder="0.0" />
          </div>
          <div className="space-y-2">
            <label className="text-text-muted text-xs uppercase block">% Grasa</label>
            <input type="number" className="w-full p-3 bg-bg-tertiary border border-border-custom text-text-primary focus:outline-none focus:border-green-neon" placeholder="0.0" />
          </div>
        </div>
        <Button className="w-full font-display text-xl py-4">ACTUALIZAR MEDIDAS</Button>
      </div>
    </div>
  )
}

const WellnessTab = () => {
  const data = [
    { subject: 'Energía', A: 120, fullMark: 150 },
    { subject: 'Sueño', A: 98, fullMark: 150 },
    { subject: 'Agua', A: 86, fullMark: 150 },
    { subject: 'Pasos', A: 99, fullMark: 150 },
    { subject: 'Ánimo', A: 85, fullMark: 150 },
  ]

  return (
    <div className="space-y-6">
      <Card className="h-64 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#262626" />
            <PolarAngleAxis dataKey="subject" stroke="#a3a3a3" fontSize={10} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar name="Wellness" dataKey="A" stroke="#84cc16" fill="#84cc16" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col items-center gap-3 text-center">
          <div className="p-3 bg-bg-tertiary rounded-full text-green-neon">
            <Wind className="w-6 h-6" />
          </div>
          <div className="text-text-primary font-bold">Energía</div>
          <div className="text-text-muted text-xs uppercase">4 / 5</div>
        </Card>
        <Card className="flex flex-col items-center gap-3 text-center">
          <div className="p-3 bg-bg-tertiary rounded-full text-green-neon">
            <Heart className="w-6 h-6" />
          </div>
          <div className="text-text-primary font-bold">Sueño</div>
          <div className="text-text-muted text-xs uppercase">7.5 hrs</div>
        </Card>
        <Card className="flex flex-col items-center gap-3 text-center">
          <div className="p-3 bg-bg-tertiary rounded-full text-green-neon">
            <Droplet className="w-6 h-6" />
          </div>
          <div className="text-text-primary font-bold">Agua</div>
          <div className="text-text-muted text-xs uppercase">2.5 L</div>
        </Card>
        <Card className="flex flex-col items-center gap-3 text-center">
          <div className="p-3 bg-bg-tertiary rounded-full text-green-neon">
            <Activity className="w-6 h-6" />
          </div>
          <div className="text-text-primary font-bold">Pasos</div>
          <div className="text-text-muted text-xs uppercase">8.4k</div>
        </Card>
      </div>
    </div>
  )
}

export default Progress
