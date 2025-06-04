<template>
  <div class="flex flex-col items-center space-y-6 relative">
    <canvas id="wheelCanvas" width="320" height="320" class="mx-auto"></canvas>
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-[20px] border-transparent border-b-black"></div>

    <BaseButton @click="draaiRad" :disabled="draait || beschikbareWoorden.length === 0">
      Draai aan het rad
    </BaseButton>

    <div v-if="beschikbareWoorden.length === 0" class="text-center text-xl text-green-600 font-bold mt-4">
      Alle woorden zijn gebruikt! Het spel is afgelopen.
    </div>

    <div class="mt-6 text-sm text-gray-600">
      <h3 class="font-semibold mb-1">Gebruikte woorden:</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li v-for="woord in game.usedWords" :key="woord" class="line-through">{{ woord }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'
const game = useGameStore()
const router = useRouter()

declare global {
  interface Window {
    Winwheel: any
  }
}

const draait = ref(false)
const rotatie = ref(0)
const gekozenWoord = ref('')
let wheel: any

const beschikbareWoorden = computed(() => {
  return game.words.filter(w => !game.usedWords.includes(w))
})

const kleuren = [
  '#f87171', '#60a5fa', '#34d399', '#fbbf24', '#c084fc',
  '#fb7185', '#38bdf8', '#4ade80', '#facc15', '#a78bfa',
  '#f472b6', '#22d3ee', '#fde68a'
]

onMounted(() => {
  const waitForWinwheel = () =>
      new Promise<void>((resolve) => {
        const check = () => {
          if (window.Winwheel) resolve()
          else setTimeout(check, 50)
        }
        check()
      })

  waitForWinwheel().then(() => {
    wheel = new window.Winwheel({
      canvasId: 'wheelCanvas',
      numSegments: beschikbareWoorden.value.length,
      segments: beschikbareWoorden.value.map((woord, i) => ({
        fillStyle: kleuren[i % kleuren.length],
        text: woord
      })),
      animation: {
        type: 'spinToStop',
        duration: 4,
        spins: 5,
        callbackFinished: (segment: any) => {
          // jouw callback code...
        }
      },
      textFontSize: 14,
      textAlignment: 'outer'
    })
  })
})

const draaiRad = () => {
  if (draait.value || beschikbareWoorden.value.length === 0) return
  draait.value = true
  confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } })
  wheel.startAnimation()
}
</script>

<style scoped>
svg text {
  dominant-baseline: middle;
}
</style>
