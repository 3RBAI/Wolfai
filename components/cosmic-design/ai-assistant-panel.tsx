"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Brain, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: string
  text: string
  sender: "ai" | "user"
  timestamp: Date
  model?: string
}

export function AIAssistantPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "مرحباً! أنا الذئب الكوني، مساعدك الذكي في مساحة العمل التعاونية. أستطيع مساعدتك في تحليل البيانات، إنشاء المحتوى، البرمجة، والكثير من المهام الأخرى. كيف يمكنني خدمتك اليوم؟",
      sender: "ai",
      timestamp: new Date(),
      model: "Llama 3.1 + DeepSeek-R1",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeModel, setActiveModel] = useState("Llama 3.1 + DeepSeek-R1")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // محاكاة استجابة الذكاء الاصطناعي
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `لقد استلمت استفسارك: "${userMessage.text}"\n\nجاري معالجة البيانات باستخدام نماذج ${activeModel}. بناءً على تحليلي، يمكنني تقديم المساعدة التالية:\n\n• تحليل شامل للموضوع\n• اقتراحات عملية قابلة للتطبيق\n• ربط المعلومات بالسياق الأوسع\n• تقديم أمثلة وحلول مبتكرة\n\nهل تود التوسع في أي من هذه النقاط؟`,
        sender: "ai",
        timestamp: new Date(),
        model: activeModel,
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 2000)
  }

  const handleChatGPTRedirect = () => {
    window.open("https://chat.openai.com", "_blank", "noopener,noreferrer")
  }

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-xl p-6 border border-[#2D2D2D] shadow-2xl"
    >
      {/* رأس القسم */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-[#D4AF37] rounded-full mr-3 animate-pulse"></div>
          <h2 className="text-2xl font-bold text-[#E6E6E6]">
            مساعد الذكاء <span className="text-[#D4AF37]">الكوني</span>
          </h2>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button
            onClick={handleChatGPTRedirect}
            className="bg-gradient-to-r from-[#10A37F] to-[#0D8B6B] hover:from-[#0D8B6B] hover:to-[#10A37F] text-white text-sm px-4 py-2 rounded-lg transition-all duration-300 flex items-center"
          >
            <ExternalLink className="w-4 h-4 ml-2" />
            ChatGPT
          </Button>
        </div>
      </div>

      {/* مؤشر النموذج النشط */}
      <div className="mb-4 flex items-center">
        <Brain className="w-4 h-4 text-[#D4AF37] mr-2" />
        <span className="text-sm text-[#A0A0A0]">النموذج النشط: </span>
        <span className="text-sm text-[#D4AF37] font-semibold mr-1">{activeModel}</span>
        <div className="w-2 h-2 bg-[#2D8CFF] rounded-full mr-2 animate-pulse"></div>
      </div>

      {/* منطقة المحادثة */}
      <div className="bg-[#0A0A0A] rounded-lg p-4 h-80 overflow-y-auto mb-6 border border-[#2D2D2D] custom-scrollbar">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`mb-4 ${message.sender === "ai" ? "text-right" : "text-left"}`}
            >
              <div className={`flex items-start ${message.sender === "ai" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`
                  inline-block max-w-[85%] p-4 rounded-2xl relative
                  ${
                    message.sender === "ai"
                      ? "bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] border border-[#D4AF37]/20 text-[#E6E6E6]"
                      : "bg-gradient-to-br from-[#D4AF37]/20 to-[#B8860B]/20 border border-[#D4AF37]/30 text-[#E6E6E6]"
                  }
                `}
                >
                  {message.sender === "ai" && (
                    <div className="flex items-center mb-2">
                      <Bot className="w-4 h-4 text-[#D4AF37] mr-2" />
                      <span className="text-xs text-[#A0A0A0]">{message.model}</span>
                    </div>
                  )}
                  {message.sender === "user" && (
                    <div className="flex items-center mb-2">
                      <User className="w-4 h-4 text-[#D4AF37] mr-2" />
                      <span className="text-xs text-[#A0A0A0]">أنت</span>
                    </div>
                  )}
                  <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  <div className="text-xs text-[#A0A0A0] mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString("ar-SA", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* مؤشر الكتابة */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-end mb-4"
          >
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] border border-[#D4AF37]/20 p-4 rounded-2xl">
              <div className="flex items-center">
                <Bot className="w-4 h-4 text-[#D4AF37] mr-2" />
                <span className="text-sm text-[#A0A0A0] mr-3">الذئب الكوني يفكر...</span>
                <div className="flex space-x-1 rtl:space-x-reverse">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 bg-[#D4AF37] rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* منطقة الإدخال */}
      <div className="flex gap-3">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="اطلب حكمة الكون... 🌌"
          className="flex-1 bg-[#0A0A0A] border-[#2D2D2D] text-[#E6E6E6] placeholder:text-[#A0A0A0] resize-none focus:border-[#D4AF37] transition-colors"
          rows={3}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSend()
            }
          }}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#B8860B] hover:to-[#D4AF37] text-black font-bold py-3 px-6 rounded-lg self-end h-auto disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            <Send className="h-5 w-5 ml-2" />
            إرسال
          </Button>
        </motion.div>
      </div>

      {/* نصائح سريعة */}
      <div className="mt-4 flex flex-wrap gap-2">
        {["تحليل البيانات", "إنشاء محتوى", "مساعدة برمجية", "ترجمة نصوص"].map((tip) => (
          <motion.button
            key={tip}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setInput(tip)}
            className="text-xs bg-[#1A1A1A] hover:bg-[#2D2D2D] text-[#A0A0A0] hover:text-[#D4AF37] px-3 py-1 rounded-full border border-[#2D2D2D] hover:border-[#D4AF37]/30 transition-all duration-300"
          >
            {tip}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
