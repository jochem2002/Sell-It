<template>
  <ul>
    <li v-for="(speler, i) in spelers" :key="i" class="flex justify-between">
      <span>{{ speler.name }}</span>
      <button @click="$emit('remove', i)">Verwijder</button>
    </li>
  </ul>
</template>
<script setup lang="ts">
defineProps<{ spelers: { name: string }[] }>()
</script>
