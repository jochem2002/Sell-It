<template>
  <div class="p-4 space-y-4">
    <h1 class="text-xl font-bold">Welkom bij Potje Verkopen</h1>
    <NuxtLink v-if="!spelBestaat" to="/spelen/spelen" class="btn">Nieuw spel</NuxtLink>
    <div v-else class="space-y-2">
      <NuxtLink to="/spelen/spelen" class="btn">Verder spelen</NuxtLink>
      <button class="btn" @click="opnieuw">Begin opnieuw</button>
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