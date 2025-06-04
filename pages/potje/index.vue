<template>
  <div class="p-4 space-y-4">
    <div v-if="!spelGestart">
      <label>Aantal rondes:</label>
      <input type="number" v-model="aantalRondes" class="input" />
      <button class="btn" @click="start">Start spel</button>
    </div>
    <div v-else>
      <h2>Speler aan de beurt: {{ huidigeSpeler }}</h2>
      <RadVanWoorden />
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