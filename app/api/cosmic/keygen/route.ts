import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

interface KeyGenRequest {
  email: string
  projectName: string
  tier: "neutron" | "supernova" | "blackhole"
}

const TIER_LIMITS = {
  neutron: { requests: 100, price: 0 },
  supernova: { requests: 10000, price: 99 },
  blackhole: { requests: -1, price: 299 }, // -1 means unlimited
}

function generateCosmicKey(tier: string, email: string): string {
  const timestamp = Date.now().toString(36)
  const randomBytes = crypto.randomBytes(8).toString("hex")
  const tierPrefix = tier.substring(0, 3).toUpperCase()
  const emailHash = crypto.createHash("md5").update(email).digest("hex").substring(0, 4)

  return `WOLF-${tierPrefix}-${timestamp}-${emailHash}-${randomBytes}`.toUpperCase()
}

function generateCosmicSignature(key: string): string {
  return crypto
    .createHash("sha256")
    .update(key + process.env.COSMIC_SECRET_SALT || "cosmic-salt")
    .digest("hex")
    .substring(0, 16)
}

export async function POST(request: NextRequest) {
  try {
    const body: KeyGenRequest = await request.json()

    // Enhanced validation
    if (!body.email || !body.projectName || !body.tier) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة للوصول إلى الأبعاد الكونية" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "البريد الإلكتروني غير صالح في هذا البعد" }, { status: 400 })
    }

    // Tier validation
    if (!TIER_LIMITS[body.tier]) {
      return NextResponse.json({ error: "طبقة الوجود المحددة غير معروفة في الكون" }, { status: 400 })
    }

    // Generate cosmic key
    const cosmicKey = generateCosmicKey(body.tier, body.email)
    const cosmicSignature = generateCosmicSignature(cosmicKey)
    const tierInfo = TIER_LIMITS[body.tier]

    // In a real implementation, you would store this in a database
    // For now, we'll return the key information

    const keyInfo = {
      key: cosmicKey,
      tier: body.tier.toUpperCase(),
      email: body.email,
      projectName: body.projectName,
      requests: tierInfo.requests === -1 ? "غير محدود" : `${tierInfo.requests.toLocaleString()}/شهر`,
      validity: "صالح لمدة عام كوني واحد",
      activationLink: `https://cosmic-wolf.dev/activate/${cosmicKey}`,
      cosmicSignature: cosmicSignature,
      createdAt: new Date().toISOString(),
      status: "نشط في جميع الأبعاد",
    }

    return NextResponse.json(keyInfo, { status: 201 })
  } catch (error) {
    console.error("Cosmic key generation error:", error)
    return NextResponse.json({ error: "حدث اضطراب في النسيج الكوني. يرجى المحاولة مرة أخرى." }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "مولد مفاتيح الوجود الكوني نشط",
    availableTiers: Object.keys(TIER_LIMITS),
    cosmicTime: new Date().toISOString(),
  })
}
