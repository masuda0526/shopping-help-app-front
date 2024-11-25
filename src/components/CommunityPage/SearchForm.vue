<template>
    <div>
        <div v-if="!this.isSearchMode">
            <fa icon="magnifying-glass-plus" @click="toggleSearch"/>
        </div>
        <div v-else>
            <div>
                <fa icon="magnifying-glass" />
                <input type="text" name="searchText" id="" v-model="searchText">
            </div>
            <div>
                <table>
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
            this.$store.state.communityList.forEach(c => {
                console.log(c.community_id);
                this.joinCommunityIDs[this.joinCommunityIDs.length] = c.community_id;
            })
            console.log(this.joinCommunityIDs);
        }
    }
</script>
