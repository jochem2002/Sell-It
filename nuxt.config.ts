export default defineNuxtConfig({
    modules: ['@pinia/nuxt', 'nuxt-ui'],
    css: ['@/assets/main.css'],
    typescript: { strict: true, shim: false },
    runtimeConfig: {
        public: {
            baseUrl: process.env.NUXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        }
    },
    pinia: {
        autoImports: ['defineStore']
    }
})