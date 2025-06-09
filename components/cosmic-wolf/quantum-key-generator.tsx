"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { KeyRound, Sparkles, Copy, Check, Loader2, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const keyTiers = [
  {
    id: "neutron",
    name: "النجم النيوتروني",
    price: "مجاني",
    requests: "100/شهر",
    color: "from-blue-500 to-cyan-500",
    description: "للمستكشفين الكونيين الجدد",
  },
  {
    id: "supernova",
    name: "المستعر الأعظم",
    price: "$99/شهر",
    requests: "10,000/شهر",
    color: "from-stellarGold to-yellow-600",
    description: "للمطورين والباحثين المتقدمين",
  },
  {
    id: "blackhole",
    name: "الثقب الأسود",
    price: "$299/شهر",
    requests: "غير محدود",
    color: "from-purple-600 to-pink-600",
    description: "للعباقرة الذين يغيرون العالم",
  },
]

export function QuantumKeyGenerator() {
  const [selectedTier, setSelectedTier] = useState("supernova")
  const [email, setEmail] = useState("")
  const [projectName, setProjectName] = useState("")
  const [generatedKey, setGeneratedKey] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [rotationAngle, setRotationAngle] = useState(0)
  const { toast } = useToast()

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationAngle((prev) => prev + 1)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const handleGenerateKey = async () => {
    if (!email || !projectName) {
      toast({
        title: "بيانات ناقصة",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/cosmic/keygen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          projectName,
          tier: selectedTier,
        }),
      })

      if (!response.ok) throw new Error("فشل في توليد المفتاح")

      const data = await response.json()
      setGeneratedKey(data.key)

      toast({
        title: "تم توليد المفتاح!",
        description: "مفتاحك الكوني جاهز للاستخدام",
      })
    } catch (error) {
      toast({
        title: "خطأ كوني",
        description: "حدث خطأ في توليد المفتاح. يرجى المحاولة مرة أخرى.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({ description: "تم نسخ المفتاح إلى الحافظة" })
    } catch (error) {
      toast({ description: "فشل في النسخ", variant: "destructive" })
    }
  }

  return (
    <section className="py-20 relative">
      <div className="cosmic-grid">
        <div className="col-span-12 text-center mb-16">
          <h2 className="cosmic-heading-lg stellar-glow mb-6">مولد مفاتيح الوجود الكوني</h2>
          <p className="cosmic-body text-muted-foreground max-w-2xl mx-auto">
            احصل على مفتاحك الشخصي للوصول إلى قوة الذكاء الكوني المتقدم
          </p>
        </div>

        {/* Tier Selection */}
        <div className="col-span-12 mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            {keyTiers.map((tier) => (
              <Card
                key={tier.id}
                className={`quantum-card cursor-pointer transition-all duration-300 ${
                  selectedTier === tier.id
                    ? "border-stellarGold/60 bg-stellarGold/5 scale-105"
                    : "hover:border-stellarGold/40"
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${tier.color} flex items-center justify-center`}
                  >
                    <KeyRound className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-stellarGold">{tier.name}</CardTitle>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{tier.price}</div>
                    <Badge variant="outline" className="border-stellarGold/50 text-stellarGold">
                      {tier.requests}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">{tier.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Generation Interface */}
        <div className="col-span-12 max-w-2xl mx-auto">
          <Card className="quantum-card">
            <CardHeader className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                {/* Animated Black Hole */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cosmicVoid to-eventHorizon border-2 border-stellarGold/30" />
                <div
                  className="absolute inset-4 rounded-full border-2 border-stellarGold/50"
                  style={{ transform: `rotate(${rotationAngle}deg)` }}
                />
                <div
                  className="absolute inset-8 rounded-full border border-stellarGold/70"
                  style={{ transform: `rotate(${-rotationAngle * 1.5}deg)` }}
                />
                <div className="absolute inset-12 rounded-full bg-stellarGold/20 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-stellarGold" />
                </div>
              </div>
              <CardTitle className="text-2xl text-stellarGold">مولد الطاقة الكونية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-stellarGold">
                    البريد الإلكتروني
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="cosmic@universe.dev"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-eventHorizon/50 border-stellarGold/30 focus:border-stellarGold mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="project" className="text-stellarGold">
                    اسم المشروع
                  </Label>
                  <Input
                    id="project"
                    placeholder="مشروعي الكوني"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="bg-eventHorizon/50 border-stellarGold/30 focus:border-stellarGold mt-2"
                  />
                </div>
              </div>

              <Button
                onClick={handleGenerateKey}
                disabled={isGenerating || !email || !projectName}
                className="w-full event-horizon-button text-lg py-6"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    جاري استخراج الطاقة الكونية...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    توليد مفتاح الوجود
                  </>
                )}
              </Button>

              {generatedKey && (
                <div className="space-y-4 p-6 rounded-lg bg-stellarGold/10 border border-stellarGold/30">
                  <div className="text-center">
                    <Sparkles className="h-8 w-8 text-stellarGold mx-auto mb-2" />
                    <h3 className="text-lg font-semibold text-stellarGold">مفتاحك الكوني</h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <Input
                      value={generatedKey}
                      readOnly
                      className="font-mono text-sm bg-eventHorizon/50 border-stellarGold/50"
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={copyToClipboard}
                      className="border-stellarGold/50 hover:bg-stellarGold/10"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4 text-stellarGold" />
                      )}
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground text-center">
                    احتفظ بهذا المفتاح في مكان آمن. إنه بوابتك إلى الأبعاد الكونية.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
