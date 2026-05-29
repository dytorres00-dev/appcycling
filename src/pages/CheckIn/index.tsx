import { useState, useEffect } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { Card, Button } from '../../components/ui'
import { CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const CheckIn = () => {
  const [scanning, setScanning] = useState(true)
  const [step, setStep] = useState<'scanning' | 'details'>('scanning')
  const [formData, setFormData] = useState({ effort: 3, mood: 3, notes: '' })

  useEffect(() => {
    if (step === 'scanning' && scanning) {
      const scanner = new Html5QrcodeScanner(
        'reader',
        { fps: 10, qrbox: { width: 250, height: 250 }, rememberLastUsedCamera: true },
        false
      )

      scanner.render((_decodedText) => {
        setStep('details')
        scanner.clear()
      }, (_error) => {
        // console.log('Error scanning:', _error)
      })

      return () => {
      scanner.clear()
    }
    }
  }, [step, scanning])

  const handleSubmit = async () => {
    // Mock submission
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#84cc16', '#ffffff', '#166534']
    })

    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  }

  return (
    <div className="p-6 space-y-6 max-w-[430px] mx-auto pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display text-text-primary uppercase tracking-wider">Registrar Clase</h2>
        <p className="text-text-secondary text-xs uppercase tracking-widest">Escanea el código de Edwin</p>
      </div>

      <AnimatePresence mode="wait">
        {step === 'scanning' ? (
          <motion.div
            key="scanner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="relative aspect-square w-full bg-bg-secondary border-4 border-green-neon overflow-hidden">
              <div id="reader" className="w-full h-full" />
            </div>
            <Card className="text-center py-4">
              <p className="text-text-secondary text-xs">Apunta la cámara hacia el código QR al final de la clase</p>
            </Card>
            <Button
              className="w-full"
              onClick={() => setScanning(false)}
            >
              CANCELAR
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center p-4 bg-green-dark/20 border border-green-neon text-green-neon font-bold uppercase text-sm flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> QR Escaneado Correctamente
            </div>

            <Card className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="text-text-muted text-xs uppercase font-bold block">¿Cómo te sentiste? (Esfuerzo)</label>
                  <div className="flex justify-between gap-2">
                    {[1, 2, 3, 4, 5].map((v) => (
                      <button
                        key={v}
                        onClick={() => setFormData({ ...formData, effort: v })}
                        className={`w-10 h-10 rounded-none border transition-all ${formData.effort === v ? 'bg-green-neon text-bg-primary border-green-neon' : 'bg-bg-tertiary border-border-custom text-text-secondary'}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-text-muted text-xs uppercase font-bold block">Estado de ánimo</label>
                  <div className="flex justify-between gap-2">
                    {['😢', '😐', '🙂', '😊', '🤩'].map((emoji, i) => (
                      <button
                        key={emoji}
                        onClick={() => setFormData({ ...formData, mood: i + 1 })}
                        className={`w-10 h-10 rounded-none border transition-all ${formData.mood === i + 1 ? 'bg-green-neon border-green-neon' : 'bg-bg-tertiary border-border-custom'}`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-text-muted text-xs uppercase font-bold block">Notas adicionales</label>
                  <textarea
                    className="w-full p-3 bg-bg-tertiary border border-border-custom text-text-primary focus:outline-none focus:border-green-neon transition-colors"
                    placeholder="Ej: Me costó la subida final..."
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </div>

              <Button className="w-full py-4" onClick={handleSubmit}>
                CONFIRMAR ASISTENCIA
              </Button>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CheckIn
