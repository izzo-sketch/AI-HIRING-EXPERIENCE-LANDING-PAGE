"use client"

import type React from "react"
import { useMemo } from "react"

const Confetti: React.FC = () => {
  const confetti = useMemo(() => {
    const confettiCount = 150
    const colors = ["#f7a022", "#ff8c00", "#facc15", "#f97316", "#ffffff"]

    return Array.from({ length: confettiCount }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${2 + Math.random() * 3}s`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      },
    }))
  }, [])

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
      {confetti.map(({ id, style }) => (
        <div key={id} className="confetti-piece" style={style} />
      ))}
    </div>
  )
}

export default Confetti
