<template>
    <div class="app">
        <div class="wrapper">
            <div class="overlay">
                <router-view :gv="$v"/>
            </div>
        </div>
    </div>
</template>

<script>
    import { validationMixin } from 'vuelidate'
    import { required, helpers } from 'vuelidate/lib/validators'
    import { mapGetters } from 'vuex'
    const en = helpers.withParams({ type: 'en' }, function (value) {
        return !helpers.req(value) || /^([A-Za-z\-\s]+)$/g.test(value)
    })
    const cardNumber = helpers.regex('cardNumber', /^([0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4})$/)
    const period = helpers.regex('period', /^(0[1-9]|1[0-2])\s\/\s[0-9]{2}$/)
    const cvv = helpers.regex('cvv', /^([0-9]{3})$/)
    const ru = helpers.withParams({ type: 'ru' }, function (value) {
        return !helpers.req(value) || /^([А-Яа-яёЁ\-0-9\s]+)$/g.test(value)
    })
    const index = helpers.regex('index', /^([0-9]{6})$/)
    export default {
        mixins: [validationMixin],
        computed: {
            ...mapGetters([
                'formData',
                'cardData'
            ])
        },
        validations () {
            return {
                formData: {
                    fio: {
                        required,
                        ru
                    },
                    city: {
                        required,
                        ru
                    },
                    adress: {
                        required,
                        ru
                    },
                    country: {
                        required
                    },
                    index: {
                        required,
                        index
                    }
                },
                cardData: {
                    name: {
                        required,
                        en
                    },
                    cardNumber: {
                        required,
                        cardNumber
                    },
                    period: {
                        required,
                        period
                    },
                    cvv: {
                        required,
                        cvv
                    }
                },
                validationGroup: [
                    'formData',
                    'cardData'
                ]
            }
        }
    }
</script>

<style lang="scss">
    @import '@/assets/styles/styles.scss'
</style>
