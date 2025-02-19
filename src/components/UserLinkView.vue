<template>
    <HeaderView title="コード認証"></HeaderView>
    <UserLinkComponent></UserLinkComponent>
</template>

<script>
import HeaderView from '@/views/HeaderView.vue';
import UserLinkComponent from './UserLinkPage/userLinkComponent.vue';

export default{
    components:{
        HeaderView,
        UserLinkComponent
    }
}
</script>