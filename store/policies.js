const state = () => ({
    list: []
})

const mutations = {}

const actions = {}

const getters = {
    policy(state) {
        return keyword =>
            state.list.filter(item => {
                return item.route === keyword
            })
    },
    policies(state) {
        return state.list
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
