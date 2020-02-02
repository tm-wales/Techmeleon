<template>
    <section class="policy">
        <h1 class="policy__title">
            {{ getPolicy.title }}
        </h1>
        <div class="policy__content" v-html="getPolicy.html" /> <!-- eslint-disable-line -->
    </section>
</template>

<script>
export default {
    validate(data) {
        if (
            data.params.id === 'cookie-policy' ||
            data.params.id === 'privacy-policy'
        ) {
            return true
        }

        throw new Error('Policy does not exist!')
    },
    computed: {
        getPolicy() {
            const route = this.$route.params.id
            return this.$store.getters['policies/policy'](route)[0]
        }
    }
}
</script>
