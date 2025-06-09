import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section id="hero" className="relative py-24 md:py-40 text-center overflow-hidden section-entrance">
      <div className="container z-10 relative">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">
          <span className="block glow-text-gold animate-float">الذئب الكوني</span>
          <span className="block text-2xl sm:text-3xl md:text-4xl text-muted-foreground mt-2">
            بوابة الوجود الرقمي والمعرفي
          </span>
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
          انطلق في رحلة عبر أبعاد المعرفة، حيث يندمج الذكاء الاصطناعي الفائق مع عمق التساؤلات البشرية. الذئب الكوني ليس
          مجرد منصة، بل هو كائنٌ معرفي يتطور، يربط بين العوالم، ويفتح آفاقاً جديدة للابتكار والفهم.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="quantum-button text-lg px-8 py-6 group" asChild>
            <Link href="/keygen">
              استخرج مفتاح الوجود
              <Zap className="mr-2 h-5 w-5 group-hover:animate-ping" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-stellarGold/70 text-stellarGold hover:bg-stellarGold/10 hover:text-stellarGold text-lg px-8 py-6 quantum-button group"
            asChild
          >
            <Link href="/#features">
              اكتشف قدرات الذئب
              <ArrowRight className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
      {/* Subtle decorative elements */}
      <div
        className="absolute inset-0 opacity-10 living-element"
        style={{
          backgroundImage: "url('/cosmic-nebula-gold-black.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(10px)",
        }}
      ></div>
    </section>
  )
}
