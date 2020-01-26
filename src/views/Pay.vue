<template>
    <div class="pay">
        <div class="window">
            <breadCrumbs />
            <div class="window__caption">Оплата</div>
            <div class="window__label">Имя на карте</div>
            <inputComponent
                :validator="gv.cardData.name"
                fieldName="name"
                placeholder="Konstantin Ivanov"
                v-model="cardData.name"
            />
            <div class="window__label window__label_margin">Номер карты</div>
            <inputComponent
                :validator="gv.cardData.cardNumber"
                fieldName="cardNumber"
                placeholder="XXXX XXXX XXXX XXXX XXXX"
                mask="9999 9999 9999 9999 9999"
                v-model="cardData.cardNumber"
            />
            <div class="window__row window__row_margin">
                <div class="window__col_left">
                    <div class="window__label">Срок</div>
                    <inputComponent
                        :validator="gv.cardData.period"
                        fieldName="period"
                        placeholder="MM / YY"
                        mask="99 / 99"
                        v-model="cardData.period"
                    />
                </div>
                <div class="window__col_right">
                    <div class="window__label">Срок</div>
                    <inputComponent
                        :validator="gv.cardData.cvv"
                        fieldName="cvv"
                        placeholder="CVV"
                        mask="999"
                        v-model="cardData.cvv"
                    />
                </div>
            </div>
            <button class="window__button" :class="{ 'window__button_disabled' : this.gv.$invalid }" type="button" @click="send()">
                Оплатить
            </button>
            <div class="window__overlay" v-if="loading">
                <div class="window__loader"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import breadCrumbs from '@/components/breadCrumbs'
    import inputComponent from '@/components/inputComponent'
    import { validationMixin } from 'vuelidate'
    import { mapActions } from 'vuex'
    export default {
        name: 'pay',
        mixins: [validationMixin],
        props: ['gv'],
        data () {
            return {
                cardData: {
                    name: null,
                    cardNumber: null,
                    period: null,
                    cvv: null
                },
                loading: false

            }
        },
        components: {
            breadCrumbs,
            inputComponent
        },
        methods: {
            ...mapActions([
                'payApi'
            ]),
            async send () {
                if (!this.gv.$invalid) {
                    this.loading = true
                    await this.payApi(this.cardData)
                    this.loading = false
                    this.$router.push({ path: '/finish' })
                }
            }
        }
    }
</script>
