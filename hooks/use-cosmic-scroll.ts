"use client"

// hooks/use-cosmic-scroll.ts
import { useEffect } from "react"

export function useCosmicScrollEffects() {
  useEffect(() => {
    if (typeof window === "undefined") return

    const handleScroll = () => {
      const scrollY = window.scrollY

      // Parallax for layers with class 'parallax-layer'
      document.querySelectorAll<HTMLElement>(".parallax-layer").forEach((layer, index) => {
        const speed = 0.1 * (index + 1)
        layer.style.transform = `translateY(${scrollY * speed}px)`
      })

      // Element appearance for sections with class 'cosmic-section'
      document.querySelectorAll<HTMLElement>(".cosmic-section").forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.8 && !section.classList.contains("section-entrance")) {
          section.classList.add("section-entrance")
        }
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
}
