<template>
    <HeaderView title="受取処理"></HeaderView>
    <RecieveCompornent></RecieveCompornent>
</template>

<script>
import HeaderView from '@/views/HeaderView.vue';
import RecieveCompornent from './Recieve/RecieveComponent.vue';

export default{
    data(){
        return{
        }
    },
    components:{
        HeaderView,
        RecieveCompornent
    },
    methods:{

    },
    created:function(){
        this.$store.commit('checkLogin');
    }
}
</script>