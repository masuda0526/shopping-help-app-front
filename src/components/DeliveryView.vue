<template>
    <HeaderView title="配達処理"></HeaderView>
    <DeliveryComponent></DeliveryComponent>
</template>

<script>
import HeaderView from '@/views/HeaderView.vue';
import DeliveryComponent from './Delivery/DeliveryComponent.vue';

export default{
    data(){
        return{
            request_user_id:0,
        }
    },
    components:{
        HeaderView,
        DeliveryComponent
    },
    methods:{

    },
    created:function(){
        this.$store.commit('checkLogin');
    }
}
</script>