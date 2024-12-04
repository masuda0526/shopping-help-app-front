<template>
    <div>
        <div v-if="!this.isSearchMode" class="" @click="toggleSearch">
            <fa icon="magnifying-glass-plus" />コミュニティーを検索
        </div>
        <div v-else>
            <div class="mb-3">
                <fa icon="magnifying-glass" />
                <input type="text" name="searchText" id="" v-model="searchText">
            </div>
            <div>
                <table class="table">
                    <tr>
                        <th>コミュニティー</th>
                        <th>参加状況</th>
                    </tr>
                    <SearchItem v-for="cmnty in searchResultList" :key="cmnty.id" :cmnty="cmnty" :joinCommunityIDs="this.joinCommunityIDs"/>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import SearchItem from './SearchItem.vue';

    export default{
        data:function(){
            return{
                searchText:'',
                isSearchMode:false,
                joinCommunityIDs:[],
            }
        },
        components:{
            SearchItem
        },
        methods:{
            toggleSearch(){
                this.isSearchMode = !this.isSearchMode;
            },
            checkCommunity(){
                this.$store.state.communityList.forEach(c => {
                    this.joinCommunityIDs[this.joinCommunityIDs.length] = c.community_id;
                })
            },
        },
        computed:{
            searchResultList(){
                let returnList = [];
                if(this.searchText){
                    let expStr = ".*" + this.searchText + ".*";
                    let regexp = new RegExp(expStr);
                    this.$store.state.allCommunityList.forEach(cmnty => {
                        if(regexp.test(cmnty.community_name)){
                            returnList.push(cmnty);
                        }
                    });
                }else{
                    returnList = this.$store.state.allCommunityList;
                }
                return returnList;
            },
        },
        mounted:function(){
            // this.$store.state.communityList.forEach(c => {
            //     this.joinCommunityIDs[this.joinCommunityIDs.length] = c.community_id;
            // })
            this.checkCommunity();
        }
    }
</script>
