import { useState } from 'react'
import { Card, Button, Badge } from '../../components/ui'
import { Heart, Plus, Award } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Post {
  id: string
  user_name: string
  content: string
  image_url?: string
  post_type: 'general' | 'achievement' | 'milestone' | 'coach_message'
  likes_count: number
  created_at: string
}

const mockPosts: Post[] = [
  {
    id: '1',
    user_name: 'Edwin Torres',
    content: '¡Increíble energía hoy en el entrenamiento de las 6 AM! Sigan así, la disciplina es la clave del éxito. 🔥🚴',
    post_type: 'coach_message',
    likes_count: 24,
    created_at: 'Hace 2 horas'
  },
  {
    id: '2',
    user_name: 'Carlos Mejía',
    content: 'Acabo de completar mi clase número 20. Me siento más fuerte que nunca. ⚡',
    post_type: 'achievement',
    likes_count: 12,
    created_at: 'Hace 5 horas'
  },
  {
    id: '3',
    user_name: 'Valentina Ríos',
    content: 'Día de pierna intenso. No puedo sentir mis piernas pero la satisfacción es total. 🦵💥',
    post_type: 'general',
    likes_count: 8,
    created_at: 'Ayer'
  }
]

const Community = () => {
  const [posts, setPosts] = useState(mockPosts)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes_count: p.likes_count + 1 } : p))
  }

  return (
    <div className="p-6 space-y-8 max-w-[430px] mx-auto pb-24">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-display text-text-primary uppercase tracking-wider">Comunidad</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-3 bg-green-neon text-bg-primary rounded-full hover:bg-green-mid transition-colors"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Ranking Section */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-text-secondary uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4" /> Top de la Semana
        </h3>
        <div className="flex items-end justify-center gap-4 h-32">
          {/* 2nd Place */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-text-muted font-mono text-xs">2º</span>
            <div className="w-12 bg-bg-secondary border border-border-custom rounded-t-lg h-16 flex items-center justify-center text-text-primary font-bold">
              VR
            </div>
            <span className="text-text-secondary text-[10px] uppercase font-bold">Valentina</span>
          </div>
          {/* 1st Place */}
          <div className="flex flex-col items-center gap-2 scale-110">
            <span className="text-green-neon font-mono text-lg font-bold">1º</span>
            <div className="w-14 bg-green-neon border border-green-mid rounded-t-lg h-24 flex items-center justify-center text-bg-primary font-bold text-xl">
              CM
            </div>
            <span className="text-text-primary text-xs uppercase font-bold">Carlos</span>
          </div>
          {/* 3rd Place */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-text-muted font-mono text-xs">3º</span>
            <div className="w-12 bg-bg-secondary border border-border-custom rounded-t-lg h-12 flex items-center justify-center text-text-primary font-bold">
              SL
            </div>
            <span className="text-text-secondary text-[10px] uppercase font-bold">Sebastián</span>
          </div>
        </div>
      </section>

      {/* Feed Section */}
      <section className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className={`relative overflow-hidden ${post.post_type === 'coach_message' ? 'border-l-4 border-l-green-neon' : ''}`}>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-bg-tertiary rounded-full flex items-center justify-center text-green-neon font-bold">
                {post.user_name[0]}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-text-primary font-bold text-sm">{post.user_name}</span>
                  <span className="text-text-muted text-[10px]">{post.created_at}</span>
                </div>
                <p className="text-text-secondary text-sm mt-2 leading-relaxed">
                  {post.content}
                </p>
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center gap-1 text-text-muted hover:text-green-neon transition-colors group"
                  >
                    <Heart className={`w-4 h-4 group-active:scale-125 transition-transform ${post.likes_count > 20 ? 'fill-green-neon text-green-neon' : ''}`} />
                    <span className="text-xs font-mono">{post.likes_count}</span>
                  </button>
                  {post.post_type === 'achievement' && (
                    <Badge className="text-[10px]">LOGRO</Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {/* Simple Modal for creating post */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-bg-secondary border border-border-custom w-full max-w-sm p-6 space-y-4"
            >
              <h3 className="text-xl font-display text-text-primary uppercase">Compartir Progreso</h3>
              <textarea
                className="w-full h-32 p-4 bg-bg-tertiary border border-border-custom text-text-primary focus:outline-none focus:border-green-neon transition-colors"
                placeholder="¿Cómo estuvo tu clase hoy?"
              />
              <div className="flex gap-3">
                <Button className="flex-1" onClick={() => setIsModalOpen(false)}>CANCELAR</Button>
                <Button className="flex-1" onClick={() => setIsModalOpen(false)}>PUBLICAR</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Community
