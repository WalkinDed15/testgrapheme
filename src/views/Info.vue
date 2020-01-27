<template>
    <div class="info">
        <div class="window">
            <breadCrumbs />
            <div class="window__caption">Информация для доставки</div>
            <div class="window__label">Получатель</div>
            <inputComponent
                :validator="gv.formData.fio"
                fieldName="fio"
                placeholder="ФИО"
                v-model="fio"
            />
            <div class="window__label window__label_margin">Адрес</div>
            <inputComponent
                :validator="gv.formData.city"
                fieldName="city"
                placeholder="Город"
                v-model="city"
            />
            <inputComponent
                :validator="gv.formData.adress"
                fieldName="adress"
                placeholder="Адрес"
                v-model="adress"
            />
            <div class="window__row">
                <div class="window__col_left">
                    <inputComponent
                       :validator="gv.formData.country"
                        fieldName="country"
                        placeholder="Страна"
                        inputTag="select"
                        v-model="country"
                    >
                    <template #selectOptions>
                        <option value="" disabled selected>Страна</option>
                        <option v-for="(option, index) in selectOptions" :value="option.value" :key="index">{{ option.text }}</option>
                    </template>
                    </inputComponent>
                </div>
                <div class="window__col_right">
                    <inputComponent
                        :validator="gv.formData.index"
                        fieldName="index"
                        placeholder="Индекс"
                        mask="999999"
                        v-model="index"
                />
                </div>
            </div>
            <button class="window__button" :class="{ 'window__button_disabled' : this.gv.formData.$invalid }" type="button" @click="next()" :disabled="this.gv.formData.$invalid">
                Продолжить
            </button>
        </div>
    </div>
</template>

<script>
    import breadCrumbs from '@/components/breadCrumbs'
    import inputComponent from '@/components/inputComponent'
    import { validationMixin } from 'vuelidate'
    import { mapFields } from 'vuex-map-fields'
    export default {
        name: 'info',
        mixins: [validationMixin],
        props: ['gv'],
        data () {
            return {
                selectOptions: [
                    {
                        value: 'Russia',
                        text: 'Россия'
                    },
                    {
                        value: 'USA',
                        text: 'США'
                    },
                    {
                        value: 'France',
                        text: 'Франция'
                    }
                ]
            }
        },
        components: {
            breadCrumbs,
            inputComponent
        },
        computed: {
            ...mapFields([
                'formData.fio',
                'formData.city',
                'formData.adress',
                'formData.country',
                'formData.index'
            ])
        },
        methods: {
            next () {
                if (!this.gv.formData.$invalid) {
                    this.$router.push({ path: '/pay' })
                }
            }
        }
    }
</script>
