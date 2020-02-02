const state = () => ({
    list: []
})

const mutations = {}

const actions = {}

const getters = {
    page(state) {
        return keyword =>
            state.list.filter(item => {
                return item.name === keyword
            })
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}
