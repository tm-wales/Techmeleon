<template>
    <header class="project__header">
        <section class="project__section header">
            <img class="project__image" :src="data.feature">
            <div class="project__details">
                <h1 class="project__title">
                    <span>{{ data.name }}</span>
                </h1>

                <h2 class="project__info">
                    <div class="project__tags">
                        <div v-for="(tag, index) in data.tags" :key="index" class="project__tag">
                            <span>{{ tag }}</span>
                        </div>
                    </div>
                </h2>
            </div>
        </section>

        <section class="project__section inverse">
            <div class="project__section--flex">
                <div class="project__intro">
                    <div class="project__intro__title">
                        {{ data.intro.title }}
                    </div>
                    <div class="project__intro__text">
                        {{ data.intro.text }}
                    </div>
                </div>
                <div class="project__solutions">
                    <nuxt-link
                        v-for="(solution, index) in data.solutions"
                        :key="index"
                        class="project__solution"
                        :to="'/solutions/' + solution.toLowerCase().replace(' ','-')"
                        @click.native="changeColors()"
                    >
                        <span>{{ solution }}</span>
                    </nuxt-link>
                </div>

            </div>
            <div class="project__intro__image">
                <img :src="data.intro.image" :alt="data.name">
            </div>
        </section>
    </header>
</template>

<script>
export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    }
}
</script>
