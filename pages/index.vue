<template>
  <div class="p-8 max-w-2xl mx-auto bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl shadow-2xl text-white animate-fade-in space-y-6">
    <h1 class="text-3xl font-extrabold tracking-tight text-center drop-shadow-lg">Welkom bij Potje Verkopen</h1>

    <NuxtLink
      v-if="!spelBestaat"
      to="/spelen"
      class="block w-full text-center bg-white text-purple-700 font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 hover:bg-purple-100 active:scale-95"
    >
      Nieuw spel starten
    </NuxtLink>

    <div v-else class="space-y-4">
      <NuxtLink
        to="/spelen"
        class="block w-full text-center bg-white text-purple-700 font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 hover:bg-purple-100 active:scale-95"
      >
        Verder spelen
      </NuxtLink>
      <button
        class="block w-full text-center bg-transparent border border-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 hover:bg-white hover:text-purple-700 active:scale-95"
        @click="opnieuw"
      >
        Begin opnieuw
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
const game = useGameStore()
const spelBestaat = computed(() => game.players.length > 0)
const opnieuw = () => {
  game.resetGame()
  navigateTo('/')
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
</style>