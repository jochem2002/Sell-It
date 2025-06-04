<template>
  <div class="p-8 max-w-2xl mx-auto bg-gradient-to-br from-emerald-600 to-cyan-500 rounded-2xl shadow-2xl text-white animate-fade-in space-y-6">
    <h2 class="text-3xl font-extrabold tracking-tight text-center drop-shadow-lg">Spelersbeheer</h2>

    <div class="flex flex-col sm:flex-row gap-4">
      <input
        v-model="nieuweNaam"
        placeholder="Naam speler"
        class="flex-1 px-4 py-3 rounded-xl shadow-inner text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
      />
      <button
        class="bg-white text-emerald-700 font-semibold px-6 py-3 rounded-xl shadow-md transition-all duration-300 hover:bg-emerald-100 active:scale-95"
        @click="voegToe"
      >
        Toevoegen
      </button>
    </div>

    <ul class="space-y-2">
      <li
        v-for="(speler, i) in store.list"
        :key="i"
        class="flex justify-between items-center bg-white text-emerald-800 px-4 py-2 rounded-xl shadow transition-all duration-300 hover:scale-[1.02]"
      >
        <span class="font-medium">{{ speler.name }}</span>
        <button
          @click="store.removePlayer(i)"
          class="text-sm text-red-500 hover:text-red-700 font-semibold transition"
        >
          Verwijder
        </button>
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
<style>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out both;
}
</style>