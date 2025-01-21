<template>
    <HeaderView title="買い物用画面"></HeaderView>
    <ShoppingComListComponent></ShoppingComListComponent>
</template>

<script>
import HeaderView from '@/views/HeaderView.vue';
import ShoppingComListComponent from './Shopping/ShoppingComListComponent.vue';

export default{
    components:{
        ShoppingComListComponent,
        HeaderView
    },
    created:function(){
        this.$store.commit('checkLogin');
    }
}
</script>