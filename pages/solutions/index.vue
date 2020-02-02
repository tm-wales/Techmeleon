<template>
    <main class="page">
        <div class="page__top" />
        <Header :title="pageData.content.header" :caption="pageData.content.tag" :summary="pageData.content.subHeader" />

        <app-footer class="next-page" :next-page="{title: 'Projects', link: '/projects'}" />
    </main>
</template>

<script>
import Header from '~/components/header'
export default {
    components: {
        Header
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
            return this.$store.getters['pages/page']('Solutions')[0]
        }
    },
    mounted() {
        this.setTheme('dark')
    }
}
</script>
