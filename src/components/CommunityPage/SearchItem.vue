<template>
    <tr>
        <td>
            {{ cmnty.community_name }}
        </td>
        <td>
            <button v-if="!checkJoin">参加する</button>
            <span v-else>参加中</span>
        </td>
    </tr>
</template>

<script>

</script>

<script>
    import axios from 'axios';
    export default{
        data:function(){
            return{
                
            }
        },
        props:['cmnty', 'joinCommunityIDs'],
        methods:{
            joinCommunity(){
                axios.get(this.$store.state.BASE_URL + 'community/join', {
                    params:{
                        community_id:this.cmnty.community_id,
                        user_id:this.$store.state.userInfo.id
                    }
                }).then(res => {
                    if(res.data){
                        console.log("joinOK");
                    }else{
                        console.log("joinNG");
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        computed:{
            checkJoin(){
                let result = false;
                this.joinCommunityIDs.forEach(id => {
                    if(id == this.cmnty.id){
                        result = true;
                    }
                });
                return result;
            }
        },
    }
</script>