<template>
    <section class="header">
        <Logo class="logo left" :x="x" :y="y" :activate-the-eye="true" />

        <div class="header__container">
            <div v-if="caption !== ''" class="header__caption u-line-highlight">
                <span>{{ caption }}</span>
            </div>

            <h1 class="header__title">
                <span>{{ title }}</span>
            </h1>
            <h2 class="header__summary">
                <span>{{ summary }}</span>
            </h2>
            <slot />
        </div>
        <div class="under-construction bottom">
            Our website is currently under construction while we prioritise clients.
        </div>
        <app-scroll-to v-show="next" :el="nextEl" />
    </section>
</template>

<script>
import Logo from '~/components/Logo'
export default {
    components: {
        Logo
    },
    props: {
        caption: {
            type: String,
            required: false,
            default: ''
        },
        title: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        next: {
            type: Boolean,
            required: false,
            default: true
        },
        nextEl: {
            type: String,
            required: false,
            default: '.next-section'
        }
    },
    data() {
        return {
            x: 0,
            y: 0
        }
    },
    mounted() {
        document.addEventListener('mousemove', this.coords)
        document.addEventListener('touchstart', this.coords)
        document.addEventListener('touchmove', this.coords)
        document.addEventListener('touchend', this.coords)
        document.addEventListener('scroll', this.coords)
    },
    destroyed() {
        document.removeEventListener('mousemove', this.coords)
        document.removeEventListener('touchstart', this.coords)
        document.removeEventListener('touchmove', this.coords)
        document.removeEventListener('touchend', this.coords)
        document.removeEventListener('scroll', this.coords)
    },
    methods: {
        coords(e) {
            if (e.type === 'mousemove') {
                if (!isNaN(e.clientX) && !isNaN(e.clientY)) {
                    this.x = e.clientX
                    this.y = e.clientY
                }
            }
            if (e.type === 'touchstart' || e.type === 'touchmove') {
                if (
                    !isNaN(e.touches[0].clientX) &&
                    !isNaN(e.touches[0].clientY)
                ) {
                    this.x = e.touches[0].clientX
                    this.y = e.touches[0].clientY
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.header {
    text-align: center;
    min-height: 100vh;
    position: relative;

    &__container {
        max-width: 60rem;
        width: 90%;
        display: inline-block;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 2rem;
    }

    &__title {
        font-size: 5rem;
        line-height: 4.5rem;
        margin-bottom: 2rem;
    }
    &__caption {
        margin-bottom: 3rem;
    }
    &__summary {
        margin-bottom: 2rem;
    }
}

// transitions
.logo.left {
    opacity: 0;
    transition: all 1s;
    transition-delay: 1.5s;
    transform: translate(-100%, 20%) rotate(-30deg) scale(0.5);
}

.header {
    &__caption {
        opacity: 0;
        transition: all 1s;
        transition-delay: 0.6s;
        transform: translateY(-20px);
    }
    &__title {
        opacity: 0;
        transition: all 1s;
        transition-delay: 0.3s;
        transform: translateY(20px);
    }
    &__summary {
        opacity: 0;
        transition: all 1s;
        transition-delay: 0.9s;
        transform: translateY(20px);
    }
}

.loaded {
    & .logo.left {
        opacity: 1;
        transform: translate(-40%, 0);
    }
    .header {
        &__caption {
            opacity: 1;
            transform: translateY(0);
        }
        &__title {
            opacity: 1;
            transform: translateY(0);
        }
        &__summary {
            opacity: 1;
            transform: translateY(0);
        }
    }
}
</style>
