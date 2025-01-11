<template>
    <HeaderView title="ログイン"></HeaderView>
    <div class="form-container bg-glay">
        <label for="">メールアドレスor電話番号</label>
        <input type="text" class="" v-model="inputText.inputinfo">
        <label for="">パスワード</label>
        <input type="password" class="" v-model="inputText.inputpass">
    </div>
    <div class="button-container">
        <button class="button button-red" @click="login">ログイン</button>
        <div style="text-align: right; padding-top: 25px;">
            <router-link to="/signup">新規登録＞</router-link>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import router from '@/router';
    export default{
        data(){
            return{
                inputText:{
                    inputinfo:'',
                    inputpass:'',
                },
                errorMsg:{
                    require:"未入力の必須項目があります",
                    nomatch:"ログイン情報またはパスワードが違います。"
                },
                showErrorMsg:[],
                isError:false
            }
        },
        methods:{
            validUserInfo:function(){
                // バリデーション
                this.showErrorMsg = [];
                if(this.inputText.inputinfo == "" || this.inputText.inputpass == ""){
                    this.showErrorMsg.push(this.errorMsg.require);
                    this.isError = true;
                    this.$store.commit('debug', 'バリデーションNG');
                }
                if(!this.showErrorMsg.length > 0){
                    this.isError = false;
                    this.$store.commit('debug', 'バリデーションOK');
                }
            },
            login(){
                this.validUserInfo();
                if(!this.isError){
                    this.authCheck(this.inputText.inputinfo, this.inputText.inputpass);
                }
                
            },
            authCheck(inputinfo, inputpass){

                // デバッグ
                this.$store.commit('debug', 'ログイン処理開始');
                this.$store.commit('debug', '＜登録内容＞');
                this.$store.commit('debug', 'Email or TEL : ' + this.inputText.inputinfo);
                this.$store.commit('debug', 'パスワード : ' + this.inputText.inputpass);
                this.$store.commit('debug', '＜登録内容（ここまで）＞');

                axios.get(this.$store.state.BASE_URL + "auth", {
                    params:{
                        auth_info:inputinfo,
                        pass:inputpass
                    }
                })
                    .then( res => {
                        // console.log(res);
                        if(res.data != ""){
                            this.$store.commit('loginTrue');
                            this.$store.commit('initUserInfo');
                            // console.log(res.data);
                            this.$store.commit('placeUserInfo', res.data);
                            this.$store.commit('getCommunityList')
                            this.$store.commit('getAllCommunityList');
                            router.push({name:'mypage'})
                        }else{
                            this.loginFailed();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    this.$store.commit('debug', 'ログイン処理終了');
            },
            loginFailed(){
                this.$store.commit('debug', 'ログイン失敗');
                this.showErrorMsg.push(this.errorMsg.nomatch);
                this.isError = true;
                this.$store.commit('loginFalse');
            },
        }
    }
</script>

<style lang="css" scoped>
    .form-container{
        padding: 50px 10px;
        margin-bottom: 10px;
    }
    label{
        font-size: 20px;
    }
    input{
        background-color: #fff;
        width: 100%;
        padding: 10px;
        margin-bottom: 30px;
    }
    input:last-child{
        margin-bottom: 0;
    }
    .button-container{
        text-align: center;
    }
</style>