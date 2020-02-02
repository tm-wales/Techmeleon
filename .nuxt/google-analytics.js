import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

export default async function ({ app: { router } }) {
  const options = {"debug":{"sendHitTask":false},"id":"UA-134157298-1"}

  Vue.use(VueAnalytics, {...{ router }, ...options})
}
