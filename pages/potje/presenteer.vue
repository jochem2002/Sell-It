<template>
  <div class="h-screen flex flex-col items-center justify-center text-center px-4">
    <h1 class="text-6xl font-extrabold mb-6 drop-shadow-lg animate-pulse">{{ game.word }}</h1>
    <p class="text-xl bg-opacity-80 text-gray-800 px-6 py-3 rounded-full shadow-md animate-fade-in transition-all duration-500">
      {{ geformatteerdeTijd }}
    </p>

      <div
        :class="[
          'bg-contain bg-center bg-no-repeat transition-all duration-300',
          bgImageClass,
          fullscreenMode ? 'h-[100dvh] w-[100dvh]' : 'h-[400px] w-[400px]'
        ]"
      />

  </div>
</template>
<script setup lang="ts">
const game = useGameStore()
const tijd = ref(154.0)
const fullscreenMode = ref(false)
let timer: NodeJS.Timeout

const geformatteerdeTijd = computed(() => {
  const seconden = Math.floor(tijd.value)
  const minuten = Math.floor(seconden / 60)
  const restSeconden = seconden % 60

  const pad = (n: number, l = 2) => n.toString().padStart(l, '0')

  return `${pad(minuten)}:${pad(restSeconden)}`
})

onMounted(() => {
  timer = setInterval(() => {
    if (tijd.value > 0) tijd.value -= 0.01
    else {
      clearInterval(timer)
      alert('Tijd is om!')
      navigateTo('/potje')
    }
  }, 10)
})

onUnmounted(() => clearInterval(timer))


const bgImageClass = computed(() => {
  const map: Record<string, string> = {
    'Glibber Poes': 'bg-glibberpoes',
    'Opblaas kip': 'bg-opblaaskip',
    'VissenPijper': 'bg-vissenpijper',
    'omaWerper': 'bg-omawerper',
    'Rotstraal': 'bg-rotstraal',
    'Scheldboer': 'bg-scheldboer',
    'Mocro': 'bg-mocro',
    'Ling-Pong': 'bg-ling-pong',
    'SuperSnitch': 'bg-supersnitch',
    'Cursus': 'bg-cursus',
    'Porkel': 'bg-porkel',
    'Neusaarappel': 'bg-neusaarappel',
    '莓果魚': 'bg-chinees',
    'Lubbes': 'bg-lubbes'
  }
  return map[game.word] ?? ''
})

onMounted(() => {
  window.addEventListener('keydown', toetsHandler)
})
onUnmounted(() => {
  window.removeEventListener('keydown', toetsHandler)
})
function toetsHandler(e: KeyboardEvent) {
  if (e.key === 'p') {
    if (timer) {
      clearInterval(timer)
    } else {
      onMounted()
    }
  }
  if (e.key === 'f') {
    document.documentElement.requestFullscreen()
  }
  if (e.key === 't') {
    fullscreenMode.value = !fullscreenMode.value
  }
}
</script>
<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out both;
}

.animate-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.bg-glibberpoes {
  background-image: url('/assets/images/advertisements/glibberpoes.jpeg');
}
.bg-opblaaskip {
  background-image: url('/assets/images/advertisements/opblaaskip.jpeg');
}
.bg-vissenpijper {
  background-image: url('/assets/images/advertisements/vissenPijper.jpeg');
}
.bg-omawerper {
  background-image: url('/assets/images/advertisements/omaWerper.jpeg');
}
.bg-rotstraal {
  background-image: url('/assets/images/advertisements/rotstraal.jpeg');
}
.bg-scheldboer {
  background-image: url('/assets/images/advertisements/scheldboer.jpeg');
}
.bg-mocro {
  background-image: url('/assets/images/advertisements/mocro.jpeg');
}
.bg-ling-pong {
  background-image: url('/assets/images/advertisements/ling-pong.jpeg');
}
.bg-supersnitch {
  background-image: url('/assets/images/advertisements/supersnitch.jpeg');
}
.bg-cursus {
  background-image: url('/assets/images/advertisements/cursus.jpeg');
}
.bg-porkel {
  background-image: url('/assets/images/advertisements/porkel.jpeg');
}
.bg-neusaarappel {
  background-image: url('/assets/images/advertisements/neasaarappel.jpeg');
}
.bg-chinees {
  background-image: url('/assets/images/advertisements/chinees.jpeg');
}
.bg-lubbes {
  background-image: url('/assets/images/advertisements/lubbes.jpeg');
}
</style>