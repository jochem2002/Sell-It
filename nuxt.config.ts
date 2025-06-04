export default defineNuxtConfig({
    modules: ['@pinia/nuxt', '@nuxthq/ui'],
    css: ['@/assets/main.css'],
    pinia: {
        autoImports: ['defineStore']
    },
    nitro: {
        compatibility: {
            date: '2025-06-04'
        }
    },
    typescript: {
        strict: true,
        shim: false
    }
})