<template>
    <main class="page project__page">
        <Header :data="projectData" />
    </main>
</template>

<script>
import Header from '~/components/projects/header'
export default {
    components: {
        Header
    },
    head() {
        const page = this.pageData
        return {
            titleTemplate: this.projectData.name + ' | ' + page.pageTitle,
            meta: page.meta
        }
    },
    computed: {
        projectData() {
            const data = this.$store.getters['projects/project'](
                this.routeName
            )[0]
            return data
        },
        pageData() {
            return this.$store.getters['pages/page']('Landing')[0]
        },
        routeName() {
            return this.$route.path.substr(
                this.$route.path.lastIndexOf('/') + 1
            )
        }
    },
    mounted() {
        this.setTheme('spa')
    }
}
</script>
