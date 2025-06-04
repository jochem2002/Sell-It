<template>
  <div class="p-4 space-y-4">
    <NuxtLink v-if="!spelBestaat" to="/spelen/spelers" class="btn">Spelers aanmaken</NuxtLink>
    <NuxtLink v-if="!spelBestaat" to="/potje/potje" class="btn">Begin</NuxtLink>
    <NuxtLink v-else to="/spelen/spelers" class="btn">Bekijk spelers</NuxtLink>
    <NuxtLink to="/potje/potje" class="btn">Verder spelen</NuxtLink>
  </div>
</template>
<script setup lang="ts">
const game = useGameStore()
const spelBestaat = computed(() => game.players.length > 0)
</script>