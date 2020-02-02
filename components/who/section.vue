<template>
    <div class="who__section">
        <div class="who__details">
            <h3 class="who__title u-line-highlight-left">
                <span>{{ data.title }}</span>
            </h3>
            <h4 class="who__tag">
                <span> {{ data.tag }} </span>
            </h4>
            <div class="who__content" v-html="data.content" /> <!-- eslint-disable-line -->
        </div>

        <div class="who__images" :class="{animate: data.images.length > 1}">
            <img
                v-for="(image, index) in data.images"
                :key="index"
                :src="image.src"
                :alt="image.alt"
                class="who__image"
                :data-image="index"
            >
        </div>
        <app-scroll-to :el="next" />
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        next: {
            type: String,
            required: true
        }
    }
}
</script>
