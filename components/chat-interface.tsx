"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  model?: string
  timestamp: Date
}

const aiModels = [
  { id: "cosmic-llama", name: "ليلى الكونية (Llama-3)", description: "النموذج العربي المتخصص" },
  { id: "deepseek-coder", name: "DeepSeek المطور", description: "عبقري البرمجة والرياضيات" },
  { id: "groq-lightning", name: "Groq البرق", description: "السرعة الكونية" },
  { id: "gemini-oracle", name: "Gemini العراف", description: "البصيرة متعددة الأبعاد" },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "مرحباً بك في عالم الذئب الكوني. أنا هنا لأرشدك عبر أبعاد المعرفة اللامتناهية. ما الذي تود استكشافه اليوم؟",
      model: "cosmic-llama",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState("cosmic-llama")
  const [isLoading, setIsLoading] = useState(false)
  const [apiKey, setApiKey] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    if (!apiKey.trim()) {
      alert("يرجى إدخال مفتاح الوجود الخاص بك أولاً")
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input.trim(),
          model: selectedModel,
          apiKey: apiKey,
          history: messages.slice(-5), // Send last 5 messages for context
        }),
      })

      if (!response.ok) {
        throw new Error("فشل في الاتصال بالذكاء الكوني")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response || "عذراً، لم أتمكن من معالجة طلبك في الوقت الحالي.",
        model: selectedModel,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "حدث خطأ في الاتصال بالذكاء الكوني. يرجى المحاولة مرة أخرى.",
        model: selectedModel,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-card/50 border-stellarGold/30 cosmic-element">
      <CardHeader className="border-b border-border/50">
        <CardTitle className="flex items-center gap-2 text-stellarGold">
          <Sparkles className="h-5 w-5" />
          صدى الكون - واجهة التفاعل الكوني
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex-1">
            <label htmlFor="api-key" className="block text-sm font-medium text-muted-foreground mb-2">
              مفتاح الوجود
            </label>
            <Input
              id="api-key"
              type="password"
              placeholder="أدخل مفتاح الوجود الخاص بك..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-background/50 border-stellarGold/30 focus:border-stellarGold"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="model-select" className="block text-sm font-medium text-muted-foreground mb-2">
              النموذج الكوني
            </label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="bg-background/50 border-stellarGold/30">
                <SelectValue placeholder="اختر النموذج" />
              </SelectTrigger>
              <SelectContent>
                {aiModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{model.name}</span>
                      <span className="text-xs text-muted-foreground">{model.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.role === "user"
                    ? "bg-stellarGold text-cosmicVoid"
                    : "bg-background border border-stellarGold/50 text-stellarGold"
                }`}
              >
                {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`flex-1 ${message.role === "user" ? "text-right" : "text-left"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{message.role === "user" ? "أنت" : "الذئب الكوني"}</span>
                  {message.model && (
                    <Badge variant="outline" className="text-xs border-stellarGold/50 text-stellarGold">
                      {aiModels.find((m) => m.id === message.model)?.name || message.model}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString("ar-SA")}</span>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    message.role === "user"
                      ? "bg-stellarGold/10 border border-stellarGold/30"
                      : "bg-background/50 border border-border/50"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-background border border-stellarGold/50 text-stellarGold flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="p-3 rounded-lg bg-background/50 border border-border/50">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-stellarGold" />
                    <span className="text-sm text-muted-foreground">الذئب الكوني يفكر...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-border/50 p-4">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="اطرح سؤالك على الذكاء الكوني..."
              className="flex-1 bg-background/50 border-stellarGold/30 focus:border-stellarGold"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="quantum-button">
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}
