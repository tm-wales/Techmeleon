<template>
    <main class="page page__home" @mousemove="coords">
        <div class="page__top" />
        <header
            id="header"
            class="header"
            :class="{out: waypoint > 0}"
        >
            <div class="header__container u-relative">
                <section class="hero">
                    <div class="hero__logo" :class="{in: waypoint === 0 }">
                        <Logo class="logo" :x="x" :y="y" :activate-the-eye="true" :style="{transform: 'rotate(' + logoRotate + ')'}" />
                    </div>
                    <h1 :class="{in: waypoint === 0 }" class="hero__title">
                        <Techmeleon class="header__big" />
                    </h1>
                    <h2 :class="{in: waypoint === 0 }" class="hero__statement" v-html="pageData.content.subHeader" /> <!-- eslint-disable-line -->
                </section>

                <div class="under-construction bottom">
                    Our website is currently under construction while we prioritise clients.
                </div>
                <app-scroll-to el=".services" />
            </div>
        </header>
        <section class="services">
            <Logo
                :x="x"
                :y="y"
                :activate-the-eye="true"
                class="logo left"
                :class="{in: waypoint === 1 }"
            />
            <div
                class="services__container"
            >
                <Solutions />
            </div>
            <app-scroll-to el=".featured" />
        </section>
        <section class="featured">
            <Featured />
        </section>

        <app-footer class="next-page" :next-page="{title: 'Solutions', link: '/solutions'}" />
    </main>
</template>

<script>
import Logo from '~/components/Logo'
import Techmeleon from '~/components/Techmeleon'
import Solutions from '~/components/solutions/solutions'
import Featured from '~/components/projects/featured'

export default {
    components: {
        Logo,
        Techmeleon,
        Solutions,
        Featured
    },
    data() {
        return {
            x: 0,
            y: 0,
            scrollY: 0,
            scrollHeight: 0,
            waypoint: -1,
            intersectionOptions: {
                root: null,
                rootMargin: '20px 0px 0px 0px',
                threshold: [0.5] // [0.25, 0.75] if you want a 25% offset!
            } // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
        }
    },
    head() {
        const page = this.pageData
        return {
            titleTemplate: page.pageTitle,
            meta: page.meta
        }
    },
    computed: {
        pageData() {
            return this.$store.getters['pages/page']('Landing')[0]
        },
        logoRotate() {
            return (
                Math.min(this.scrollY / (this.scrollHeight * 0.4) * 300, 300) + //eslint-disable-line
                'deg'
            )
        }
    },
    mounted() {
        this.setTheme('dark')
        document.addEventListener('mousemove', this.coords)
        document.addEventListener('touchstart', this.coords)
        document.addEventListener('touchmove', this.coords)
        window.addEventListener('scroll', this.handleScroll)
        setTimeout(() => {
            this.handleScroll()
        }, 300)
    },
    destroyed() {
        document.removeEventListener('mousemove', this.coords)
        document.removeEventListener('touchstart', this.coords)
        document.removeEventListener('touchmove', this.coords)
        window.removeEventListener('scroll', this.handleScroll)
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
        },
        handleScroll() {
            this.scrollY = window.scrollY
            this.scrollHeight = document.getElementById('header').clientHeight

            if (this.scrollY <= this.scrollHeight * 0.4) {
                this.waypoint = 0
            } else {
                this.waypoint = 1
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/abstracts/_mixins.scss';

.header {
    top: 0;
    left: 0;
    position: fixed;
    overflow: hidden;
    height: 100vh;
    width: 100%;
    z-index: 3;
    transition: all 1s;
    opacity: 1;
    visibility: visible;

    &__container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    &.out {
        opacity: 0;
        transform-origin: 50% 0;
        transform: scale(0.8);
        visibility: hidden;
    }
}

.hero {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    letter-spacing: 1px;
    width: 30rem;

    @include respond('ipad') {
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 50rem;
    }

    &__logo {
        width: 15rem;
        height: 22rem;
        margin: 0 auto;
        position: relative;
        transition: all 1s;
        transition-delay: 0.5s;
        opacity: 0;
        transform: scale(1.2);
        perspective: 1000px;

        @include respond('ipadPro') {
            width: 20rem;
        }

        &.in {
            opacity: 1;
            transform: scale(1);
        }
    }

    &__title {
        transition: all 1s;
        transition-delay: 0.9s;
        opacity: 0;
        transform: translateY(20px);
        &.in {
            opacity: 1;
            transform: translateY(0);
        }
    }

    &__statement {
        transition: all 1s;
        transition-delay: 1.1s;
        opacity: 0;
        transform: translateY(20px);
        &.in {
            opacity: 1;
            transform: translateY(0);
        }
    }
}

.services {
    position: relative;
    overflow: hidden;
    height: 100vh;
    margin-top: 100vh;
    z-index: 2;
}

.featured {
    position: relative;
    overflow: hidden;
    height: 100vh;
    z-index: 2;
}

.services__container {
    width: 100%;
    max-width: 120rem;
    display: inline-block;
    text-align: center;
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;

    @include respond('Galaxy') {
        top: 50%;
    }

    @include respond('400') {
        width: 90%;
    }
}

.logo.left {
    opacity: 0;
    transition: all 1s;
    transition-delay: 0.5s;
    transform: translate(-100%, 20%) rotate(-30deg) scale(0.2);

    &.in {
        opacity: 1;
        transform: translate(-40%, 0);
    }
}

.next-page {
    z-index: 2;
}

.wp-trigger {
    position: absolute;
    top: 0;
    left: 0;
    width: 10%;
    height: 2rem;
    background: transparent;
}
</style>
