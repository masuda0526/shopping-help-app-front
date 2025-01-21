<template>
    <div class="box">
        <button class="button button-green">みんなの購入リスト</button>
        <button class="button button-red" @click="goShopping">買い物する</button>
    </div>
</template>

<script>
import router from '@/router';

export default{
    data:function(){
        return {
            
        }
    },
    methods:{
        goShopping(){
            router.push({name:'shopping'});
        }
    }
    
}
</script>

<style scoped>
.box{
    text-align: center;
    padding: 30px 0;
}
button{
    margin-bottom: 42px;
}
</style>