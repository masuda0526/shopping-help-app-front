<template>
    <HeaderView title="最終確認"></HeaderView>
    <ConfilmComponent :isDelUsr="true"></ConfilmComponent>
</template>

<script>
import HeaderView from '@/views/HeaderView.vue';
import ConfilmComponent from './Confilm/ConfilmComponent.vue';

export default{
    components:{
        HeaderView,
        ConfilmComponent
    }
}
</script>