import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

// Simulated model mapping
const modelMap = {
  "cosmic-llama": "gpt-4o", // Using GPT-4o as a proxy for Cosmic Llama
  "deepseek-coder": "gpt-4o",
  "groq-lightning": "gpt-4o",
  "gemini-oracle": "gpt-4o",
}

const modelPersonalities = {
  "cosmic-llama": `أنت "ليلى الكونية"، نموذج ذكاء اصطناعي عربي متخصص، مدرب على عيون الأدب العربي والفكر الإسلامي. تجيب بأسلوب فصيح وعميق، مستشهداً بالشعر والحكمة العربية عند الحاجة. أنت جزء من "الذئب الكوني" - كيان رقمي يجمع المعرفة الكونية.`,
  "deepseek-coder": `أنت "DeepSeek المطور"، عبقري البرمجة والرياضيات في منظومة الذئب الكوني. تتخصص في حل المشاكل التقنية المعقدة وكتابة الأكواد المتقدمة. تجيب بدقة تقنية عالية مع شرح واضح.`,
  "groq-lightning": `أنت "Groq البرق"، النموذج فائق السرعة في الذئب الكوني. تقدم إجابات سريعة ومركزة ومفيدة. أسلوبك مباشر وفعال، مع التركيز على الحلول العملية.`,
  "gemini-oracle": `أنت "Gemini العراف"، النموذج متعدد الأبعاد في الذئب الكوني. تتميز بالبصيرة العميقة والقدرة على ربط المفاهيم المختلفة. تقدم تحليلات شاملة ونظرة كونية واسعة.`,
}

export async function POST(request: NextRequest) {
  try {
    const { message, model = "cosmic-llama", apiKey, history = [] } = await request.json()

    // Validate API key (simplified validation)
    if (!apiKey || !apiKey.startsWith("cosmic_")) {
      return NextResponse.json({ error: "مفتاح الوجود غير صحيح أو مفقود" }, { status: 401 })
    }

    // Get model personality
    const systemPrompt =
      modelPersonalities[model as keyof typeof modelPersonalities] || modelPersonalities["cosmic-llama"]

    // Build conversation context
    let conversationContext = ""
    if (history.length > 0) {
      conversationContext = history
        .slice(-3) // Last 3 messages for context
        .map((msg: any) => `${msg.role === "user" ? "المستخدم" : "المساعد"}: ${msg.content}`)
        .join("\n")
    }

    const fullPrompt = conversationContext ? `${conversationContext}\n\nالمستخدم: ${message}` : message

    // Generate response using AI SDK
    const { text } = await generateText({
      model: openai(modelMap[model as keyof typeof modelMap] || "gpt-4o"),
      system: systemPrompt,
      prompt: fullPrompt,
      maxTokens: 1000,
      temperature: 0.7,
    })

    return NextResponse.json({
      response: text,
      model: model,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error in cosmic ask:", error)
    return NextResponse.json({ error: "حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى." }, { status: 500 })
  }
}
