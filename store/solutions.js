const state = () => ({
    list: []
})

const mutations = {}

const actions = {}

const getters = {
    solution: state => {
        return keyword =>
            state.list.filter(item => {
                return item.route === keyword
            })
    },
    all(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
