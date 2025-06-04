<template>
  <div class="p-8 max-w-2xl mx-auto bg-gradient-to-br from-indigo-600 to-purple-500 rounded-2xl shadow-2xl text-white animate-fade-in space-y-6">
    <h1 class="text-3xl font-extrabold tracking-tight text-center drop-shadow-lg">Spelinstellingen</h1>

    <div class="grid gap-4">
      <NuxtLink
        v-if="!spelBestaat"
        to="/spelen/spelers"
        class="block w-full text-center bg-white text-indigo-700 font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 hover:bg-indigo-100 active:scale-95"
      >
        Spelers aanmaken
      </NuxtLink>

      <NuxtLink
        v-if="!spelBestaat"
        to="/potje"
        class="block w-full text-center bg-white text-indigo-700 font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 hover:bg-indigo-100 active:scale-95"
      >
        Begin
      </NuxtLink>

      <NuxtLink
        v-else
        to="/spelen/spelers"
        class="block w-full text-center bg-white text-indigo-700 font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 hover:bg-indigo-100 active:scale-95"
      >
        Bekijk spelers
      </NuxtLink>

      <NuxtLink
        to="/potje"
        class="block w-full text-center bg-transparent border border-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 hover:bg-white hover:text-indigo-700 active:scale-95"
      >
        Verder spelen
      </NuxtLink>
    </div>
  </div>
</template>
<script setup lang="ts">
const game = useGameStore()
const spelBestaat = computed(() => game.players.length > 0)
</script>