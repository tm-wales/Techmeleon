<template>
    <div v-in-viewport.once="-100" class="projects">
        <nuxt-link
            v-for="(project,index) in featured"
            :key="index"
            :to="'projects/' + project.route"
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
                        Featured
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
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: mapGetters({
        featured: 'projects/front'
    })
}
</script>
<style lang="scss" scoped>
.projects {
    width: 100%;
    height: 100%;
    padding: 2rem;
    font-weight: bold;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;

    &__caption {
        position: relative;
        &:before {
            content: '';
            position: absolute;
            width: 4rem;
            height: 2px;
            top: -5px;
            background-color: white;
        }
    }

    &.in-viewport {
        & .project {
            opacity: 1;
            transform: translate(0, 0);
        }
    }
}
@for $i from 1 through 4 {
    .project:nth-child(#{$i}) {
        transition-delay: #{($i * 0.1)}s;
    }
}
.project {
    opacity: 0;
    transform: translate(0, 100px);
    transition: all 1s;

    &:nth-child(3),
    &:nth-child(4) {
        display: none;
    }
    &__container {
        position: relative;
        overflow: hidden;
        transition: all 0.5s;
        height: 100%;
        width: 100%;

        &:hover {
            box-shadow: 1px 1px 10px 2px rgb(153, 153, 153);
            transform: translateY(-3px);

            & .project__link {
                animation-name: arrowRight;
            }
        }
    }
    &__details {
        padding: 3rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
    &__title {
        font-size: 5rem;
        font-weight: bold;
        line-height: 5rem;
        max-width: 20rem;
        z-index: 10;
    }

    &__image {
        position: absolute;
        right: -5rem;
        top: 50%;
        transform: translateY(-50%);
        height: auto;
        width: 75%;
        z-index: 0;
    }

    &__summary {
        display: flex;
        justify-content: space-between;
        align-content: center;
        z-index: 10;
        font-family: 'Lato', 'Techmeleon';
    }

    &__link {
        animation-name: none;
        animation-duration: 2s;
        animation-timing-function: cubic-bezier(0.52, 0.01, 0.16, 1);
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
        font-size: 2rem;
        margin-top: 3px;
    }
}
</style>
