<template>
    <main class="page page__projects">
        <div class="page__top" />
        <Header :title="pageData.content.header" :caption="pageData.content.tag" :summary="pageData.content.subHeader" next-el=".projects" />
        <div class="projects">
            <div class="projects__title header__title">
                For more detail on experience and past work,<br>
                <nuxt-link to="/contact">
                    contact us for a coffee!
                </nuxt-link>
            </div>
            <Projects />
        </div>
        <app-footer class="next-page" :next-page="{title: 'Who', link: '/about'}" />
    </main>
</template>

<script>
import Header from '~/components/header'
import Projects from '~/components/projects/list'
export default {
    components: {
        Header,
        Projects
    },
    data() {
        return {
            title: 'Projects',
            caption: 'Passionate & focused',
            summary:
                'With over 12 years experience in business analysis, development and UX design. We are here to help you achieve your goals.'
        }
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
            return this.$store.getters['pages/page']('Projects')[0]
        }
    },
    mounted() {
        this.setTheme('dark')
    }
}
</script>
