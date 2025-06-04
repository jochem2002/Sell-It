<template>
  <div class="flex flex-col items-center space-y-8 relative p-8 bg-gradient-to-br from-sky-500 to-indigo-900 rounded-2xl shadow-2xl text-white animate-fade-in">
    <div class="relative">
      <canvas id="wheelCanvas" width="320" height="320" class="mx-auto rounded-full shadow-lg ring-4 ring-white transition-transform duration-700"></canvas>
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-[20px] border-transparent border-b-white drop-shadow-lg"></div>
    </div>

    <button
      @click="draaiRad"
      :disabled="draait || beschikbareWoorden.length === 0"
      class="bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:bg-indigo-100 active:scale-95 disabled:opacity-40"
    >
      Draai aan het rad
    </button>

    <div v-if="gekozenWoord" class="text-3xl font-bold text-white bg-white bg-opacity-20 px-6 py-3 rounded-xl shadow-md transition-all duration-300">
      {{ gekozenWoord }}
    </div>

    <div v-if="beschikbareWoorden.length === 0" class="text-center text-xl text-green-300 font-bold mt-4">
      Alle woorden zijn gebruikt! Het spel is afgelopen.
    </div>

    <div class="mt-6 text-sm text-white bg-white bg-opacity-20 p-4 rounded-xl w-full max-w-md shadow-inner">
      <h3 class="font-semibold mb-2 text-white">Gebruikte woorden:</h3>
      <ul class="list-disc pl-5 space-y-1">
        <li v-for="woord in game.usedWords" :key="woord" class="line-through opacity-70">{{ woord }}</li>
      </ul>
    </div>
  </div>

  <div v-if="popupZichtbaar" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div class="bg-white text-indigo-900 p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full space-y-4 animate-fade-in">
      <h2 class="text-2xl font-bold">Je opdracht</h2>
      <p class="text-lg">Jij moet <span class="font-semibold text-indigo-700">"{{ gekozenWoord }}"</span> verkopen!</p>
      <NuxtLink
        to="/potje/presenteer"
        class="inline-block bg-indigo-700 text-white px-6 py-2 rounded-xl shadow-md transition-all duration-300 hover:bg-indigo-800 active:scale-95"
      >
        Toe ma dan
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'
import gsap from 'gsap'
window.TweenMax = {
  to: gsap.to,
  from: gsap.from,
  fromTo: gsap.fromTo,
  set: gsap.set,
  killTweensOf: gsap.killTweensOf
}
const game = useGameStore()

const popupZichtbaar = ref(false)

const draait = ref(false)
const gekozenWoord = ref('')

const toonWoord = (woord: string) => {
  gekozenWoord.value = woord
  game.word = woord
  popupZichtbaar.value = true
}

let wheel: any

const beschikbareWoorden = computed(() => {
  return game.words.filter(w => !game.usedWords.includes(w))
})

const kleuren = [
  'linear-gradient(135deg, rgba(220,38,38,0.6), rgba(252,165,165,0.6))',     // rood naar lichtrood
  'linear-gradient(135deg, rgba(34,197,94,0.6), rgba(134,239,172,0.6))',     // groen naar lichtgroen
  'linear-gradient(135deg, rgba(249,115,22,0.6), rgba(253,186,116,0.6))',    // oranje naar lichtoranje
  'linear-gradient(135deg, rgba(234,179,8,0.6), rgba(254,240,138,0.6))',     // geel naar lichtgeel
  'linear-gradient(135deg, rgba(219,39,119,0.6), rgba(251,207,232,0.6))'     // roze naar lichtroze
]

const maakRad = () => {
  wheel = new window.Winwheel({
    canvasId: 'wheelCanvas',
    numSegments: beschikbareWoorden.value.length,
    segments: beschikbareWoorden.value.map((woord, i) => {
      const gradient = wheel?.ctx
        ? wheel.ctx.createLinearGradient(0, 0, 160, 160)
        : document.getElementById('wheelCanvas')?.getContext('2d')?.createLinearGradient(0, 0, 160, 160)
      const parts = kleuren[i % kleuren.length].match(/rgba\([^)]+\)/g)
      if (gradient && parts) {
        gradient.addColorStop(0, parts[0])
        gradient.addColorStop(1, parts[1])
      }
      return {
        fillStyle: gradient || '#fff',
        text: woord
      }
    }),
    animation: {
      type: 'spinToStop',
      duration: 4,
      spins: 5,
      callbackFinished: (segment: any) => {
        toonWoord(segment.text)
        game.usedWords.push(segment.text)
        draait.value = false
        maakRad() // herbouw rad zonder gebruikte woorden
      }
    },
    textFontSize: 14,
    textAlignment: 'outer'
  })
}

onMounted(async () => {
  // Dynamische import van Winwheel vóór waitForWinwheel
  if (!window.Winwheel) {
    await import('/js/Winwheel.js')
  }
  const waitForWinwheel = () =>
    new Promise<void>((resolve) => {
      const check = () => {
        if (window.Winwheel && window.TweenMax) resolve()
        else setTimeout(check, 50)
      }
      check()
    })

  await waitForWinwheel()
  maakRad()
})

const draaiRad = () => {
  if (draait.value || beschikbareWoorden.value.length === 0) return
  draait.value = true
  confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } })
  wheel.startAnimation()
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out both;
}

svg text {
  dominant-baseline: middle;
}
</style>
