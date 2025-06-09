import { CosmicParticles } from "@/components/cosmic-particles"
import { MainHeader } from "@/components/cosmic-wolf/main-header"
import { EnhancedHeroSection } from "@/components/cosmic-wolf/enhanced-hero-section"
import { EnhancedFeaturesSection } from "@/components/cosmic-wolf/enhanced-features-section"
import { UnifiedPricingSection } from "@/components/cosmic-design/unified-pricing-card"
import { QuantumChatInterface } from "@/components/cosmic-design/quantum-chat-interface"
import { MainFooter } from "@/components/cosmic-wolf/main-footer"

export default function CosmicLandingPage() {
  return (
    <div className="relative min-h-screen bg-cosmic-void text-foreground">
      <CosmicParticles />
      <MainHeader />

      <main className="relative z-10">
        {/* القسم البطولي المحسن */}
        <EnhancedHeroSection />

        {/* قسم المميزات الموحد */}
        <EnhancedFeaturesSection />

        {/* قسم التسعير الموحد - إصلاح جذري */}
        <UnifiedPricingSection />

        {/* واجهة المحادثة الكمية - إعادة بناء كاملة */}
        <section className="py-20 bg-gradient-to-b from-eventHorizon/20 to-cosmic-void">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-gold">تفاعل مع الذكاء الكوني</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                ابدأ محادثتك مع الذئب الكوني واستكشف إمكانيات لا محدودة من المعرفة والإبداع
              </p>
            </div>
            <QuantumChatInterface />
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  )
}
