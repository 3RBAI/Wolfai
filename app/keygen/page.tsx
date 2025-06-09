"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KeyRound, Sparkles, SpaceIcon as Galaxy, Star, Globe, Copy, Check, Loader2 } from "lucide-react"
import { MainHeader } from "@/components/cosmic-wolf/main-header"
import { MainFooter } from "@/components/cosmic-wolf/main-footer"
import { CosmicParticles } from "@/components/cosmic-particles"

const keyTiers = [
  {
    id: "galactic",
    name: "مجري",
    icon: <Galaxy className="h-6 w-6" />,
    description: "للمستكشفين الكونيين المبتدئين",
    features: ["3 استفسارات يومياً", "وصول لنموذج ليلى الأساسي", "دعم المجتمع"],
    price: "مجاني",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/30",
  },
  {
    id: "stellar",
    name: "نجمي",
    icon: <Star className="h-6 w-6" />,
    description: "للمطورين والباحثين الجادين",
    features: ["100 استفسار يومياً", "وصول لجميع النماذج", "أولوية في الاستجابة", "واجهة برمجة التطبيقات"],
    price: "99 دولار/شهر",
    color: "text-stellarGold",
    bgColor: "bg-stellarGold/10",
    borderColor: "border-stellarGold/30",
  },
  {
    id: "cosmic",
    name: "كوني",
    icon: <Globe className="h-6 w-6" />,
    description: "للعباقرة الذين يريدون تغيير العالم",
    features: ["استفسارات لا محدودة", "نماذج مخصصة", "دعم مباشر", "وصول لمحرك التدمير الإبداعي"],
    price: "999 دولار/شهر",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/30",
  },
]

export default function KeyGenPage() {
  const [selectedTier, setSelectedTier] = useState("stellar")
  const [email, setEmail] = useState("")
  const [projectName, setProjectName] = useState("")
  const [generatedKey, setGeneratedKey] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerateKey = async () => {
    if (!email || !projectName) {
      alert("يرجى ملء جميع الحقول المطلوبة")
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/cosmic/keygen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          projectName,
          tier: selectedTier,
        }),
      })

      if (!response.ok) {
        throw new Error("فشل في توليد المفتاح")
      }

      const data = await response.json()
      setGeneratedKey(data.key)
    } catch (error) {
      console.error("Error generating key:", error)
      alert("حدث خطأ في توليد المفتاح. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedKey)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  return (
    <div className="min-h-screen bg-cosmicVoid text-foreground">
      <CosmicParticles />
      <MainHeader />

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold glow-text-gold mb-4">مولد مفاتيح الوجود</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            احصل على مفتاحك الكوني للوصول إلى أعماق الذكاء الاصطناعي والمعرفة اللامتناهية
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs value={selectedTier} onValueChange={setSelectedTier} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-background/50">
              {keyTiers.map((tier) => (
                <TabsTrigger
                  key={tier.id}
                  value={tier.id}
                  className="flex items-center gap-2 data-[state=active]:bg-stellarGold/20"
                >
                  {tier.icon}
                  {tier.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {keyTiers.map((tier) => (
              <TabsContent key={tier.id} value={tier.id}>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Tier Information */}
                  <Card className={`${tier.bgColor} ${tier.borderColor} border-2 cosmic-element`}>
                    <CardHeader>
                      <CardTitle className={`flex items-center gap-3 text-2xl ${tier.color}`}>
                        {tier.icon}
                        الطبقة {tier.name}
                      </CardTitle>
                      <CardDescription className="text-lg">{tier.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-3xl font-bold text-stellarGold">{tier.price}</div>
                        <ul className="space-y-2">
                          {tier.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Sparkles className="h-4 w-4 text-stellarGold" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Generation Form */}
                  <Card className="bg-card/50 border-stellarGold/30 cosmic-element">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-stellarGold">
                        <KeyRound className="h-5 w-5" />
                        توليد مفتاح الوجود
                      </CardTitle>
                      <CardDescription>املأ البيانات التالية للحصول على مفتاحك الكوني</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-background/50 border-stellarGold/30 focus:border-stellarGold"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="project">اسم المشروع</Label>
                        <Input
                          id="project"
                          placeholder="مشروعي الكوني"
                          value={projectName}
                          onChange={(e) => setProjectName(e.target.value)}
                          className="bg-background/50 border-stellarGold/30 focus:border-stellarGold"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>الطبقة المختارة</Label>
                        <div className="p-3 rounded-lg bg-background/30 border border-stellarGold/30">
                          <Badge className={`${tier.color} ${tier.bgColor}`}>
                            {tier.name} - {tier.price}
                          </Badge>
                        </div>
                      </div>

                      <Button
                        onClick={handleGenerateKey}
                        disabled={isGenerating || !email || !projectName}
                        className="w-full quantum-button text-lg py-6"
                      >
                        {isGenerating ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            جاري التوليد...
                          </>
                        ) : (
                          <>
                            <KeyRound className="mr-2 h-5 w-5" />
                            توليد مفتاح الوجود
                          </>
                        )}
                      </Button>

                      {generatedKey && (
                        <div className="space-y-3 p-4 rounded-lg bg-stellarGold/10 border border-stellarGold/30">
                          <Label className="text-stellarGold font-medium">مفتاحك الكوني:</Label>
                          <div className="flex items-center gap-2">
                            <Input value={generatedKey} readOnly className="font-mono text-sm bg-background/50" />
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={copyToClipboard}
                              className="border-stellarGold/50 hover:bg-stellarGold/10"
                            >
                              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            احتفظ بهذا المفتاح في مكان آمن. ستحتاجه للوصول إلى خدمات الذئب الكوني.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <MainFooter />
    </div>
  )
}
