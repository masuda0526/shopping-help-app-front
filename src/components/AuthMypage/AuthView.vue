<template>
    <div class="p-1 col-sm-6 mx-auto">
        <h2 class="mb-5">ログインページ</h2>
        <div class="container bg-gray">
            <p class="mb-4">マイページを表示するには、ログインが必要です。</p>
            
            <div v-if="this.isError" class="text-danger bg-danger-subtle p-2 ">
                <p class="text-start" v-for="err, i in showErrorMsg" v-bind:key="i">{{ err }}</p>
            </div>

            <div class="mb-3 row">
                <label for="" class="col-sm-4">メールアドレス or 電話番号</label>
                <input type="text" id="" v-model="inputText.inputinfo" class="form-control-lg col-sm-8">
            </div>

            <div class="mb-3 row">
                <label for="" class="mb-3 col-sm-4">パスワード</label>
                <input type="password" id="" v-model="inputText.inputpass" class="form-control-lg col-sm-8">
            </div>

            <div class="row justify-content-around">
                <div class="col">
                    <a @click.prevent="toSignUp" class="btn btn-link">新規登録...</a>
                </div>
                <div class="col">
                    <button class="btn btn-primary" @click="login">ログイン</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default{
        data(){
            return{
                inputText:{
                    inputinfo:"",
                    inputpass:"",
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
            toSignUp(){
                this.$store.commit('debug', 'サインアップ処理開始');
                // console.log('signUP--Start');
                this.$store.commit('signUpTrue');
                this.$store.commit('debug', 'サインアップ処理終了');
            }
        }
    }
</script>

<style>
/* .login-inner{
    width: 70%;
    margin: 0 auto;
}
.login-label{
    display: block;
    text-align: left;
}
.login-tosignup{
    display: block;
    float: right;
    cursor: pointer;
    transition: all 0.5s;
}
.login-tosignup:hover{
    transform: scale(1.2);
    color: rgb(106, 53, 192);
    transition: all 0.5s;
} */
</style>