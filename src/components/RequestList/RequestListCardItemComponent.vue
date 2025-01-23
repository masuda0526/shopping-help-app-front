<template>
    <div class="comCard-item">
        <div class="comCard-product setw">
            <p>{{ reqitem.product_name }}</p>
            <p>{{ returnVolAndUnit }}</p>
        </div>
        <!-- <button class="button button-blue" v-if="item.inCart" @click="toggleInCart">購入済</button>
        <button class="button button-yellow" v-else @click="toggleInCart">カートへ</button> -->
    </div>
</template>

<script>
export default{
    props:['reqitem'],
    computed:{
        returnVolAndUnit(){
            return this.reqitem.vol + this.reqitem.unit;
        }
    }
}
</script>

<style scoped>
.setw{
    width: 100%;
}
</style>