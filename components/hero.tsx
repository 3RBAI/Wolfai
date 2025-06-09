import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils" // Import cn utility

export function Hero() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden section-entrance">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter animate-float",
              "glow-text", // Apply glow effect
            )}
          >
            <span className="text-primary">الذئب الكوني</span>
            <br />
            بوابة الذكاء الاصطناعي المتقدمة
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl">
            اكتشف قوة الذكاء الاصطناعي المتقدم مع واجهة موحدة للوصول إلى نماذج متعددة وتجربة فريدة من نوعها
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Button size="lg" className="quantum-button">
              {" "}
              {/* Apply quantum button style */}
              ابدأ الآن
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="quantum-button">
              {" "}
              {/* Apply quantum button style */}
              عرض النماذج
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements - consider updating colors if needed */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-stellarGold/10 blur-3xl living-element" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-quantumBlue/10 blur-3xl living-element" />
    </section>
  )
}
