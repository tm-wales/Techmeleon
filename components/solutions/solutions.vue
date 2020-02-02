<template>
    <div v-show="showCarousel">
        <no-ssr>
            <carousel-3d
                :width="500"
                :height="800"
                :inverse-scaling="1600"
                :space="800"
                :controls-visible="true"
                dir="ltr"
                class="services"
            >
                <slide
                    v-for="(service, index) in getSolutions"
                    :key="index"
                    :index="index"
                    class="service"
                >
                    <div class="service__content">
                        <div class="service__caption u-line-highlight">
                            <span>{{ service.tag }}</span>
                        </div>
                        <div class="service__title header__title">
                            <span>{{ service.name }}</span>
                        </div>
                        <div class="service__summary">
                            <span>{{ service.summary }}</span>
                        </div>
                        <nuxt-link class="service__link btn" :to="'/services/'+ service.route">
                            <span>{{ service.short }}</span>
                        </nuxt-link>
                    </div>
                </slide>
            </carousel-3d>
        </no-ssr>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showCarousel: false
        }
    },
    computed: {
        getSolutions() {
            return this.$store.state.solutions.list
        }
    },
    mounted() {
        this.showCarousel = true
    }
}
</script>

<style lang="scss" scoped>
.service {
    opacity: 0.2 !important;
    background-color: transparent;
    border: 1px solid transparent;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    &__content {
        padding: 0 2rem;
        @media (min-width: 768px) {
            padding: 0;
        }
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    &__caption {
        margin-bottom: 3rem;
    }
    &__summary {
        margin-bottom: 3rem;
    }

    &.left-1,
    &.left-2,
    &.left-3 {
        cursor: e-resize;
    }
    &.right-1,
    &.right-2,
    &.right-3 {
        cursor: w-resize;
    }

    &.current {
        opacity: 1 !important;
        cursor: ew-resize;
    }
}
</style>
