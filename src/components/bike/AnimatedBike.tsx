import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedBikeProps {
  speed?: number // 0 to 1 (1 is fastest)
  className?: string
}

const AnimatedBike: React.FC<AnimatedBikeProps> = ({ speed = 0.5, className = '' }) => {
  // removed pedalRotation because it's not used in the render logic currently

  return (
    <div className={`relative w-64 h-64 ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full fill-green-neon"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simple Bike Silhouette */}
        <g transform="translate(50, 100)">
          {/* Wheels */}
          <circle cx="0" cy="50" r="20" stroke="currentColor" strokeWidth="4" fill="none" />
          <circle cx="100" cy="50" r="20" stroke="currentColor" strokeWidth="4" fill="none" />

          {/* Frame */}
          <path d="M0 50 L40 20 L80 20 L100 50 L80 50 L60 30 L40 50 Z" stroke="currentColor" strokeWidth="4" fill="none" />

          {/* Pedals / Crank */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 / (speed * 2), ease: "linear" }}
            style={{ originX: '50px', originY: '50px' }}
          >
            <circle cx="50" cy="50" r="4" fill="currentColor" />
            <line x1="50" y1="50" x2="50" y2="30" stroke="currentColor" strokeWidth="4" />
            <circle cx="50" cy="30" r="4" fill="currentColor" />
          </motion.g>

          {/* Handlebars */}
          <line x1="80" y1="20" x2="90" y2="10" stroke="currentColor" strokeWidth="4" />
        </g>
      </svg>
    </div>
  )
}

export default AnimatedBike
