const state = () => {
    return {
        colors: {
            bgColor: '#d3b300',
            color: '#FFFFFF'
        },
        defaultColors: {
            bgColor: '#141414',
            color: '#e6eeed'
        },
        theme: 'dark'
    }
}

const mutations = {
    setSolutions(state, solutions) {
        state.solutions.list = solutions
    },
    setProjects(state, projects) {
        state.projects.list = projects
    },
    setPages(state, pages) {
        state.pages.list = pages
    },
    setPolicies(state, policies) {
        state.policies.list = policies
    },
    setBoomColor(state, colors) {
        state.colors = colors
    },
    setTheme(state, theme) {
        state.theme = theme
    }
}

const actions = {
    nuxtServerInit(vuexContext, context) {
        vuexContext.commit('setBoomColor', vuexContext.state.defaultColors)
        const url = 'https://techmeleon-website.firebaseio.com/'

        const getSolutions = () => {
            return context.$axios
                .$get(url + 'solutions.json')
                .then(data => {
                    vuexContext.commit('setSolutions', data)
                })
                .catch(e => {
                    context.error('nuxtServerInit -> getSolutions - >' + e)
                })
        }
        const getProjects = () => {
            return context.$axios
                .$get(url + 'projects.json')
                .then(data => {
                    vuexContext.commit('setProjects', data)
                })
                .catch(e => {
                    context.error('nuxtServerInit -> getProjects -> ' + e)
                })
        }
        const getPages = () => {
            return context.$axios
                .$get(url + 'pages.json')
                .then(data => {
                    vuexContext.commit('setPages', data)
                })
                .catch(e => {
                    context.error('nuxtServerInit -> getPages -> ' + e)
                })
        }
        const getPolicies = () => {
            return context.$axios
                .$get(url + 'policies.json')
                .then(data => {
                    vuexContext.commit('setPolicies', data)
                })
                .catch(e => {
                    context.error('nuxtServerInit -> getPolicies -> ' + e)
                })
        }

        return Promise.all([
            getSolutions(),
            getProjects(),
            getPages(),
            getPolicies()
        ])
    },
    updateBoomColor(vuexContext, colors) {
        vuexContext.commit('setBoomColor', colors)
    },
    updateTheme(vuexContext, theme) {
        vuexContext.commit('setTheme', theme)
    }
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}
