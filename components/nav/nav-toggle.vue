<template>
    <div
        class="nav__toggle"
        role="button"
        :class="{open: open}"
        @click="$emit('toggle')"
    >
        <div class="nav__toggle__bars" />
    </div>
</template>
<script>
export default {
    props: {
        open: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.nav__toggle {
    z-index: 999;
    justify-self: flex-end;
    cursor: pointer;
    $height: 50px;
    $width: 50px;
    $menuHeight: $height * 0.4;

    height: $height;
    width: $width;

    &__bars {
        position: relative;
        display: inline-block;
        height: 100%;
        width: 100%;

        &::before,
        &::after {
            content: '';
            position: absolute;
            transition: all 0.2s;
            display: inline-block;
            height: 2px;
            width: 50%;
            left: 25%;
        }

        &::before {
            top: 0;
            transform: translateY($menuHeight);
        }

        &::after {
            width: 45%;
            bottom: 0;
            transform: translateY(-$menuHeight);
        }
    }

    &.open {
        & .nav__toggle__bars {
            &::before {
                transform: translateY($menuHeight + 4px) rotate(-45deg);
            }

            &::after {
                width: 50%;
                transform: translateY(-($menuHeight + 4px)) rotate(45deg);
            }
        }
    }
}
</style>
