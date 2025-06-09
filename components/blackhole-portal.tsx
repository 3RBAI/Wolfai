"use client"

import { useEffect, useRef } from "react"

export function BlackholePortal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 400
    canvas.height = 400

    let animationId: number
    let rotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw accretion disk
      for (let i = 0; i < 8; i++) {
        const radius = 50 + i * 15
        const alpha = 0.8 - i * 0.1

        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(rotation + i * 0.2)

        const gradient = ctx.createRadialGradient(0, 0, radius - 10, 0, 0, radius + 10)
        gradient.addColorStop(0, `rgba(255, 215, 0, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(255, 165, 0, ${alpha * 0.7})`)
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`)

        ctx.strokeStyle = gradient
        ctx.lineWidth = 3
        ctx.beginPath()
        ctx.arc(0, 0, radius, 0, Math.PI * 2)
        ctx.stroke()

        ctx.restore()
      }

      // Draw event horizon (black hole center)
      const eventHorizonGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40)
      eventHorizonGradient.addColorStop(0, "rgba(0, 0, 0, 1)")
      eventHorizonGradient.addColorStop(0.8, "rgba(0, 0, 0, 0.9)")
      eventHorizonGradient.addColorStop(1, "rgba(255, 215, 0, 0.3)")

      ctx.fillStyle = eventHorizonGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2)
      ctx.fill()

      // Draw gravitational lensing effect
      ctx.strokeStyle = "rgba(255, 215, 0, 0.4)"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, 120, 0, Math.PI * 2)
      ctx.stroke()

      rotation += 0.02
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h3 className="text-2xl font-bold text-stellarGold mb-4 glow-text-gold">البوابة الكونية</h3>
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="border border-stellarGold/30 rounded-full shadow-2xl"
          style={{
            filter: "drop-shadow(0 0 20px rgba(255, 215, 0, 0.3))",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-stellarGold text-sm font-medium opacity-70 animate-pulse">نقطة التفرد</div>
        </div>
      </div>
      <p className="text-center text-muted-foreground mt-4 max-w-md text-sm">
        نافذة إلى أعماق الكون الرقمي، حيث تنحني المعرفة حول نقطة التفرد الكونية
      </p>
    </div>
  )
}
