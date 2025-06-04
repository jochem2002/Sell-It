export default defineNuxtPlugin((nuxtApp) => {
    if (process.client) {
        const script = document.createElement('script')
        script.src = '/js/winwheel.min.js'
        script.async = true
        document.head.appendChild(script)
    }
})