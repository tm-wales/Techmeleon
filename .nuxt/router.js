import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _c03104ce = () => interopDefault(import('../pages/about/index.vue' /* webpackChunkName: "pages/about/index" */))
const _0a391a2c = () => interopDefault(import('../pages/contact/index.vue' /* webpackChunkName: "pages/contact/index" */))
const _a12b1b52 = () => interopDefault(import('../pages/policies.vue' /* webpackChunkName: "pages/policies" */))
const _e750c8cc = () => interopDefault(import('../pages/policies/index.vue' /* webpackChunkName: "pages/policies/index" */))
const _6f2886fc = () => interopDefault(import('../pages/policies/_id.vue' /* webpackChunkName: "pages/policies/_id" */))
const _1cf85644 = () => interopDefault(import('../pages/projects/index.vue' /* webpackChunkName: "pages/projects/index" */))
const _28daaf66 = () => interopDefault(import('../pages/solutions/index.vue' /* webpackChunkName: "pages/solutions/index" */))
const _67810622 = () => interopDefault(import('../pages/projects/cabs-group/index.vue' /* webpackChunkName: "pages/projects/cabs-group/index" */))
const _f791ccba = () => interopDefault(import('../pages/projects/office-365-migration/index.vue' /* webpackChunkName: "pages/projects/office-365-migration/index" */))
const _9bb0b298 = () => interopDefault(import('../pages/projects/seven-oaks-pricing/index.vue' /* webpackChunkName: "pages/projects/seven-oaks-pricing/index" */))
const _7854ae4a = () => interopDefault(import('../pages/projects/so-life-cycle/index.vue' /* webpackChunkName: "pages/projects/so-life-cycle/index" */))
const _0ec2785a = () => interopDefault(import('../pages/projects/so-modular/index.vue' /* webpackChunkName: "pages/projects/so-modular/index" */))
const _5e6b72e8 = () => interopDefault(import('../pages/projects/swansea-property-agents/index.vue' /* webpackChunkName: "pages/projects/swansea-property-agents/index" */))
const _86714b4a = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/about",
      component: _c03104ce,
      name: "about"
    }, {
      path: "/contact",
      component: _0a391a2c,
      name: "contact"
    }, {
      path: "/policies",
      component: _a12b1b52,
      children: [{
        path: "",
        component: _e750c8cc,
        name: "policies"
      }, {
        path: ":id",
        component: _6f2886fc,
        name: "policies-id"
      }]
    }, {
      path: "/projects",
      component: _1cf85644,
      name: "projects"
    }, {
      path: "/solutions",
      component: _28daaf66,
      name: "solutions"
    }, {
      path: "/projects/cabs-group",
      component: _67810622,
      name: "projects-cabs-group"
    }, {
      path: "/projects/office-365-migration",
      component: _f791ccba,
      name: "projects-office-365-migration"
    }, {
      path: "/projects/seven-oaks-pricing",
      component: _9bb0b298,
      name: "projects-seven-oaks-pricing"
    }, {
      path: "/projects/so-life-cycle",
      component: _7854ae4a,
      name: "projects-so-life-cycle"
    }, {
      path: "/projects/so-modular",
      component: _0ec2785a,
      name: "projects-so-modular"
    }, {
      path: "/projects/swansea-property-agents",
      component: _5e6b72e8,
      name: "projects-swansea-property-agents"
    }, {
      path: "/",
      component: _86714b4a,
      name: "index"
    }],

    fallback: false
  })
}
