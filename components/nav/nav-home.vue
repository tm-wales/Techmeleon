<template>
    <nuxt-link
        class="nav__home"
        to="/"
        @click.native="changeColors()"
    >
        <Techmeleon />
    </nuxt-link>
</template>

<script>
import Techmeleon from '~/components/Techmeleon'
export default {
    components: {
        Techmeleon
    }
}
</script>


<style lang="scss" scoped>
.nav__home {
    z-index: 100;
    padding: 2rem 0;
    font-family: 'Techmeleon';
}
</style>
