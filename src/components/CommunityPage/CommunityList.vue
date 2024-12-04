<template>
    <div class="row row-cols-2 justify-content-around">
        <CommunityItem  v-for="item in this.$store.state.communityList" :key="item.community_id" :item="item"/>
    </div>

</template>

<script>
import CommunityItem from './CommunityItem.vue';

    export default{
        data:()=>{
            return{
                
            }
        },
        components:{
            CommunityItem
        },
        computed:{
            // communities:function(){
            //     let returnList = [];
            //     // let comlist = this.$store.state.communityList;
            //     // for(let i in comlist){
            //     //     let tmpList = [];
            //     //     tmpList = comlist[i];
            //     //     returnList.push(tmpList);
            //     //     // console.log(tmpList);
            //     // }
            //     this.$store.state.communityList.forEach(cmnty => {
            //         returnList.push(cmnty);
            //     });
            //     console.log(returnList);
            //     return returnList;
            // }
        }
    }
</script>