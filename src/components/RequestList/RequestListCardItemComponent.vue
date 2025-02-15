<template>
    <div class="comCard-item">
        <div class="comCard-product setw">
            <p>{{ reqitem.product_name }}</p>
            <p>{{ returnVolAndUnit }}</p>
        </div>
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