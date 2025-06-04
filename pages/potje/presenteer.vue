<template>
  <div :class="['h-screen flex items-center justify-center', kleurKlasse]">
    <h1 class="text-4xl">{{ game.word }}</h1>
    <p>{{ tijd }} seconden</p>
  </div>
</template>
<script setup lang="ts">
const game = useGameStore()
const tijd = ref(154)
let timer: NodeJS.Timeout

onMounted(() => {
  timer = setInterval(() => {
    if (tijd.value > 0) tijd.value--
    else {
      clearInterval(timer)
      alert('Tijd is om!')
      navigateTo('/potje')
    }
  }, 1000)
})

onUnmounted(() => clearInterval(timer))

const kleurKlasse = computed(() => {
  const kleuren: Record<string, string> = {
    'Glibber Poes': 'bg-pink-200',
    'Opblaas kip': 'bg-yellow-100',
    '莓果魚': 'bg-purple-200'
  }
  return kleuren[game.word] || 'bg-gray-100'
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
}
</script>