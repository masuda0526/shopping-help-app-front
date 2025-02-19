<template>
    <div class="error" v-if="this.isErr">
        <p v-for="msg,index in this.errMsg" :key="index">{{msg}}</p>
    </div>
    <div v-if="this.viewFlg === 0">
        <p>相手から教えてもらった６桁の認証コードを入力してください</p>
        <div class="inputArea">
            <input type="text" name="linkPass" id="linkPass" placeholder="012345" v-model="linkPass">
            <button class="button button-red" @click="getUserName()">認証する</button>
        </div>
    </div>
    <div v-if="this.viewFlg === 1">
        <p>{{ partnerName }}さんと買い物リストを共有しますか？</p>
        <div class="inputArea">
            <button class="button button-blue" @click="this.registUserLink()">共有する</button>
        </div>
    </div>
    <div v-if="this.viewFlg === 2">
        <p>認証コードを認証しました。</p>
        <p>相手も認証コードを入力することで、相互に買い物リストの確認が可能になります。</p>
        <p>相手の買い物リストが表示されない場合は、相手の認証コードの入力をお待ちください。</p>
        <div class="inputArea">
            <button class="button button-green" @click="this.goMypage()">マイページへ</button>
        </div>
    </div>

</template>

<script>
import router from '@/router';
import axios from 'axios';

export default{
    data(){
        return{
            isErr:false,
            errMsg:[],
            linkPass : "",
            partnerName:'test',
            partnerId:0,
            // 0:初期表示, 1:名前確認画面, 2:完了画面
            viewFlg:0,
            LINK_PASS_LEN:6
        }
    },
    methods:{
        validLinkPass(){
            this.$store.commit('debug', '認証コードのバリデーションを開始します。')
            // 初期化
            this.errMsg = [];
            this.isErr = false;
            // 入力チェック
            if(this.linkPass == ""){
                this.$store.commit('debug', '必須チェックエラー')
                this.errMsg.push('認証コードを入力してください。')
                this.isErr = true;
                return false;
            }
            // 桁数チェック
            if(this.linkPass.length != this.LINK_PASS_LEN){
                this.errMsg.push(`認証コードは${this.LINK_PASS_LEN}桁で入力してください`);
                this.$store.commit('debug', '桁数エラー')
                this.isErr = true;
                return false;
            }
            let exp = new RegExp('[0-9]{6}');
            if(!exp.test(this.linkPass)){
                this.errMsg.push('認証コードは半角数字で入力してください');
                this.$store.commit('debug', '入力文字エラー')
                this.isErr = true;
                return false;
            }
            this.$store.commit('debug', 'バリデーションOK');
            return true;
        },
        getUserName(){
            if(this.validLinkPass()){
                this.$store.commit('debug', '認証コードからユーザー名を取得します')
                this.$store.commit('debug', '認証コード : ' + this.linkPass)
                axios.get(this.$store.state.BASE_URL + 'userlink/getname',{
                    params:{
                        lp:this.linkPass.toString()
                    }
                }).then(res => {
                    this.$store.commit('debug', '取得完了');
                    this.partnerName = res.data;
                    if(this.partnerName ==''){
                        this.$store.commit('debug','該当ユーザーなし');
                        this.errMsg.push('認証コードを確認してください。');
                        this.isErr = true;
                        return ;
                    }
                    this.viewFlg = 1;
                    this.$store.commit('debug','画面遷移');
                }).catch(err => {
                    this.$store.commit('debug', '取得失敗');
                    this.$store.commit('debug', err)
                })
            }
        },
        registUserLink(){
            this.$store.commit('debug', '認証コードからユーザー情報を共有します。');
            this.$store.commit('debug', '登録情報');
            this.$store.commit('debug', 'linkpass : ' + this.linkPass + '  user_id : ' + this.$store.state.userInfo.id);
            axios.get(this.$store.state.BASE_URL + 'userlink/regist', {
                params:{
                    myid:this.$store.state.userInfo.id,
                    lp:this.linkPass
                }
            }).then(res => {
                this.$store.commit('debug', '登録成功。認証完了ページへ遷移します。');
                this.$store.commit('debug', res);
                this.viewFlg = 2;
            }).catch(err => {
                this.$store.commit('debug', 'エラー発生。エラー内容表示。')
                this.$store.commit('debug', err);
                router.push({name:'mypage'});
            })
        },
        goMypage(){
            router.push({name:'mypage'});
        }
    },
    mounted(){
        this.$store.commit('checkLogin');
    }
}
</script>

<style scoped>
.inputArea{
    text-align: center;
}
#linkPass{
    display: block;
    background-color: #f5f5f5;
    width: 170px;
    margin: 0 auto 30px auto;
    padding: 15px;
    font-size: 32px;
}
.error{
    padding: 15px 5px;
    border-left: solid 3px #ff6464;
    background-color: #ffd1d1;
    color: rgb(255, 77, 77);
}
.error p{
    padding: 0;
}
</style>