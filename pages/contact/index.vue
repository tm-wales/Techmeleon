<template>
    <main class="page">
        <div class="page__top" />
        <div class="contact u-abs">
            <transition name="scan" mode="out-in">
                <section v-if="sectionNumber === 1" key="1" class="contact__section">
                    <h1 class="header__title" :class="{animate: animate}">
                        <span>Good {{ welcomeTimeMessage }}</span>
                    </h1>
                    <h2 class="header__summary" :class="{animate: animate}">
                        <span>How can we help you?</span>
                    </h2>
                    <a href="#" class="contact__section__link btn" @click.prevent="sectionNumber = 2">
                        Begin Project
                    </a>
                    <a href="#" class="contact__section__link btn right" @click.prevent="sectionNumber = 3">
                        Quick Chat
                    </a>
                </section>
                <section v-if="sectionNumber === 2" key="2" class="contact__section">
                    <a href="#" class="contact__section__back" @click.prevent="sectionNumber = 1">
                        <font-awesome-icon icon="undo-alt" />
                    </a>
                    <h1 class="header__title contact__title">
                        Begin Project
                    </h1>
                    <Contact-form class="contact__form" />
                </section>
                <section v-if="sectionNumber === 3" key="3" class="contact__section">
                    <a href="#" class="contact__section__back" @click.prevent="sectionNumber = 1">
                        <font-awesome-icon icon="undo-alt" />
                    </a>
                    <h1 class="header__title">
                        Quick Chat
                    </h1>
                    <h2 class="header__summary">
                        <span>Contact us directly.</span>
                    </h2>

                    <div class="contact__direct">
                        <div class="contact__email">
                            <a href="mailto:hello@techmeleon.co.uk">
                                <font-awesome-icon icon="envelope-open" />  hello@techmeleon.co.uk
                            </a>
                        </div>
                        <div class="contact__call">
                            <a href="tel: +448458050460">
                                <font-awesome-icon icon="mobile-alt" />  0845 805 0460
                            </a>
                        </div>
                    </div>
                </section>
            </transition>
        </div>
    </main>
</template>

<script>
import ContactForm from '~/components/contact/contact-form'
export default {
    components: {
        ContactForm
    },
    data() {
        return {
            welcomeTimeMessage: 'Morning',
            sectionNumber: 1,
            animate: true
        }
    },
    head() {
        const page = this.$store.getters['pages/page']('Contact')[0]
        return {
            titleTemplate: page.pageTitle,
            meta: page.meta
        }
    },
    beforeMount() {
        const now = new Date().getHours()

        if (now < 12) {
            this.welcomeTimeMessage = 'morning'
        }
        if (now >= 12) {
            this.welcomeTimeMessage = 'afternoon'
        }
        if (now >= 18) {
            this.welcomeTimeMessage = 'evening'
        }
    },
    mounted() {
        this.setTheme('dark')
        setTimeout(() => {
            this.animate = false
        }, 5000)
    }
}
</script>


<style lang="scss" scoped>
.contact {
    &__section {
        width: 90vw;
        max-width: 90rem;
        display: inline-block;
        text-align: center;
        font-size: 2rem;
        position: relative;

        &__link {
            display: inline-block;
            margin-top: 2rem;
        }

        &__back {
            display: block;
            padding-bottom: 1rem;
        }

        &:after {
            position: absolute;
            height: 200%;
            top: -50%;
            right: 0;
            content: '';
            z-index: 1;
            width: 0;
        }
    }

    &__call,
    &__email {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    &__form {
        margin-top: 4rem;
    }

    &__call {
        margin-top: 2rem;
    }

    &__email {
        margin-top: 0;
    }

    &__direct {
        margin-top: 2rem;
        margin-bottom: 0;
    }
}

// transitions
.header {
    &__title {
        line-height: 6.5rem;
        margin-bottom: 0;
    }

    &__title.animate,
    &__summary.animate {
        overflow: hidden;
        white-space: nowrap;
        margin: 0 auto;
        width: 0;
    }
}

.contact__section__link {
    opacity: 0;
    transition: all 0.7s;
    transition-delay: 1.9s;
    transform: translateX(-20px);

    &.right {
        transition-delay: 2s;
        transform: translateX(20px);
    }
}

.loaded {
    .header {
        &__title.animate {
            animation: typing 2s steps(40, end) forwards;
        }
        &__summary.animate {
            animation: typing 2s steps(40, end) forwards;
            animation-delay: 0.8s;
        }
    }

    .contact__section__link {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
