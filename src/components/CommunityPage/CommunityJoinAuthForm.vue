<template>
    <div>
        <div v-if="!joinStatus && !joinMode">
            <button  class="btn btn-link" @click="toggleJoinMode">参加する</button>
            <span v-if="isJoinErr" class="text-danger">{{ errMsg }}</span>
        </div >
        <div v-else-if="!joinStatus && joinMode">
            認証コード入力 <fa icon="circle-xmark" @click="toggleJoinMode"/><br>
            <input type="text" v-model="authCode">
            <button class="btn btn-primary" @click="joinCommunity">認証</button>
        </div>
        <span v-else class="text-secondary">参加中</span>
    </div>
</template>

<script>
    import axios from 'axios';
    export default{
        data:function(){
            return{
                authCode:'',
                joinMode:false,
                isJoinErr:false,
                errMsg:'認証失敗'
            }
        },
        props:['community_id','com_auth_id'],
        methods:{
            toggleJoinMode:function(){
                this.joinMode = !this.joinMode;
            },
            joinCommunity:function(){
                this.$store.commit('debug', 'コミュニティー参加処理開始');
                this.$store.commit('debug', '＜登録情報＞');
                this.$store.commit('debug', 'community_id = ' + this.community_id);
                this.$store.commit('debug', 'user_id = ' + this.$store.state.userInfo.id);
                this.$store.commit('debug', '＜登録情報＞（ここまで）');
                if(this.authCodeValid()){
                    axios.get(this.$store.state.BASE_URL + 'community/join', {
                        params:{
                            community_id:this.community_id,
                            user_id:this.$store.state.userInfo.id
                        }
                    }).then(res => {
                        if(res.data){
                            this.$store.commit('debug', '参加処理成功');
                            this.$store.commit('getCommunityList');
                        }else{
                            this.$store.commit('debug', '参加処理失敗');
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
                this.joinMode = false;
                this.$store.commit('debug', 'コミュニティー参加処理終了');
            },
            authCodeValid(){
                this.$store.commit('debug', 'バリデーション開始');
                let result = false;
                this.isJoinErr = false;
                if(this.authCode === this.com_auth_id){
                    this.$store.commit('debug','バリデーションOK');
                    result = true;
                }else{
                    this.$store.commit('debug','バリデーションNG');
                    this.isJoinErr = true;
                }
                return result;
            }
        },
        computed:{
            joinStatus(){
                return this.$store.state.joinCommunityIds.includes(this.community_id);
            }
        }
    }
</script>