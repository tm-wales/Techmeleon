<template>
    <div class="boom__container">
        <div class="boom" :style="{ backgroundColor: getBoomColor.bgColor, color: getBoomColor.color }" />
        <div class="loader">
            <div class="loader__container">
                <svg class="loader__circle" viewBox="25 25 50 50">
                    <circle
                        class="loader__path"
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        stroke="#70c542"
                        stroke-width="0.5"
                    />
                </svg>
            </div>
        </div>
        <img class="boom__logo" src="~/assets/logo/logo-outline.svg">
    </div>
</template>

<script>
export default {
    computed: {
        getBoomColor() {
            return this.$store.state.colors
        }
    }
}
</script>
