"use client"

import type React from "react"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Zap, Crown } from "lucide-react"

interface PricingTier {
  id: string
  name: string
  arabicName: string
  price: string
  period: string
  description: string
  features: string[]
  icon: React.ComponentType<{ className?: string }>
  gradient: string
  popular?: boolean
  ctaText: string
  ctaVariant: "default" | "destructive" | "outline"
}

const pricingTiers: PricingTier[] = [
  {
    id: "neutron-star",
    name: "Neutron Star",
    arabicName: "النجم النيوتروني",
    price: "مجاني",
    period: "للأبد",
    description: "للمستكشفين الكونيين الجدد الذين يبدؤون رحلتهم في عوالم الذكاء الاصطناعي",
    features: ["100 استفسار شهرياً", "وصول لنموذج Llama 3.1", "دعم مجتمعي", "واجهة ويب أساسية", "توثيق شامل"],
    icon: Sparkles,
    gradient: "from-blue-500 to-cyan-500",
    ctaText: "ابدأ مجاناً",
    ctaVariant: "outline",
  },
  {
    id: "supernova",
    name: "Supernova",
    arabicName: "المستعر الأعظم",
    price: "$99",
    period: "شهرياً",
    description: "للمطورين والباحثين المتقدمين الذين يحتاجون قوة إضافية لمشاريعهم الطموحة",
    features: [
      "10,000 استفسار شهرياً",
      "وصول لجميع النماذج السبعة",
      "واجهة API كاملة",
      "دعم فني متقدم",
      "تكامل Telegram Bot",
      "تحليلات مفصلة",
    ],
    icon: Zap,
    gradient: "from-yellow-500 to-orange-500",
    popular: true,
    ctaText: "اشترك الآن",
    ctaVariant: "default",
  },
  {
    id: "black-hole",
    name: "Black Hole",
    arabicName: "الثقب الأسود",
    price: "$299",
    period: "شهرياً",
    description: "للعباقرة والمؤسسات التي تريد تغيير العالم بقوة الذكاء الاصطناعي اللامحدود",
    features: [
      "استفسارات غير محدودة",
      "أولوية في جميع النماذج",
      "نماذج مخصصة حسب الطلب",
      "دعم مخصص 24/7",
      "تكامل مؤسسي متقدم",
      "استشارات تقنية شخصية",
      "SLA مضمون 99.9%",
    ],
    icon: Crown,
    gradient: "from-purple-600 to-pink-600",
    ctaText: "تواصل معنا",
    ctaVariant: "destructive",
  },
]

interface UnifiedPricingCardProps {
  tier: PricingTier
  className?: string
}

export function UnifiedPricingCard({ tier, className = "" }: UnifiedPricingCardProps) {
  const Icon = tier.icon

  return (
    <Card
      className={`
        relative overflow-hidden transition-all duration-300 
        bg-gradient-to-br from-cosmic-void/80 to-eventHorizon/60
        border border-primary-gold/20 hover:border-primary-gold/50
        backdrop-blur-md hover:scale-105 hover:shadow-cosmic
        ${tier.popular ? "ring-2 ring-primary-gold/50 scale-105" : ""}
        ${className}
      `}
    >
      {/* شارة الشعبية */}
      {tier.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-gold to-primary-goldDark text-cosmic-void text-xs font-bold px-4 py-1.5 rounded-bl-lg">
          الأكثر شعبية
        </div>
      )}

      <CardHeader className="text-center space-y-4 pt-8">
        {/* أيقونة الطبقة */}
        <div
          className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${tier.gradient} flex items-center justify-center shadow-stellar`}
        >
          <Icon className="h-8 w-8 text-white" />
        </div>

        {/* اسم الطبقة */}
        <div>
          <h3 className="text-2xl font-bold text-primary-gold mb-1">{tier.arabicName}</h3>
          <p className="text-sm text-muted-foreground">{tier.name}</p>
        </div>

        {/* السعر */}
        <div className="space-y-1">
          <div className="text-4xl font-extrabold text-foreground">{tier.price}</div>
          <div className="text-sm text-muted-foreground">{tier.period}</div>
        </div>

        {/* الوصف */}
        <p className="text-sm text-muted-foreground leading-relaxed px-2">{tier.description}</p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* قائمة المميزات */}
        <ul className="space-y-3">
          {tier.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-primary-gold mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground/90 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* زر الإجراء */}
        <Button
          size="lg"
          variant={tier.ctaVariant}
          className={`
            w-full text-base py-6 font-semibold transition-all duration-300
            ${
              tier.ctaVariant === "default"
                ? "bg-gradient-to-r from-primary-gold to-primary-goldDark text-cosmic-void hover:shadow-stellar hover:scale-105"
                : tier.ctaVariant === "destructive"
                  ? "bg-gradient-to-r from-supernova-red to-red-600 hover:shadow-lg"
                  : "border-primary-gold/50 text-primary-gold hover:bg-primary-gold/10"
            }
          `}
        >
          {tier.ctaText}
        </Button>
      </CardContent>
    </Card>
  )
}

export function UnifiedPricingSection() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* العنوان الموحد */}
        <div className="text-center mb-16 space-y-6">
          <Badge variant="outline" className="border-primary-gold/50 text-primary-gold bg-primary-gold/10 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            خطط الاشتراك الكونية
          </Badge>

          <h2 className="text-4xl md:text-5xl font-bold text-primary-gold mb-4">اختر قوتك الكونية</h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            من النجم النيوتروني للمبتدئين إلى الثقب الأسود للعباقرة، اختر الطبقة التي تناسب طموحاتك الكونية
          </p>
        </div>

        {/* بطاقات التسعير الموحدة */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <UnifiedPricingCard key={tier.id} tier={tier} />
          ))}
        </div>

        {/* ضمان الجودة */}
        <div className="text-center mt-16 p-8 rounded-lg bg-primary-gold/5 border border-primary-gold/20">
          <h3 className="text-xl font-semibold text-primary-gold mb-3">ضمان الرضا الكوني</h3>
          <p className="text-muted-foreground">
            30 يوماً لاسترداد كامل إذا لم تحقق النتائج المتوقعة. نحن واثقون من قوة الذكاء الكوني.
          </p>
        </div>
      </div>
    </section>
  )
}
