<template>
  <div class="p-4 space-y-2">
    <h2 class="text-lg font-semibold">Spelersbeheer</h2>
    <div class="flex space-x-2">
      <input v-model="nieuweNaam" placeholder="Naam speler" class="input" />
      <button class="btn" @click="voegToe">Toevoegen</button>
    </div>
    <ul>
      <li v-for="(speler, i) in store.list" :key="i" class="flex justify-between">
        <span>{{ speler.name }}</span>
        <button @click="store.removePlayer(i)">Verwijder</button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
const store = usePlayerStore()
const nieuweNaam = ref('')
const voegToe = () => {
  if (nieuweNaam.value) store.addPlayer(nieuweNaam.value)
  nieuweNaam.value = ''
}
</script>