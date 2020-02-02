import Vue from 'vue'
import Meta from 'vue-meta'
import { createRouter } from './router.js'
import NoSsr from './components/no-ssr.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_googleanalytics_0d26ea63 from 'nuxt_plugin_googleanalytics_0d26ea63' // Source: ./google-analytics.js (mode: 'client')
import nuxt_plugin_axios_03f51c3a from 'nuxt_plugin_axios_03f51c3a' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_global_6441a2ce from 'nuxt_plugin_global_6441a2ce' // Source: ../plugins/global (mode: 'all')
import nuxt_plugin_vuemoment_1fc97fc6 from 'nuxt_plugin_vuemoment_1fc97fc6' // Source: ../plugins/vue-moment (mode: 'all')
import nuxt_plugin_vueinviewport_7be2175e from 'nuxt_plugin_vueinviewport_7be2175e' // Source: ../plugins/vue-in-viewport (mode: 'all')
import nuxt_plugin_vuedatetime_52833350 from 'nuxt_plugin_vuedatetime_52833350' // Source: ../plugins/vue-datetime (mode: 'all')
import nuxt_plugin_vuelidate_23e49670 from 'nuxt_plugin_vuelidate_23e49670' // Source: ../plugins/vue-lidate (mode: 'all')
import nuxt_plugin_vuescrollto_53dc20e5 from 'nuxt_plugin_vuescrollto_53dc20e5' // Source: ../plugins/vue-scrollto (mode: 'all')
import nuxt_plugin_vuefontawesome_43d13937 from 'nuxt_plugin_vuefontawesome_43d13937' // Source: ../plugins/vue-fontawesome (mode: 'all')
import nuxt_plugin_vuecarousel3d_e42043be from 'nuxt_plugin_vuecarousel3d_e42043be' // Source: ../plugins/vue-carousel-3d (mode: 'client')
import nuxt_plugin_vuewaypoint_d4d49a44 from 'nuxt_plugin_vuewaypoint_d4d49a44' // Source: ../plugins/vue-waypoint (mode: 'client')

// Component: <NoSsr>
Vue.component(NoSsr.name, NoSsr)

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>`
Vue.component(Nuxt.name, Nuxt)

// vue-meta configuration
Vue.use(Meta, {
  keyName: 'head', // the component option name that vue-meta looks for meta info on.
  attribute: 'data-n-head', // the attribute name vue-meta adds to the tags it observes
  ssrAttribute: 'data-n-head-ssr', // the attribute name that lets vue-meta know that meta info has already been server-rendered
  tagIDKeyName: 'hid' // the property name that vue-meta uses to determine whether to overwrite or append a tag
})

const defaultTransition = {"name":"page","mode":"out-in","beforeLeave":function(el) {
            const boom = document.getElementsByClassName('app')[0]
            boom.classList.add('transition')
            boom.classList.remove('loaded')
        },"leave":function(el, done) {
            setTimeout(() => {
                done()
            }, 750)
        },"afterLeave":function(el) {
            // wait
        },"beforeEnter":function(el) {
            // wait
        },"enter":function(el, done) {
            done()
        },"afterEnter":function(el) {
            const boom = document.getElementsByClassName('app')[0]
            setTimeout(() => {
                if (typeof boom !== 'undefined') {
                    boom.classList.remove('transition')
                    boom.classList.add('loaded')
                }
            }, 750)
        },"appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp(ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Fix SSR caveat https://github.com/nuxt/nuxt.js/issues/3757#issuecomment-414689141
  const registerModule = store.registerModule
  store.registerModule = (path, rawModule, options) => registerModule.call(store, path, rawModule, Object.assign({ preserveState: process.client }, options))

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    router,
    store,
    nuxt: {
      defaultTransition,
      transitions: [ defaultTransition ],
      setTransitions(transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [ transitions ]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },
      err: null,
      dateErr: null,
      error(err) {
        err = err || null
        app.context._errored = !!err
        err = err ? normalizeError(err) : null
        const nuxt = this.nuxt || this.$options.nuxt
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) ssrContext.nuxt.error = err
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    store,
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined
  })

  const inject = function (key, value) {
    if (!key) throw new Error('inject(key, value) has no key provided')
    if (typeof value === 'undefined') throw new Error('inject(key, value) has no value provided')
    key = '$' + key
    // Add into app
    app[key] = value

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) return
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Vue.prototype.hasOwnProperty(key)) {
        Object.defineProperty(Vue.prototype, key, {
          get() {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Plugin execution

  if (typeof nuxt_plugin_axios_03f51c3a === 'function') await nuxt_plugin_axios_03f51c3a(app.context, inject)
  if (typeof nuxt_plugin_global_6441a2ce === 'function') await nuxt_plugin_global_6441a2ce(app.context, inject)
  if (typeof nuxt_plugin_vuemoment_1fc97fc6 === 'function') await nuxt_plugin_vuemoment_1fc97fc6(app.context, inject)
  if (typeof nuxt_plugin_vueinviewport_7be2175e === 'function') await nuxt_plugin_vueinviewport_7be2175e(app.context, inject)
  if (typeof nuxt_plugin_vuedatetime_52833350 === 'function') await nuxt_plugin_vuedatetime_52833350(app.context, inject)
  if (typeof nuxt_plugin_vuelidate_23e49670 === 'function') await nuxt_plugin_vuelidate_23e49670(app.context, inject)
  if (typeof nuxt_plugin_vuescrollto_53dc20e5 === 'function') await nuxt_plugin_vuescrollto_53dc20e5(app.context, inject)
  if (typeof nuxt_plugin_vuefontawesome_43d13937 === 'function') await nuxt_plugin_vuefontawesome_43d13937(app.context, inject)

  if (process.client) {
    if (typeof nuxt_plugin_googleanalytics_0d26ea63 === 'function') await nuxt_plugin_googleanalytics_0d26ea63(app.context, inject)
    if (typeof nuxt_plugin_vuecarousel3d_e42043be === 'function') await nuxt_plugin_vuecarousel3d_e42043be(app.context, inject)
    if (typeof nuxt_plugin_vuewaypoint_d4d49a44 === 'function') await nuxt_plugin_vuewaypoint_d4d49a44(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    app,
    store,
    router
  }
}

export { createApp, NuxtError }
