<template>
    <HeaderView title="未対応一覧"></HeaderView>
    <RequiredActionComponent></RequiredActionComponent> 
</template>

<script>
import HeaderView from '@/views/HeaderView.vue';
import RequiredActionComponent from './RequiredAction/RequiredActionComponent.vue';

    export default{
        components:{
            RequiredActionComponent,
            HeaderView
        }
    }
</script>