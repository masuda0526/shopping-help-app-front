<template>
    <div v-if="this.$store.state.isLogin">
        <h2 class="">コミュニティーページ</h2>
        <CommunityList/>
        <SearchForm/>
    </div>
    <div v-else>コミュニティー情報へのアクセスにはログインが必要です。</div>
</template>

<script>
import CommunityList from './CommunityList.vue';
import SearchForm from './SearchForm.vue';

    export default{
        data:function(){
            return{

            }
        },
        components:{
            CommunityList,
            SearchForm
        }
    }
</script>