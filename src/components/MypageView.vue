<template>
    <HeaderView title="マイページ"></HeaderView>
    <MypageDUserTopComponent></MypageDUserTopComponent>
    <MypageDUserComListComponent></MypageDUserComListComponent>
</template>

<script>
import HeaderView from '@/views/HeaderView.vue';
import MypageDUserTopComponent from './Mypage/MypageDUserTopComponent.vue';
    export default{
        data(){
            return{
            }
        },
        components:{
            HeaderView,
            MypageDUserTopComponent,
        },
        created:function(){
            this.$store.commit('checkLogin');
        }

    }
</script>