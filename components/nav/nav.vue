<template>
    <nav class="nav">
        <nuxt-link
            v-for="nav in navlinks.others"
            :key="nav.path"
            class="nav__link"
            :to="nav.path"
            @click.native="changeColors()"
        >
            <span>{{ nav.name }}</span>
        </nuxt-link>
    </nav>
</template>

<script>
export default {
    props: {
        navlinks: {
            type: Object,
            required: true
        }
    }
}
</script>
