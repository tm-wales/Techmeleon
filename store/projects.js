const state = () => ({
    list: []
})

const mutations = {}

const actions = {}

const getters = {
    project: state => {
        return keyword =>
            state.list.filter(item => {
                return item.route === keyword
            })
    },
    front(state) {
        return state.list.filter(item => {
            return item.category === 'Featured'
        })
    },
    allProjects(state) {
        return state.list
    },
    projectsBySolution: state => {
        return keyword =>
            state.list.filter(item => {
                return item.solutions.indexOf(keyword) >= 0
            })
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
