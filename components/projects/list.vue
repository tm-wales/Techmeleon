<template>
    <div v-in-viewport.once="-100" class="projects">
        <section
            v-for="(solution, sIndex) in solutions"
            :key="sIndex"
            class="projects__solution"
        >
            <div class="projects__solution__name">
                {{ solution.name }}
            </div>
            <div class="projects__grid">
                <div class="project">
                    <div class="project__container notice">
                        <span>Be our <b>first</b> feature and get 10% discount</span>
                    </div>
                </div>
                <nuxt-link
                    v-for="(project,index) in projectsBySolution(solution.name)"
                    :key="index"
                    :to="'/projects/' + project.route"
                    class="project"
                    @click.native="changeColors(project.colors)"
                >
                    <div
                        class="project__container"
                        :style="{ backgroundColor: project.colors.bgColor, color: project.colors.color }"
                    >
                        <img class="project__image" :src="project.feature">
                        <div class="project__details">
                            <div class="projects__caption">
                                {{ project.category }}
                            </div>
                            <div class="project__title">
                                <span>{{ project.name }}</span>
                            </div>
                            <div class="project__summary">
                                <span>{{ project.summary }}</span>
                                <font-awesome-icon class="project__link" icon="long-arrow-alt-right" />
                            </div>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </section>

    </div>
</template>

<script>
export default {
    computed: {
        solutions() {
            return this.$store.getters['solutions/all']
        }
    },
    methods: {
        projectsBySolution(solution) {
            return this.$store.getters['projects/projectsBySolution'](solution)
        }
    }
}
</script>
