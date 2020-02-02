<template>
    <nuxt-link
        class="nav__contact"
        :class="{big: forSlide}"
        to="/contact"
        @click.native="changeColors()"
    >
        Contact
    </nuxt-link>
</template>
<script>
export default {
    props: {
        forSlide: {
            type: Boolean,
            required: false,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>
.nav__contact {
    position: fixed;
    z-index: 100;
    top: 0;
    right: 0;
    font-size: 1.6rem;
    padding: 2rem 2.5rem;
    font-family: 'Techmeleon';

    &.big {
        position: relative;
        top: auto;
        right: auto;
        font-size: 7rem;
        text-align: center;
        padding: 0;
        margin: 0;
    }
}
</style>
