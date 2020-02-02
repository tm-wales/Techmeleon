<template>
    <section class="nextpage" :class="{bigeffect: hovered}">
        <nuxt-link
            :to="nextPage.link"
        >
            <div
                class="biglink u-abs"
                @mouseover="hovered = true"
                @mouseleave="hovered = false"
            >
                <div class="link">
                    {{ nextPage.title }}
                </div>
            </div>
        </nuxt-link>

        <app-scroll-to el=".page__top" :invert="true" />
    </section>
</template>

<script>
export default {
    props: {
        nextPage: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            hovered: false
        }
    }
}
</script>

<style lang="scss" scoped>
.nextpage {
    position: relative;
    height: 100vh;
    width: 100%;
    transition: 0.3s background-color;
    text-align: center;
}

.bigeffect {
    background-color: #e6eeed;
}

.arrow__wrap {
    position: absolute;
    font-size: 2rem;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;

    @media (min-width: 768px) {
        bottom: 3rem;
    }
}
.nextpage__arrow {
    animation-name: arrowRight;
    animation-duration: 2s;
    animation-timing-function: cubic-bezier(0.52, 0.01, 0.16, 1);
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
    will-change: transform;
}

.link {
    position: relative;
}
</style>
