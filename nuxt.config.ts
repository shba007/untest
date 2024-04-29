// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/fonts",
    "@nuxt/image",
    "@nuxt/test-utils",
    "@nuxtjs/color-mode",
    "@nuxtjs/seo",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
    "@vueuse/nuxt",
    "nuxt-gtag",
    "nuxt-icons",
  ],
  nitro: {
    experimental: {
      websocket: true
    }
  }
})