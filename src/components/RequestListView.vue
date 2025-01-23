<template>
    <HeaderView title="みんなの買い物リスト"></HeaderView>
    <RequestListComponent></RequestListComponent>
</template>

<script>
import HeaderView from '@/views/HeaderView.vue';
import RequestListComponent from './RequestList/RequestListComponent.vue';

export default{
    data(){
        return{

        }
    },
    components:{
        HeaderView,
        RequestListComponent
    },
    created:function(){
        this.$store.commit('checkLogin');
    }
}
</script>