<template>
    <a
        href="#"
        class="next-section"
        @click.prevent="scrollTo"
    >
        <div class="arrow__wrap" :class="{invert: invert}">
            <div class="arrow" :class="{invert: invert}" />
        </div>
    </a>
</template>

<script>
export default {
    props: {
        el: {
            type: String,
            required: true
        },
        invert: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        scrollTo() {
            this.$scrollTo(this.el, 1200)
        }
    }
}
</script>

<style lang="scss" scoped>
.next-section {
    position: absolute;
    bottom: 5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 4rem;
    height: 4rem;
    z-index: 40;
    cursor: pointer;
}

.arrow {
    &__wrap {
        display: block;
        position: relative;
        height: 100%;
        width: 100%;
        animation-name: arrowDown;
        animation-duration: 2s;
        animation-timing-function: cubic-bezier(0.52, 0.01, 0.16, 1);
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
        will-change: transform;

        &.invert {
            animation-name: arrowUp;
        }
    }

    height: 75%;
    width: 75%;
    margin: auto;
    will-change: transform;
    overflow: hidden;
    margin-top: 50%;
    position: relative;

    &.invert {
        transform: rotate(180deg);
        transform-origin: 50% 50%;
        margin-top: 0;
    }
    &:before,
    &:after {
        position: absolute;
        content: '';
        top: 0;
        height: 2px;
        width: 50%;
        transform-origin: 50% 100%;
        z-index: 40;
    }

    &:before {
        left: 0;
        transform: skewY(23deg);
    }
    &:after {
        right: 0;
        transform: skewY(-23deg);
    }
}
</style>
