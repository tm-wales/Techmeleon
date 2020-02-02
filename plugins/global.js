import Vue from 'vue'
import ScrollTo from '../components/UI/scrollTo.vue'
import Footer from '~/components/footer'
import Header from '~/components/header'

Vue.component('app-scroll-to', ScrollTo)
Vue.component('app-footer', Footer)
Vue.component('app-header', Header)

Vue.mixin({
    methods: {
        changeColors(colors) {
            if (typeof colors === 'undefined') {
                colors = this.$store.state.defaultColors
            }
            this.$store.dispatch('updateBoomColor', colors)
        },
        setTheme(name) {
            this.$store.dispatch('updateTheme', name)
        }
    }
})
