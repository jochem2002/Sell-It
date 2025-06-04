<template>
  <UiProvider>
    <header class="bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-md">
      <UContainer class="flex items-center justify-between py-4">
        <h1 class="text-xl font-bold">Potje Verkopen</h1>
        <div class="md:hidden">
          <button @click="menuOpen = !menuOpen" class="focus:outline-none hover:text-indigo-300 active:scale-95 transition duration-200">
            <svg v-if="!menuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
        <ul class="hidden md:flex space-x-4">
          <li>
            <NuxtLink
              to="/"
              :class="[
                'transition duration-200',
                route.path === '/' ? 'hidden' : 'hover:underline hover:text-indigo-200 active:scale-95'
              ]"
            >Terug</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/spelen"
              :class="[
                'transition duration-200',
                route.path === '/spelen' ? 'font-bold text-indigo-200' : 'hover:underline hover:text-indigo-200 active:scale-95'
              ]"
            >Lekker spelen</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/spelen/spelers"
              :class="[
                'transition duration-200',
                route.path === '/spelen/spelers' ? 'font-bold text-indigo-200' : 'hover:underline hover:text-indigo-200 active:scale-95'
              ]"
            >Spelertjes</NuxtLink>
          </li>
        </ul>
      </UContainer>
      <transition name="menu-fade">
        <ul v-show="menuOpen" class="md:hidden mt-2 space-y-2 overflow-hidden transition-all duration-300 ease-in-out">
          <li>
            <NuxtLink
              to="/"
              :class="[
                'block transition duration-200',
                route.path === '/' ? 'font-bold text-indigo-200' : 'hover:underline hover:text-indigo-200 active:scale-95'
              ]"
            >Terug</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/spelen"
              :class="[
                'block transition duration-200',
                route.path === '/spelen' ? 'font-bold text-indigo-200' : 'hover:underline hover:text-indigo-200 active:scale-95'
              ]"
            >Lekker spelen</NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/spelen/spelers"
              :class="[
                'block transition duration-200',
                route.path === '/spelen/spelers' ? 'font-bold text-indigo-200' : 'hover:underline hover:text-indigo-200 active:scale-95'
              ]"
            >Spelertjes</NuxtLink>
          </li>
        </ul>
      </transition>
    </header>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UiProvider>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const menuOpen = ref(false)
const route = useRoute()
</script>

<style scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: max-height 0.3s ease-in-out;
}
.menu-fade-enter-from,
.menu-fade-leave-to {
  max-height: 0;
}
.menu-fade-enter-to,
.menu-fade-leave-from {
  max-height: 200px;
}
</style>
