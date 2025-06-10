"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Brain, Zap, Sparkles, Crown, Rocket, Settings, Copy, RotateCcw } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  model?: string
  timestamp: Date
}

interface AIModel {
  id: string
  name: string
  arabicName: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  capabilities: string[]
}

const aiModels: AIModel[] = [
  {
    id: "llama3",
    name: "Llama 3.1",
    arabicName: "ليلى الكونية",
    description: "النموذج العربي المتخصص في الفهم العميق والإبداع",
    icon: Brain,
    color: "text-blue-400",
    capabilities: ["فهم عربي متقدم", "إبداع أدبي", "تحليل فلسفي"],
  },
  {
    id: "deepseek",
    name: "DeepSeek-R1",
    arabicName: "الباحث العميق",
    description: "عبقري البرمجة والرياضيات والتفكير المنطقي",
    icon: Zap,
    color: "text-yellow-400",
    capabilities: ["برمجة متقدمة", "حل رياضي", "تفكير منطقي"],
  },
  {
    id: "gemini",
    name: "Gemini Pro",
    arabicName: "الجوزاء الكوني",
    description: "البصيرة متعددة الأبعاد والفهم الشامل",
    icon: Sparkles,
    color: "text-purple-400",
    capabilities: ["تحليل متعدد", "فهم شامل", "ربط المفاهيم"],
  },
  {
    id: "gpt4",
    name: "GPT-4o",
    arabicName: "العقل الشامل",
    description: "القوة التجارية المثبتة في جميع المجالات",
    icon: Crown,
    color: "text-green-400",
    capabilities: ["تنوع شامل", "دقة عالية", "موثوقية"],
  },
]

export function QuantumChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "مرحباً بك في مركز القيادة الكوني! أنا الذئب الكوني، مساعدك الذكي الذي يجمع قوة 7 نماذج ذكاء اصطناعي متقدمة. كيف يمكنني مساعدتك في استكشاف أعماق المعرفة اليوم؟",
      model: "llama3",
      timestamp: new Date(),
    },
  ])

  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState("llama3")
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    if (!apiKey.trim()) {
      toast({
        title: "مفتاح الوجود مفقود!",
        description: "يرجى إدخال مفتاح API الخاص بك للوصول إلى القوة الكونية",
        variant: "destructive",
      })
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/cosmic/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input.trim(),
          model: selectedModel,
          apiKey: apiKey,
          history: messages.slice(-5),
        }),
      })

      if (!response.ok) throw new Error("فشل في الاتصال بالذكاء الكوني")

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.",
        model: selectedModel,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      toast({
        title: "اضطراب في النسيج الكوني",
        description: "حدث خطأ في الاتصال. يرجى التحقق من اتصالك ومحاولة مرة أخرى.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([messages[0]]) // Keep welcome message
    toast({ description: "تم مسح المحادثة. الكون جاهز لاستفساراتك الجديدة." })
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast({ description: "تم نسخ الرسالة إلى الحافظة" })
  }

  const currentModel = aiModels.find((m) => m.id === selectedModel) || aiModels[0]
  const ModelIcon = currentModel.icon

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-cosmic-void/90 to-eventHorizon/80 border border-primary-gold/30 shadow-cosmic backdrop-blur-md">
        {/* رأس واجهة القيادة */}
        <CardHeader className="border-b border-primary-gold/20 bg-gradient-to-r from-primary-gold/5 to-transparent">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-gold to-primary-goldDark flex items-center justify-center">
                <Rocket className="h-6 w-6 text-cosmic-void" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-primary-gold">مركز القيادة الكوني</h2>
                <p className="text-sm text-muted-foreground">واجهة التفاعل مع الذكاء الاصطناعي المتقدم</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
                className="border-primary-gold/30 text-primary-gold hover:bg-primary-gold/10"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                محادثة جديدة
              </Button>

              <Badge variant="outline" className="border-primary-gold/50 text-primary-gold">
                <ModelIcon className={`h-4 w-4 mr-2 ${currentModel.color}`} />
                {currentModel.arabicName}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="grid lg:grid-cols-4 gap-0">
            {/* منطقة المحادثة الرئيسية */}
            <div className="lg:col-span-3 flex flex-col">
              {/* منطقة الرسائل */}
              <ScrollArea className="h-96 p-6">
                <div className="space-y-6">
                  {messages.map((message) => {
                    const messageModel = aiModels.find((m) => m.id === message.model)
                    const MessageIcon = message.role === "user" ? User : messageModel?.icon || Bot

                    return (
                      <div
                        key={message.id}
                        className={`flex gap-4 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        {/* أفاتار */}
                        <div
                          className={`
                          w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                          ${
                            message.role === "user"
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                              : "bg-gradient-to-r from-primary-gold to-primary-goldDark"
                          }
                        `}
                        >
                          <MessageIcon className="h-5 w-5 text-white" />
                        </div>

                        {/* محتوى الرسالة */}
                        <div className={`flex-1 ${message.role === "user" ? "text-right" : "text-left"}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-medium text-primary-gold">
                              {message.role === "user" ? "أنت" : "الذئب الكوني"}
                            </span>
                            {message.model && messageModel && (
                              <Badge variant="outline" className="text-xs border-primary-gold/30 text-primary-gold">
                                {messageModel.arabicName}
                              </Badge>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString("ar-SA")}
                            </span>
                          </div>

                          <div
                            className={`
                            p-4 rounded-lg relative group
                            ${
                              message.role === "user"
                                ? "bg-blue-500/10 border border-blue-500/20"
                                : "bg-primary-gold/5 border border-primary-gold/20"
                            }
                          `}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
                              {message.content}
                            </p>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => copyMessage(message.content)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}

                  {isLoading && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-gold to-primary-goldDark flex items-center justify-center">
                        <ModelIcon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="p-4 rounded-lg bg-primary-gold/5 border border-primary-gold/20">
                          <div className="flex items-center gap-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-primary-gold rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-primary-gold rounded-full animate-bounce"
                                style={{ animationDelay: "0.1s" }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-primary-gold rounded-full animate-bounce"
                                style={{ animationDelay: "0.2s" }}
                              ></div>
                            </div>
                            <span className="text-sm text-muted-foreground">الذئب الكوني يفكر...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* منطقة الإدخال */}
              <div className="border-t border-primary-gold/20 p-6 bg-eventHorizon/20">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="اطلب حكمة الكون... اكتب سؤالك أو طلبك هنا"
                    className="min-h-[80px] bg-cosmic-void/50 border-primary-gold/30 focus:border-primary-gold resize-none"
                    disabled={isLoading}
                  />

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="bg-gradient-to-r from-primary-gold to-primary-goldDark text-cosmic-void hover:shadow-stellar flex-1 lg:flex-none"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      إرسال إلى الفضاء
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* لوحة التحكم الجانبية */}
            <div className="lg:col-span-1 border-l border-primary-gold/20 bg-eventHorizon/10 p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-primary-gold mb-4 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  إعدادات الكون
                </h3>

                <div className="space-y-4">
                  {/* مفتاح API */}
                  <div>
                    <label className="text-sm font-medium text-primary-gold block mb-2">مفتاح الوجود</label>
                    <Textarea
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="WOLF-XXX-XXXX..."
                      className="h-20 bg-cosmic-void/50 border-primary-gold/30 focus:border-primary-gold text-xs font-mono"
                    />
                  </div>

                  {/* اختيار النموذج */}
                  <div>
                    <label className="text-sm font-medium text-primary-gold block mb-2">النموذج الكوني</label>
                    <Select value={selectedModel} onValueChange={setSelectedModel}>
                      <SelectTrigger className="bg-cosmic-void/50 border-primary-gold/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {aiModels.map((model) => {
                          const Icon = model.icon
                          return (
                            <SelectItem key={model.id} value={model.id}>
                              <div className="flex items-center gap-2">
                                <Icon className={`h-4 w-4 ${model.color}`} />
                                <span>{model.arabicName}</span>
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* معلومات النموذج الحالي */}
              <div className="p-4 rounded-lg bg-primary-gold/5 border border-primary-gold/20">
                <h4 className="font-medium text-primary-gold mb-2">{currentModel.arabicName}</h4>
                <p className="text-xs text-muted-foreground mb-3">{currentModel.description}</p>
                <div className="space-y-1">
                  {currentModel.capabilities.map((capability, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-gold"></div>
                      <span className="text-xs text-foreground/80">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
