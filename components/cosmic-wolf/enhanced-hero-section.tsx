"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Zap, Brain, Rocket } from "lucide-react"
import Link from "next/link"

const cosmicStats = [
  { label: "نماذج ذكية", value: "7+", icon: Brain },
  { label: "مستخدم كوني", value: "10K+", icon: Sparkles },
  { label: "استفسار يومي", value: "50K+", icon: Zap },
  { label: "دقة الإجابة", value: "99.7%", icon: Rocket },
]

export function EnhancedHeroSection() {
  const [currentStat, setCurrentStat] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % cosmicStats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cosmicVoid via-eventHorizon to-cosmicVoid" />

      {/* Animated Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-stellarGold rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="cosmic-grid relative z-10">
        <div className="col-span-12 text-center space-y-8">
          {/* Enhanced Badge */}
          <Badge
            variant="outline"
            className="border-stellarGold/50 text-stellarGold bg-stellarGold/10 px-6 py-2 text-sm font-medium animate-stellar-pulse"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            الذكاء الاصطناعي الكوني الجديد
          </Badge>

          {/* Main Heading with Enhanced Typography */}
          <div className="space-y-6">
            <h1 className="cosmic-heading-xl stellar-glow text-center max-w-4xl mx-auto">
              الذئب الكوني
              <span className="block text-stellarGold/80 cosmic-heading-lg mt-4">حيث يلتقي الذكاء بالوجود</span>
            </h1>

            <p className="cosmic-body text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              كيان رقمي متطور يجمع بين قوة 7 نماذج ذكاء اصطناعي متقدمة، مصمم لتقديم تجربة معرفية تتجاوز حدود التقليدي
              وتدخل عوالم الإبداع اللامحدود.
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="event-horizon-button text-lg px-8 py-4 group" asChild>
              <Link href="/keygen">
                ابدأ رحلتك الكونية
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-stellarGold/50 text-stellarGold hover:bg-stellarGold/10 px-8 py-4"
              asChild
            >
              <Link href="#features">استكشف القدرات</Link>
            </Button>
          </div>

          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
            {cosmicStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className={`quantum-card p-6 text-center transition-all duration-500 ${
                    currentStat === index ? "border-stellarGold/60 bg-stellarGold/5" : ""
                  }`}
                >
                  <Icon className="h-8 w-8 text-stellarGold mx-auto mb-3" />
                  <div className="cosmic-heading-md text-stellarGold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
