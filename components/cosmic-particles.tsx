"use client"
// Re-using the CosmicParticles component from the previous turn as it fits the theme.
// Ensure the class name used in the return statement matches the CSS if it was changed.
// For example, if CSS uses .cosmic-particles-canvas, update it here.

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  update: () => void
  draw: (ctx: CanvasRenderingContext2D) => void
}

class ParticleImpl implements Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  canvasWidth: number
  canvasHeight: number
  maxOpacity: number
  opacitySpeed: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.size = Math.random() * 2.5 + 0.5 // Slightly smaller for a more "stardust" feel
    this.speedX = (Math.random() - 0.5) * 0.3
    this.speedY = (Math.random() - 0.5) * 0.3
    this.maxOpacity = Math.random() * 0.4 + 0.1 // Max opacity for this particle
    this.opacity = 0 // Start invisible
    this.opacitySpeed = Math.random() * 0.01 + 0.005 // Speed of fading in/out
    this.color = `rgba(255, 215, 0, 1)` // Stellar Gold, opacity handled separately
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    // Fade in/out
    this.opacity += this.opacitySpeed
    if (this.opacity > this.maxOpacity || this.opacity < 0) {
      this.opacitySpeed *= -1 // Reverse direction
      this.opacity = Math.max(0, Math.min(this.maxOpacity, this.opacity)) // Clamp
    }

    // Wrap around edges instead of bouncing for a more continuous cosmic feel
    if (this.x < 0) this.x = this.canvasWidth
    if (this.x > this.canvasWidth) this.x = 0
    if (this.y < 0) this.y = this.canvasHeight
    if (this.y > this.canvasHeight) this.y = 0
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

export function CosmicParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<ParticleImpl[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000) // Density based on screen size

    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new ParticleImpl(canvas.width, canvas.height))
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const currentParticles = particlesRef.current
      currentParticles.forEach((particle) => {
        particle.update()
        particle.draw(ctx)

        // Optional: Connect nearby particles (can be performance intensive)
        // currentParticles.forEach((other) => {
        //   if (particle === other) return;
        //   const dx = particle.x - other.x;
        //   const dy = particle.y - other.y;
        //   const distance = Math.sqrt(dx * dx + dy * dy);

        //   if (distance < 80) { // Reduced distance for sparser connections
        //     ctx.beginPath();
        //     ctx.strokeStyle = `rgba(255, 215, 0, ${0.05 * (1 - distance / 80)})`; // More subtle lines
        //     ctx.lineWidth = 0.3;
        //     ctx.moveTo(particle.x, particle.y);
        //     ctx.lineTo(other.x, other.y);
        //     ctx.stroke();
        //   }
        // });
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="cosmic-particles-canvas" />
}
