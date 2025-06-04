<template>
  <div class="text-2xl font-bold">{{ tijd }} seconden</div>
</template>
<script setup lang="ts">
const props = defineProps<{ start: number }>()
const tijd = ref(props.start)

onMounted(() => {
  const interval = setInterval(() => {
    if (tijd.value > 0) tijd.value--
    else clearInterval(interval)
  }, 1000)
})
</script>
