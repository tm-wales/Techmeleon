<template>
    <main class="page">
        <div class="page__top" />
        <Header
            :title="pageData.content.header"
            :caption="pageData.content.tag"
            :summary="pageData.content.subHeader"
            :next-el="'#who__section-1'"
        />
        <div class="who">
            <who
                v-for="(section, index) in pageData.content.sections"
                :id="'who__section-' + (index + 1)"
                :key="index"
                :data="section"
                :next="index === pageData.content.sections.length - 1 ? '.next-page' : '#who__section-' + (index + 2)"
            />
        </div>
        <app-footer class="next-page" :next-page="{title: 'Contact Us', link: '/contact'}" />
    </main>
</template>

<script>
import Header from '~/components/header'
import Who from '~/components/who/section'

export default {
    components: {
        Header,
        Who
    },
    head() {
        const page = this.pageData
        return {
            titleTemplate: page.pageTitle,
            meta: page.meta
        }
    },
    computed: {
        pageData() {
            return this.$store.getters['pages/page']('Who')[0]
        }
    },
    mounted() {
        this.setTheme('dark')
    }
}
</script>
