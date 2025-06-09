"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Bot, User, Search, Brain, Zap, Sparkles, RotateCcw } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  model?: string
}

export function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "مرحباً! أنا الذئب الكوني، مساعدك الذكي في مساحة العمل التعاونية. كيف يمكنني مساعدتك اليوم؟",
      timestamp: new Date(),
      model: "wolf-ai",
    },
  ])
  const [input, setInput] = useState("")
  const [selectedModel, setSelectedModel] = useState("llama3")
  const [searchMode, setSearchMode] = useState("normal")
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `تم تحليل طلبك باستخدام نموذج ${selectedModel} في وضع ${searchMode === "deep" ? "البحث العميق" : "العادي"}. هذا رد تجريبي يوضح كيفية عمل النظام.`,
        timestamp: new Date(),
        model: selectedModel,
      }
      setMessages((prev) => [...prev, response])
      setIsLoading(false)
    }, 1500)
  }

  const getModelIcon = (model: string) => {
    switch (model) {
      case "llama3":
        return <Brain className="h-3 w-3" />
      case "deepseek":
        return <Zap className="h-3 w-3" />
      case "gemini":
        return <Sparkles className="h-3 w-3" />
      default:
        return <Bot className="h-3 w-3" />
    }
  }

  return (
    <div className="studio-chat bg-background flex flex-col">
      <div className="toolbar">
        <div className="flex items-center gap-2 flex-1">
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-40 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="llama3">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  Llama-3 العربية
                </div>
              </SelectItem>
              <SelectItem value="deepseek">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  DeepSeek-V2
                </div>
              </SelectItem>
              <SelectItem value="gemini">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Google Gemini
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={searchMode} onValueChange={setSearchMode}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">عادي</SelectItem>
              <SelectItem value="deep">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  بحث عميق
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="ghost" size="sm">
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-lg p-3 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  <span className="text-xs font-medium">{message.role === "user" ? "أنت" : "الذئب الكوني"}</span>
                  {message.model && (
                    <Badge variant="secondary" className="text-xs">
                      {getModelIcon(message.model)}
                      <span className="mr-1">{message.model}</span>
                    </Badge>
                  )}
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <div className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString("ar-SA")}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg p-3 bg-muted">
                <div className="flex items-center gap-2 mb-1">
                  <Bot className="h-4 w-4" />
                  <span className="text-xs font-medium">الذئب الكوني</span>
                </div>
                <div className="flex space-x-1 rtl:space-x-reverse">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-primary"></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-primary"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-primary"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Input
            placeholder="اكتب رسالتك هنا..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
