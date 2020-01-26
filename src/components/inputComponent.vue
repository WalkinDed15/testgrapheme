<template>
    <div class="input-component">
        <div class="input-component__wr" v-if="inputTag === 'input'">
            <input :id="this.fieldName"
                :name="this.fieldName"
                type="text"
                class="input-component__input"
                :class="classListInput"
                v-model.trim="modifiedInputValue"
                :placeholder="placeholder"
                ref="input"
                >
        </div>
        <div class="input-component__wr" v-if="inputTag === 'select'">
            <div class="select-wr">
                <select :name="this.fieldName" :id="this.fieldName" class="input-component__select"
                :class="classListInput" v-model="modifiedInputValue">
                    <slot name="selectOptions"></slot>
                </select>
                <img src="../assets/img/selectArrow.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import Inputmask from 'inputmask'
export default {
    props: {
        validator: {
            type: Object,
            default: () => {
                return {}
            }
        },
        value: {
            type: [String, Number],
            default: ''
        },
        mask: {
            type: String,
            default: ''
        },
        fieldName: {
            type: String,
            default: 'default',
            required: true
        },
        inputTag: {
            type: String,
            default: 'input'
        },
        placeholder: {
            type: String
        },
        replaceCharactersRexExp: {
            type: RegExp
        }
    },
    data () {
        return {
            inputValue: this.value ? this.value : '',
            activated: !!this.value
        }
    },
    mounted () {
        if (this.mask) {
            let im = new Inputmask(`${this.mask}`)
            im.mask(this.$refs.input)
        }
    },
    computed: {
        modifiedInputValue: {
            get () {
                return this.inputValue
            },
            set (value) {
                let setValue = value
                setValue = this.replaceCharactersRexExp ? setValue.replace(this.replaceCharactersRexExp, '') : setValue
                this.inputValue = setValue
                if (this.validator.hasOwnProperty('$touch') && setValue) {
                    this.validator.$touch()
                }
                this.$forceUpdate()
            }
        },
        isValid () {
            return !this.validator.$invalid
        },
        classListInput () {
            let obj = {}
            obj[`input-component__${this.inputTag}_valid`] = this.activated && this.isValid
            obj[`input-component__${this.inputTag}_invalid`] = this.activated && !this.isValid
            return obj
        }
    },
    watch: {
        inputValue () {
            this.activated = true
            this.$emit('input', this.inputValue)
        },
        value () {
            this.inputValue = this.value
        }
    }
}
</script>

<style scoped lang="scss">
    .input-component {
        margin: 10px 0;
        &__input {
            background: #FFFFFF;
            border: 1px solid #DEDCDC;
            box-sizing: border-box;
            border-radius: 5px;
            width: 100%;
            height: 40px;
            padding: 11px 15px;
            outline: none;
            color: #6B6B6B;
            font-size: 16px;
            line-height: 1.2;
            &_invalid {
                border: 1px solid #FFADAD;
            }
            &_valid {
                border: 1px solid rgba(25, 165, 39, 0.8);
            }
        }
        &__select {
            padding: 10px 15px;
            background: #ffffff;
            outline: 0;
            border: 0;
            width: 100%;
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
            color: #6B6B6B;
            font-weight: normal;
            height: 40px;
            font-size: 16px;
            line-height: 1.2;
            border: 1px solid #DEDCDC;
            border-radius: 5px;
            cursor: pointer;

            &:focus {
                outline: 0;
            }
            &_valid {
                border: 1px solid rgba(25, 165, 39, 0.8);
            }
            &_invalid {
                border: 1px solid #FFADAD;
            }
        }
    }
    .select-wr {
    * {
        box-sizing: border-box;
    }
    width: 100%;
    position: relative;

    img {
        max-width: 16px;
        position: absolute;
        right: 15px;
        top: 55%;
        transform: translate(0, -50%);
        pointer-events: none;
        z-index: 2;
        width: 16px;
    }
}
</style>
