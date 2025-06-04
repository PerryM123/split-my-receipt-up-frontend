// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseLocal: process.env.API_BASE_LOCAL,
      apiBaseLan: process.env.API_BASE_LAN,
      imageUrlBaseLocal: process.env.IMAGE_URL_BASE_LOCAL,
      imageUrlBaseLan: process.env.IMAGE_URL_BASE_LAN,
      awsImageBucket: process.env.AWS_PUBLIC_IMAGE_BUCKET
    }
  },
  srcDir: 'src/',
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/tailwindcss'
  ]
})
