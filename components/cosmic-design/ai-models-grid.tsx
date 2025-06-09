"use client"

import { motion } from "framer-motion"
import { ExternalLink, Sparkles } from "lucide-react"

const aiModels = [
  {
    name: "Llama 3.1",
    description: "Meta AI Model",
    status: "active",
    color: "from-[#4267B2] to-[#365899]",
    icon: "🦙",
    internal: true,
  },
  {
    name: "DeepSeek-R1",
    description: "Reasoning Model",
    status: "active",
    color: "from-[#FF6B6B] to-[#EE5A52]",
    icon: "🔍",
    internal: true,
  },
  {
    name: "GPT-4o",
    description: "OpenAI Model",
    status: "active",
    color: "from-[#10A37F] to-[#0D8B6B]",
    icon: "🧠",
    internal: true,
  },
  {
    name: "Claude 3.5",
    description: "Anthropic AI",
    status: "active",
    color: "from-[#D2691E] to-[#CD853F]",
    icon: "🎭",
    internal: true,
  },
  {
    name: "Gemini Pro",
    description: "Google AI",
    status: "active",
    color: "from-[#4285F4] to-[#34A853]",
    icon: "💎",
    internal: true,
  },
  {
    name: "ChatGPT",
    description: "OpenAI Assistant",
    status: "external",
    color: "from-[#10A37F] to-[#0D8B6B]",
    icon: "🤖",
    url: "https://chat.openai.com",
    internal: false,
  },
]

export function AIModelsGrid() {
  const handleModelClick = (model: (typeof aiModels)[0]) => {
    if (!model.internal && model.url) {
      window.open(model.url, "_blank", "noopener,noreferrer")
    } else {
      // Handle internal model selection
      console.log(`Selected model: ${model.name}`)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {aiModels.map((model, index) => (
        <motion.div
          key={model.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleModelClick(model)}
          className={`
            bg-gradient-to-br ${model.color} 
            p-4 rounded-xl cursor-pointer 
            border border-[#2D2D2D] 
            hover:border-opacity-50 
            transition-all duration-300 
            group relative overflow-hidden
          `}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="text-3xl">{model.icon}</div>
              {!model.internal && (
                <ExternalLink className="w-4 h-4 text-white opacity-70 group-hover:opacity-100 transition-opacity" />
              )}
            </div>

            <h3 className="font-bold text-white text-lg mb-1">{model.name}</h3>
            <p className="text-white text-sm opacity-80 mb-3">{model.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className={`w-2 h-2 rounded-full mr-2 ${
                    model.status === "active"
                      ? "bg-green-400"
                      : model.status === "external"
                        ? "bg-blue-400"
                        : "bg-gray-400"
                  }`}
                ></div>
                <span className="text-white text-xs opacity-70">
                  {model.status === "active" ? "نشط" : model.status === "external" ? "خارجي" : "غير متاح"}
                </span>
              </div>

              {model.internal && (
                <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                  <Sparkles className="w-4 h-4 text-white opacity-70" />
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
