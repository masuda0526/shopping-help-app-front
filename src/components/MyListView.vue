<template>
    <HeaderView title="買い物リスト"></HeaderView>
    <p>作成中</p>
	<MyList />
</template>

<script>
import MyList from './RequestPage/MyList.vue';
import HeaderView from '@/views/HeaderView.vue';

    export default{
        components:{
            HeaderView,
            MyList
        }

    }
</script>