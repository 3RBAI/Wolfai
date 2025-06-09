// lib/cosmic-sounds.ts
// Note: You will need to install howler: npm install howler @types/howler
// For Next.js, this import will be handled automatically.
import { Howl } from "howler"

interface CosmicSoundsCollection {
  hover?: Howl
  click?: Howl
  portal?: Howl
  background?: Howl
}

let cosmicSounds: CosmicSoundsCollection = {}
let isInitialized = false

export function initializeCosmicSounds() {
  if (isInitialized || typeof window === "undefined") return // Prevent re-initialization and server-side execution

  cosmicSounds = {
    hover: new Howl({ src: ["/sounds/quantum-hover.mp3"], volume: 0.5 }), // Placeholder URL
    click: new Howl({ src: ["/sounds/star-click.wav"], volume: 0.7 }), // Placeholder URL
    portal: new Howl({ src: ["/sounds/wormhole-open.mp3"], volume: 0.8 }), // Placeholder URL
    background: new Howl({
      src: ["/sounds/cosmic-ambient.mp3"], // Placeholder URL
      loop: true,
      volume: 0.3,
    }),
  }
  isInitialized = true
  console.log("Cosmic sounds initialized.")
}

export function playCosmicSound(soundName: keyof Omit<CosmicSoundsCollection, "background">) {
  if (!isInitialized) initializeCosmicSounds()
  const sound = cosmicSounds[soundName]
  if (sound) {
    sound.stop() // Stop previous instance if any
    sound.play()
  }
}

export function toggleCosmicBackgroundMusic() {
  if (!isInitialized) initializeCosmicSounds()
  const bgMusic = cosmicSounds.background
  if (bgMusic) {
    if (bgMusic.playing()) {
      bgMusic.pause()
      document.body.classList.remove("sound-on")
    } else {
      bgMusic.play()
      document.body.classList.add("sound-on")
    }
  }
}

// Example of attaching to elements (can be done in a useEffect in relevant components)
export function attachCosmicSoundEvents(selector: string) {
  if (typeof window === "undefined") return
  if (!isInitialized) initializeCosmicSounds()

  document.querySelectorAll(selector).forEach((element) => {
    element.addEventListener("mouseenter", () => playCosmicSound("hover"))
    element.addEventListener("click", () => playCosmicSound("click"))
  })
}
