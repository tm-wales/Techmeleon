<template>
    <div class="page">
        <div class="page__top" />
        <div class="policies-trans">
            <header class="policy__header">
                <h1 class="header__title">
                    Policies
                </h1>

                <nav class="policy__links">
                    <nuxt-link
                        v-for="policy in policies"
                        :key="policy.route"
                        :to="'/policies/' + policy.route"
                        class="nav__link"
                    >
                        <span>{{ policy.title }}</span>
                    </nuxt-link>
                </nav>
            </header>

            <nuxt-child />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            policies: []
        }
    },
    head() {
        const page = this.$store.getters['pages/page']('Policies')[0]
        return {
            titleTemplate: page.pageTitle,
            meta: page.meta
        }
    },
    mounted() {
        this.setTheme('dark')
        const policies = this.$store.getters['policies/policies']
        this.policies = policies
    }
}
</script>

<style lang="scss" scoped>
.policies-trans {
    opacity: 0;
    transition: 2s opacity;
}

.loaded {
    & .policies-trans {
        opacity: 1;
    }
}
</style>
