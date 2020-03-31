export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/styles/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://github.com/nuxt-community/pwa-module
    '@nuxtjs/pwa',
    [
      // Doc: https://github.com/nuxt-community/nuxt-i18n
      'nuxt-i18n',
      {
        seo: false,
        locales: [
          { code: 'en', iso: 'en-US', file: 'en-US.js', name: 'English' },
          { code: 'sv', iso: 'sv-SE', file: 'sv-SE.js', name: 'Svenska' }
        ],
        langDir: 'languages/',
        defaultLocale: 'en',
        lazy: true,
        vueI18n: {
          fallbackLocale: 'en'
        }
      }
    ],
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: ['./styles/_variables.scss', './styles/_helpers.scss']
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: ['@ralph/ralph-ui'],
    /*
     ** You can extend webpack config here
     */
    extend(config, { isDev }) {
      if (isDev) {
        config.devtool = 'source-map';
      }
    }
  },
  dev: process.env.NODE_ENV !== 'production'
};
