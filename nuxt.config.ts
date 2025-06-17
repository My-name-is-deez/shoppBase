// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  components: [
    {
      path: '~/components',
      pathPrefix: false, // Disable prefix for components
    }
  ],
    supabase: {
    redirect: false, // Disable automatic redirect
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  }, 

  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    'nuxt-primevue'
  ],
  
  
})