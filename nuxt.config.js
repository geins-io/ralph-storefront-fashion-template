import path from 'path';
import fs from 'fs';
import csv from 'csv-parser';
import {
  ApolloClient,
  gql,
  InMemoryCache,
  HttpLink
} from '@apollo/client/core';
import fetch from 'cross-fetch';
import DirectoryNamedWebpackPlugin from './static/directory-named-webpack-resolve';
import channelSettings from './static/channel-settings';
const fallbackChannelId = process.env.FALLBACK_CHANNEL_ID;
const currentChannelSettings = channelSettings.find(
  i => i.channelId === fallbackChannelId
);

const routePaths = {
  category: '/c',
  brand: '/b',
  product: '/p',
  search: '/s',
  discountCampaign: '/dc',
  all: '/allt'
};

const imageSizesFile = './static/ImageSize.csv';

const imageSizesStream = fs.createReadStream(imageSizesFile);
const imageSizeObject = {};
const apolloCache = new InMemoryCache({});
const apolloClient = new ApolloClient({
  cache: apolloCache,
  link: new HttpLink({ uri: process.env.API_ENDPOINT, fetch })
});

// Parse the imageSizesFile to get the image sizes
const imageSizesStreamRead = new Promise(function(resolve) {
  imageSizesStream
    .pipe(csv())
    .on('data', row => {
      // Get the value from the PartitionKey (Imate type) Column and make it lowercase (Because of input inconsistencies in the source document)
      const PartitionKey = row.PartitionKey.toLowerCase();
      // Create the data for this row
      const imageRow = {
        folder: row.Folder,
        descriptor: row.Width + 'w'
      };
      // Check if the imagesizeobject has the current image tyoe already, if so add to it, otherwise create it
      if (imageSizeObject[PartitionKey]) {
        imageSizeObject[PartitionKey].push(imageRow);
      } else {
        imageSizeObject[PartitionKey] = [imageRow];
      }
    })
    .on('end', () => {
      resolve(imageSizeObject);
    });
});

async function getImageSizes() {
  const imageSizes = await imageSizesStreamRead;
  return imageSizes;
}
export default async () => {
  const imageSizes = await getImageSizes();

  const defaultMetaQuery = await apolloClient.query({
    query: gql`
      query listPageInfo {
        listPageInfo(alias: "frontpage", channelId: "${fallbackChannelId}") {
          meta {
            description
            title
          }
        }
      }
    `,
    context: {
      headers: {
        'X-ApiKey': process.env.API_KEY
      }
    }
  });
  const defaultMeta = await defaultMetaQuery.data.listPageInfo.meta;
  return {
    /*
     ** Customize the progress-bar color
     */
    loading: { color: currentChannelSettings.accentColor, height: '5px' },
    /*
     ** Global CSS
     */
    css: ['@/styles/main.scss'],
    // See https://github.com/nuxt/components
    components: [
      { path: '~/components/atoms', extensions: ['vue'] },
      { path: '~/components/molecules', extensions: ['vue'] },
      { path: '~/components/organisms', extensions: ['vue'] },
      {
        path: '~/node_modules/@ralph/ralph-ui/components/atoms',
        extensions: ['vue'],
        level: 1
      },
      {
        path: '~/node_modules/@ralph/ralph-ui/components/molecules',
        extensions: ['vue'],
        level: 1
      },
      {
        path: '~/node_modules/@ralph/ralph-ui/components/organisms',
        extensions: ['vue'],
        level: 1
      }
    ],

    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
      { src: '~/plugins/persistedState.js', mode: 'client' },
      { src: '~/plugins/set-css-variables.js', mode: 'client' },
      {
        src: '~/node_modules/@ralph/ralph-ui/plugins/broadcastChannel.js',
        mode: 'client'
      },
      {
        src: '~/node_modules/@ralph/ralph-ui/plugins/appInsights.client.js',
        mode: 'client'
      },
      {
        src: '~/node_modules/@ralph/ralph-ui/plugins/appInsights.server.js',
        mode: 'server'
      },
      {
        src: '~/node_modules/@ralph/ralph-ui/plugins/headersControl.js',
        mode: 'server'
      }
    ],

    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
      // Doc: https://github.com/nuxt-community/eslint-module
      '@nuxtjs/eslint-module',
      // Doc: https://github.com/nuxt-community/stylelint-module
      '@nuxtjs/stylelint-module'
      // Doc: https://html-validator.nuxtjs.org/
      // '@nuxtjs/html-validator'
    ],

    workbox: {
      runtimeCaching: [
        {
          urlPattern: process.env.IMAGE_SERVER + '/.*'
        }
      ]
    },
    /*
     ** Nuxt.js modules
     */
    modules: [
      // Doc: https://github.com/nuxt-community/pwa-module
      '@nuxtjs/pwa',
      'nuxt-multi-cache',
      [
        // Doc: https://github.com/nuxt-community/i18n-module
        '@nuxtjs/i18n',
        {
          baseUrl: process.env.BASE_URL,
          seo: false,
          locales: [
            {
              code: 'en',
              iso: 'en-US',
              file: 'en-US.js',
              name: 'English',
              flag: 'gb',
              domain: channelSettings.find(i => i.locale === 'en').domain
            },
            {
              code: 'sv',
              iso: 'sv-SE',
              file: 'sv-SE.js',
              name: 'Svenska',
              flag: 'se',
              domain: channelSettings.find(i => i.locale === 'sv').domain
            }
          ],
          langDir: 'languages/',
          defaultLocale: 'sv',
          lazy: true,
          vueI18n: {
            fallbackLocale: 'sv'
          },
          detectBrowserLanguage: false,
          differentDomains: process.env.NODE_ENV === 'production',
          parsePages: false,
          pages: {
            'checkout/index': {
              sv: '/kassan',
              en: '/checkout'
            },
            'account/orders': {
              sv: '/mina-sidor/ordrar',
              en: '/my-account/orders'
            },
            'account/settings': {
              sv: '/mina-sidor/installningar',
              en: '/my-account/settings'
            },
            'favorites/index': {
              sv: '/favoriter',
              en: '/favorites'
            }
          }
        }
      ],
      // Doc: https://github.com/nuxt-community/style-resources-module
      '@nuxtjs/style-resources',
      // Doc: https://github.com/nuxt-community/apollo-module
      '@nuxtjs/apollo',
      // Doc: https://www.npmjs.com/package/cookie-universal-nuxt
      'cookie-universal-nuxt',
      // Doc: https://www.npmjs.com/package/nuxt-user-agent
      'nuxt-user-agent',
      // Doc: https://www.npmjs.com/package/@nuxtjs/component-cache
      ['@nuxtjs/component-cache', { maxAge: 1000 * 60 * 60 }],
      // Doc: https://www.npmjs.com/package/nuxt-polyfill
      'nuxt-polyfill',
      // Doc: https://www.npmjs.com/package/@nuxtjs/gtm
      '@nuxtjs/gtm',
      // Doc: https://www.npmjs.com/package/@nuxtjs/applicationinsights
      '@nuxtjs/applicationinsights'
    ],
    // htmlValidator: {
    //   usePrettier: true,
    //   options: {
    //     rules: {
    //       'input-missing-label': 'off',
    //       'prefer-native-element': 'off'
    //     }
    //   }
    // },
    multiCache: {
      enabled: process.env.NODE_ENV === 'production',
      outputDir: '~/cache',
      server: {
        auth: {
          username: 'admin',
          password: 'hunter2'
        }
      },
      pageCache: {
        enabled: false
      },
      componentCache: {
        enabled: true
      },
      dataCache: {
        enabled: false
      }
    },
    pwa: {
      // Default metadata. Doc: https://pwa.nuxtjs.org/meta/
      meta: {
        name: defaultMeta.title,
        description: defaultMeta.description,
        author: null
      },
      manifest: {
        name: 'Ralph',
        short_name: 'Ralph',
        description: defaultMeta.description,
        theme_color: currentChannelSettings.accentColor
      },
      icon: {
        purpose: 'any'
      }
    },
    styleResources: {
      scss: ['./styles/_variables.scss', './styles/_helpers.scss']
    },
    apollo: {
      clientConfigs: {
        default: '~/plugins/apollo-config.js'
      },
      includeNodeModules: true
    },
    polyfill: {
      features: [
        {
          require: 'focus-visible'
        }
      ]
    },
    router: {
      middleware: ['default'],
      extendRoutes(routes, resolve) {
        routes.push({
          name: 'pdp',
          path: routePaths.product + '/:alias',
          component: resolve(__dirname, 'pages/product/_alias.vue')
        });
        routes.push({
          name: 'pdp-level',
          path: routePaths.product + '/(.*)/:alias',
          component: resolve(__dirname, 'pages/product/_alias.vue')
        });
        routes.push({
          name: 'pdp-sub-level',
          path: routePaths.product + '/(.*)/(.*)/:alias',
          component: resolve(__dirname, 'pages/product/_alias.vue')
        });
        routes.push({
          name: 'plp-all',
          path: routePaths.all,
          component: resolve(__dirname, 'pages/list/_all.vue')
        });
        routes.push({
          name: 'plp-category',
          path: routePaths.category + '/:category',
          component: resolve(__dirname, 'pages/list/_category.vue')
        });
        routes.push({
          name: 'plp-sub-category',
          path: routePaths.category + '/(.*)/:category',
          component: resolve(__dirname, 'pages/list/_category.vue')
        });
        routes.push({
          name: 'plp-brand',
          path: routePaths.brand + '/:brand+',
          component: resolve(__dirname, 'pages/list/_brand.vue')
        });
        routes.push({
          name: 'plp-discount-campaign',
          path: routePaths.discountCampaign + '/:discountCampaign+',
          component: resolve(__dirname, 'pages/list/_discountCampaign.vue')
        });
        routes.push({
          name: 'plp-search',
          path: routePaths.search + '/:search',
          component: resolve(__dirname, 'pages/list/_search.vue')
        });
        routes.push({
          name: 'preview-widgets',
          path: '/preview-widgets',
          component: resolve(__dirname, 'pages/content/_preview.vue')
        });
        routes.push({
          name: 'content',
          path: '/:alias',
          component: resolve(__dirname, 'pages/content/_alias.vue')
        });
        // Adding routes with translated paths is done through nuxt-i18n config above
      }
    },
    gtm: {
      id: process.env.GTM_ID,
      debug: process.env.NODE_ENV !== 'production',
      respectDoNotTrack: false,
      pageViewEventName: 'Page Impression',
      pageTracking: false
    },
    /*
     ** Runtime configs
     */
    publicRuntimeConfig: {
      /* ***************** */
      /* **** GLOBAL ***** */
      /* ***************** */
      channelSettings,
      baseUrl: process.env.BASE_URL,
      imageServer: process.env.IMAGE_SERVER,
      authEndpoint: process.env.AUTH_ENDPOINT,
      signEndpoint: process.env.SIGN_ENDPOINT.replace(
        '{API_KEY}',
        process.env.API_KEY
      ),
      apiKey: process.env.API_KEY,
      apiEndpoint: process.env.API_ENDPOINT,
      customerServiceEmail: 'info@carismar.io',
      customerServicePhone: '+46 123 23 43 45',
      breakpoints: {
        tablet: 768,
        laptop: 1024,
        desktop: 1200
      },
      siteTopThreshold: 10,
      socialMediaLinks: [
        {
          icon: 'facebook',
          title: 'Facebook',
          link: 'https://www.facebook.com'
        },
        {
          icon: 'instagram',
          title: 'Instagram',
          link: 'https://www.instagram.com'
        }
      ],
      customerTypesToggle: false,
      customerTypes: [
        {
          type: 'PERSON',
          vat: true
        },
        {
          type: 'ORGANIZATION',
          vat: false
        }
      ],
      routePaths,
      /* ****************** */
      /* **** WIDGETS ***** */
      /* ****************** */
      bannerWidgetPrimaryColor: currentChannelSettings.primaryTextColor,
      bannerWidgetSecondaryColor: currentChannelSettings.inverseTextColor,
      productListWidgetArrowIconName: 'chevron',
      productListRowSize: 4,
      widgetImageSizes: {
        full: '(min-width: 1360px) 1320px, 96vw',
        half: '(min-width: 1360px) 650px, (min-width: 768px) 47vw, 96vw',
        third: '(min-width: 1360px) 427px, (min-width: 768px) 31vw, 96vw',
        quarter: '(min-width: 1360px) 315px, (min-width: 768px) 23vw, 96vw'
      },
      widgetImageSizesFullWidth: {
        full: '100vw',
        half: '(min-width: 768px) 49vw, 100vw',
        third: '(min-width: 768px) 33vw, 100vw',
        quarter: '(min-width: 768px) 24vw, 100vw'
      },
      /* *********************** */
      /* **** PRODUCT LIST ***** */
      /* *********************** */
      productListDefaultSort: 'LATEST',
      productListPageSize: 20,
      productListScrollSize: {
        phone: 2,
        tablet: 3,
        laptop: 4,
        desktop: 4
      },
      /* ****************** */
      /* **** PRODUCT ***** */
      /* ****************** */
      productStockFewLeftLimit: 6,
      productSchemaOptions: {
        productSkuLabelIsSize: false,
        productDescriptionField: 'text1',
        schemaImageSize: '700f700', // Make sure this is a valid product image size
        extraOfferProperties: {
          itemCondition: 'https://schema.org/NewCondition'
        }
      },
      productShowRelated: true,
      /* ****************** */
      /* ***** IMAGES ***** */
      /* ****************** */
      productImageRatio: 1 / 1,
      imageSizes,
      /* ******************** */
      /* ***** CHECKOUT ***** */
      /* ******************** */
      checkout: {
        promoCodes: true,
        shippingAddress: true,
        identityNumber: true,
        entryCode: true,
        message: true,
        defaultPaymentId: 23,
        defaultShippingId: null
      },
      /* ******************** */
      /* ******* CART ******* */
      /* ******************** */
      cart: {
        hiddenSkuValues: ['-', 'One size'],
        quantityChangerType: 'default' // default, stacked or rounded
      },
      /* ******************** */
      /* ******* USER ******* */
      /* ******************** */
      user: {
        gender: false, // If set to true, gender must be added to user.graphql
        country: false,
        priceLists: false // Set to true if using different price lists for different users
      }
    },
    privateRuntimeConfig: {},
    render: {
      http2: {
        push: true
      }
    },
    server: {
      timing: {
        total: true
      }
    },
    /*
     ** Build configuration
     */
    build: {
      babel: {
        presets({ isServer }) {
          return [
            [
              require.resolve('@nuxt/babel-preset-app'),
              {
                corejs: { version: 3 }
              }
            ]
          ];
        }
      },
      transpile: ['@ralph/ralph-ui'],
      optimization: {
        splitChunks: {
          chunks: 'all',
          automaticNameDelimiter: 'ca.',
          name: undefined,
          cacheGroups: {},
          minSize: 15000,
          maxSize: 260000
        }
      },
      loaders: {
        vue: { cacheBusting: false, prettify: false },
        scss: { sourceMap: false }
      },
      /*
       ** You can extend webpack config here
       */
      extend(config, { isDev }) {
        config.resolve.extensions.unshift('.vue');
        config.resolve.plugins = [new DirectoryNamedWebpackPlugin()];
        // Resolve modules by always checking storefront first to allow for overrides
        config.resolve.modules = [
          path.resolve(__dirname, 'node_modules/'),
          // First check for scss styles
          path.resolve(__dirname, 'styles/components/'),
          path.resolve(
            __dirname,
            'node_modules/@ralph/ralph-ui/styles/components/'
          ),
          // Then for mixins
          path.resolve(__dirname, 'components/mixins/'),
          path.resolve(
            __dirname,
            'node_modules/@ralph/ralph-ui/components/mixins/'
          ),
          // Then for graphql queries
          path.resolve(__dirname, 'graphql/'),
          path.resolve(__dirname, 'node_modules/@ralph/ralph-ui/graphql/'),
          // Then the UI store
          path.resolve(__dirname, 'node_modules/@ralph/ralph-ui/store/'),
          // Then the UI middleware
          path.resolve(__dirname, 'node_modules/@ralph/ralph-ui/middleware/')
        ];
        if (isDev) {
          config.devtool = 'source-map';
        }
      }
    },
    hooks: {
      render: {
        errorMiddleware(app) {
          // eslint-disable-next-line
          app.use((error, req, res, next) => {
            res.writeHead(307, {
              Location: '/'
            });
            res.end();
          });
        }
      }
    },
    dev: process.env.NODE_ENV !== 'production',
    appInsights: {
      instrumentationKey: process.env.APPINSIGHTS_INSTRUMENTATION_KEY,
      serverConfig: {
        excludedFileEndings: ['.js', '.map', '.json', '.png', '.svg']
      },
      clientConfig: {
        enableAutoRouteTracking: true
      }
    }
  };
};
