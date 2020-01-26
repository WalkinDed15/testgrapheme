import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        formData: {
        },
        validMap: {
            info: false
        }
    },
    getters: {
        formData (state) {
            return state.formData
        }
    },
    mutations: {
        setFormData (state, payload) {
            for (let key in payload) {
                Vue.set(state.formData, key, payload[key])
                state.validMap.info = true
            }
        }
    },
    actions: {
        setFormData ({ commit }, payload) {
            commit('setFormData', payload)
        },
        payApi () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('done')
                }, 1000)
            })
        }
    },
    modules: {}
})
