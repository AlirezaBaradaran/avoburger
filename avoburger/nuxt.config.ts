// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-09-19',
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '@fortawesome/fontawesome-free/css/all.min.css',
    'vue-multiselect/dist/vue-multiselect.min.css'
  ]
})