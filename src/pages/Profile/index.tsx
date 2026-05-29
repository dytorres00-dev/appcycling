import { useState } from 'react'
import { Card, Button } from '../../components/ui'
import { useAuth } from '../../hooks/useAuth'
import { useStore } from '../../store/useStore'
import { LogOut, Edit3, MapPin } from 'lucide-react'

const Profile = () => {
  const { profile } = useStore()
  const { signOut } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    full_name: profile?.full_name || '',
    city: profile?.city || 'Cali',
    bio: profile?.bio || ''
  })

  const handleSave = () => {
    setIsEditing(false)
    // Implementation for updating profile in Supabase would go here
  }

  return (
    <div className="p-6 space-y-8 max-w-[430px] mx-auto pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display text-text-primary uppercase tracking-wider">Mi Perfil</h2>
      </div>

      <section className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-32 h-32 bg-bg-secondary border-4 border-green-neon rounded-full overflow-hidden flex items-center justify-center text-5xl font-display text-green-neon">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="profile" className="w-full h-full object-cover" />
            ) : (
              (profile?.full_name || 'A').charAt(0)
            )}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-green-neon text-bg-primary rounded-full border-2 border-bg-primary">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl font-display text-text-primary">{profile?.full_name || 'Cargando...'}</h3>
          <div className="flex items-center justify-center gap-1 text-text-secondary text-xs uppercase">
            <MapPin className="w-3 h-3" /> {profile?.city || 'Cali'}
          </div>
        </div>
      </section>

      {isEditing ? (
        <Card className="space-y-4">
          <div className="space-y-3">
            <label className="text-text-muted text-xs uppercase font-bold block">Nombre completo</label>
            <input
              type="text"
              className="w-full p-3 bg-bg-tertiary border border-border-custom text-text-primary focus:outline-none focus:border-green-neon"
              value={editData.full_name}
              onChange={(e) => setEditData({ ...editData, full_name: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="text-text-muted text-xs uppercase font-bold block">Ciudad</label>
            <input
              type="text"
              className="w-full p-3 bg-bg-tertiary border border-border-custom text-text-primary focus:outline-none focus:border-green-neon"
              value={editData.city}
              onChange={(e) => setEditData({ ...editData, city: e.target.value })}
            />
          </div>
          <div className="space-y-3">
            <label className="text-text-muted text-xs uppercase font-bold block">Bio</label>
            <textarea
              className="w-full p-3 bg-bg-tertiary border border-border-custom text-text-primary focus:outline-none focus:border-green-neon"
              value={editData.bio}
              onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
              rows={3}
            />
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setIsEditing(false)}>CANCELAR</Button>
            <Button className="flex-1" onClick={handleSave}>GUARDAR</Button>
          </div>
        </Card>
      ) : (
        <Card className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary text-xs uppercase font-bold">Información Personal</span>
            <button onClick={() => setIsEditing(true)} className="text-green-neon hover:underline text-xs font-bold uppercase">Editar</button>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border-custom">
              <span className="text-text-muted">Ciudad</span>
              <span className="text-text-primary">{profile?.city || 'Cali'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border-custom">
              <span className="text-text-muted">Bio</span>
              <span className="text-text-primary text-right">{profile?.bio || 'Sin bio disponible'}</span>
            </div>
          </div>
        </Card>
      )}

      <section className="grid grid-cols-3 gap-4">
        <Card className="text-center space-y-1">
          <div className="text-green-neon font-display text-2xl">42</div>
          <div className="text-text-secondary text-[10px] uppercase font-bold">Clases</div>
        </Card>
        <Card className="text-center space-y-1">
          <div className="text-green-neon font-display text-2xl">12</div>
          <div className="text-text-secondary text-[10px] uppercase font-bold">Racha Max</div>
        </Card>
        <Card className="text-center space-y-1">
          <div className="text-green-neon font-display text-2xl">8</div>
          <div className="text-text-secondary text-[10px] uppercase font-bold">Metas</div>
        </Card>
      </section>

      <div className="flex flex-col gap-4">
        <Button
          variant="secondary"
          className="w-full flex items-center justify-center gap-2 py-4"
          onClick={() => signOut()}
        >
          <LogOut className="w-5 h-5" /> CERRAR SESIÓN
        </Button>
      </div>
    </div>
  )
}

export default Profile
