module.exports = {
    mode: 'universal',
    /*
  ** Headers of the page
  */
    head: {
        title: 'Techmeleon',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'We provide digital solutions to give creative, transparent and decision making information. Give us a call to analyse your business so we can provide the right solution to enhance your business.'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: 'stylesheet',
                href:
                    'https://fonts.googleapis.com/css?family=Roboto:300,400,700'
            }
        ]
    },
    /*
  ** Customize the progress-bar color
  */
    loading: { color: '#fff' },

    /*
  ** Global CSS
  */
    css: [
        '~/assets/sass/main.scss',
        '~/assets/fonts/tm/stylesheet.css',
        '@fortawesome/fontawesome-svg-core/styles.css'
    ],
    transition: {
        name: 'page',
        mode: 'out-in',
        beforeLeave(el) {
            const boom = document.getElementsByClassName('app')[0]
            boom.classList.add('transition')
            boom.classList.remove('loaded')
        },
        leave(el, done) {
            setTimeout(() => {
                done()
            }, 750)
        },
        afterLeave(el) {
            // wait
        },
        beforeEnter(el) {
            // wait
        },
        enter(el, done) {
            done()
        },
        afterEnter(el) {
            const boom = document.getElementsByClassName('app')[0]
            setTimeout(() => {
                if (typeof boom !== 'undefined') {
                    boom.classList.remove('transition')
                    boom.classList.add('loaded')
                }
            }, 750)
        }
    },

    /*
** Plugins to load before mounting the App
*/
    plugins: [
        '~/plugins/global',
        '~/plugins/vue-moment',
        '~/plugins/vue-in-viewport',
        '~/plugins/vue-datetime',
        '~/plugins/vue-lidate',
        '~/plugins/vue-scrollto',
        '~/plugins/vue-fontawesome',
        {
            src: '~/plugins/vue-carousel-3d',
            ssr: false
        },
        {
            src: '~/plugins/vue-waypoint',
            ssr: false
        }
    ],
    serverMiddleware: ['~/middleware/api/contact'],
    /*
  ** Nuxt.js modules
  */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        // Simple usage
        [
            '@nuxtjs/google-analytics',
            {
                id: 'UA-134157298-1'
            }
        ]
    ],
    /*
  ** Axios module configuration
  */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        proxyHeaders: false,
        credentials: false,
        baseUrl: ''
    },

    /*
  ** Build configuration
  */
    build: {
        /*
    ** You can extend webpack config here
    */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}
