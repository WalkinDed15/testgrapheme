<template>
    <div class="breadCrumbs">
        <div class="breadCrumbs__row">
            <router-link to="/" class="breadCrumbs__item" exact-active-class="breadCrumbs__item_active">Доставка</router-link>
            <router-link to="/pay" class="breadCrumbs__item" exact-active-class="breadCrumbs__item_active">Оплата</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'breadCrumbs'
}
</script>

<style lang="scss">

</style>
