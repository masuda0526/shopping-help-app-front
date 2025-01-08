<template>
    <HeaderView title="新規登録"></HeaderView>
    <SignUpComponent></SignUpComponent>
</template>

<script>
import HeaderView from '@/views/HeaderView.vue';
import SignUpComponent from './AuthMypage/SignUpComponent.vue';

    export default{
        components:{
            HeaderView,
            SignUpComponent,
        }
    }
</script>