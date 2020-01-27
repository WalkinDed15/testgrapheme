import Vue from 'vue'
import Vuex from 'vuex'
import { getField, updateField } from 'vuex-map-fields'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        formData: {
            fio: null,
            city: null,
            adress: null,
            country: null,
            index: null
        },
        cardData: {
            name: null,
            cardNumber: null,
            period: null,
            cvv: null
        }
    },
    getters: {
        getField,
        formData (state) {
            return state.formData
        },
        cardData (state) {
            return state.cardData
        }
    },
    mutations: {
        updateField,
        clearData (state) {
            for (let key in state.formData) {
                state.formData[key] = null
            }
            for (let key in state.cardData) {
                state.cardData[key] = null
            }
        }
    },
    actions: {
        setFormData ({ commit }, payload) {
            commit('setFormData', payload)
        },
        payApi ({ commit }) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('done')
                }, 1000)
            }).then(() => {
                commit('clearData')
            })
        }
    },
    modules: {}
})
