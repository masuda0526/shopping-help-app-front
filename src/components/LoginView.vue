<template>
    <HeaderView title="ログイン"></HeaderView>
    <LoginComponent />
</template>

<script>
import LoginComponent from './AuthMypage/LoginComponent.vue';
import HeaderView from '@/views/HeaderView.vue';

export default{
    components:{
        HeaderView,
        LoginComponent
    }
}

</script>