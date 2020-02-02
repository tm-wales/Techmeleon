<template>
    <nav
        class="nav__slide"
        :class="{open: open}"
        @click="$emit('toggle')"
    >
        <nuxt-link
            v-for="nav in navlinks.others"
            :key="nav.path"
            class="nav__slide__link"
            :to="nav.path"
            @click.native="changeColors()"
        >
            <span>{{ nav.name }}</span>
        </nuxt-link>

        <Contact :for-slide="true" />
    </nav>
</template>

<script>
import Contact from '~/components/nav/nav-contact'

export default {
    components: {
        Contact
    },
    props: {
        navlinks: {
            type: Object,
            required: true
        },
        open: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.nav__slide {
    display: flex;
    position: fixed;
    flex-direction: column;
    justify-content: space-between;
    top: 7rem;
    right: 0;
    height: calc(100% - 7rem);
    width: 100%;
    transition: 0.5s transform;
    will-change: tranform;
    transform: translateX(100%);
    z-index: 998;
    padding: 5rem;
    text-align: center;
    &.open {
        transform: translateX(0);
    }
    &__link {
        display: block;
        font-weight: bold;
    }
}
</style>
