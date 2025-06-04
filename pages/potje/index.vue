<template>
  <div class="p-8 max-w-3xl mx-auto bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl shadow-2xl text-white animate-fade-in space-y-6">
    <div v-if="!spelGestart" class="space-y-4">
      <label class="block text-lg font-semibold">Aantal rondes:</label>
      <input
        type="number"
        v-model="aantalRondes"
        class="w-full px-4 py-3 rounded-xl shadow-inner text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
      />
      <button
        class="w-full bg-white text-pink-700 font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 hover:bg-pink-100 active:scale-95"
        @click="start"
      >
        Start spel
      </button>
    </div>

    <div v-else class="space-y-4">
      <h2 class="text-2xl font-bold text-center drop-shadow-lg">Speler aan de beurt: {{ huidigeSpeler }}</h2>
      <div class="p-4 rounded-xl bg-white text-rose-700 shadow-md">
        <RadVanWoorden />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RadVanWoorden from '@/components/RadVanWoorden.vue'
const game = useGameStore()
const players = usePlayerStore()
const aantalRondes = ref(1)
const spelGestart = computed(() => game.players.length > 0)

const start = () => {
  game.setPlayers(players.list.map(p => p.name))
  game.setRounds(aantalRondes.value)
}
const huidigeSpeler = computed(() => game.players[game.currentTurn % game.players.length])
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