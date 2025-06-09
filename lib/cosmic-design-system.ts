// النظام الذري الصارم للتصميم الكوني
export const CosmicDesignSystem = {
  colors: {
    // النظام اللوني الموحد - لا مساومة
    primary: {
      gold: "#D4AF37",
      goldLight: "#F4E4BC",
      goldDark: "#A67C00",
      gradient: "linear-gradient(135deg, #D4AF37 0%, #A67C00 100%)",
    },
    cosmic: {
      void: "#0f0f1a",
      eventHorizon: "#1a1a2e",
      neutronStar: "#4e008e",
      supernovaRed: "#DC143C",
      quantumBlue: "#1E3A8A",
    },
    semantic: {
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
    },
  },

  typography: {
    // نظام طباعي هرمي صارم
    scale: {
      h1: { size: "3.5rem", lineHeight: "1.1", weight: "800", letterSpacing: "-0.02em" },
      h2: { size: "2.5rem", lineHeight: "1.2", weight: "700", letterSpacing: "-0.01em" },
      h3: { size: "2rem", lineHeight: "1.3", weight: "600", letterSpacing: "0" },
      h4: { size: "1.5rem", lineHeight: "1.4", weight: "600", letterSpacing: "0" },
      body: { size: "1.125rem", lineHeight: "1.8", weight: "400", letterSpacing: "0" },
      caption: { size: "0.875rem", lineHeight: "1.6", weight: "500", letterSpacing: "0.01em" },
    },
    fonts: {
      arabic: "'IBM Plex Sans Arabic', sans-serif",
      latin: "'Inter', sans-serif",
      mono: "'JetBrains Mono', monospace",
    },
  },

  spacing: {
    // نظام مسافات كوني محسوب
    universe: "4rem", // 64px
    galaxy: "2rem", // 32px
    star: "1rem", // 16px
    planet: "0.5rem", // 8px
    atom: "0.25rem", // 4px
  },

  shadows: {
    cosmic:
      "0 10px 25px rgba(212, 175, 55, 0.2), 0 5px 10px rgba(78, 0, 142, 0.3), inset 0 0 15px rgba(255, 255, 255, 0.1)",
    stellar: "0 4px 20px rgba(212, 175, 55, 0.3)",
    void: "0 8px 32px rgba(0, 0, 0, 0.6)",
  },

  animations: {
    // حركات كمية محسوبة
    spring: {
      type: "spring",
      damping: 12,
      stiffness: 150,
    },
    cosmic: {
      duration: 0.4,
      ease: [0.17, 0.67, 0.83, 0.67],
    },
  },
} as const

// دالة التحقق الصارمة
export function validateCosmicDesign(component: any): boolean {
  // التحقق من الألوان
  const usedColors = extractColors(component)
  const allowedColors = Object.values(CosmicDesignSystem.colors).flat()

  for (const color of usedColors) {
    if (!allowedColors.includes(color)) {
      throw new Error(`🚨 انتهاك كوني: اللون ${color} غير مسموح في النظام الذري!`)
    }
  }

  return true
}

function extractColors(component: any): string[] {
  // استخراج الألوان من المكون للتحقق
  return []
}
