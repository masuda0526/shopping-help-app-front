<template>
    <div class="w40 mauto">
        <h2 class="">ログインページ</h2>
        <div class="login-inner ">
            <p class="mb-l">マイページを表示するには、ログインが必要です。</p>
            <div v-if="this.isError" class="error-body">
                <p class="error-text" v-for="err, i in showErrorMsg" v-bind:key="i">{{ err }}</p>
            </div>
            <label for="" class="mb-s login-label">
                メールアドレス or 電話番号
                <input type="text" id="" v-model="inputText.inputinfo">
            </label>
            <label for="" class="mb-l login-label">
                パスワード
                <input type="password" id="" v-model="inputText.inputpass">
            </label>
            <div>
                <button class="btn gr" @click="login">ログイン</button>
            </div>
            <!-- <div class="login-tosignup"> -->
                <a @click.prevent="toSignUp" class="login-tosignup">新規登録...</a>
            <!-- </div> -->
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
                // console.log('validation-----')
                this.showErrorMsg = [];
                if(this.inputText.inputinfo == "" || this.inputText.inputpass == ""){
                    this.showErrorMsg.push(this.errorMsg.require);
                    this.isError = true;
                }
                if(!this.showErrorMsg.length > 0){
                    this.isError = false;
                }
            },
            login(){
                // console.log('login----');
                // console.log(this.inputText);
                this.validUserInfo();
                if(!this.isError){
                    this.authCheck(this.inputText.inputinfo, this.inputText.inputpass);
                }
                
            },
            authCheck(inputinfo, inputpass){
                // console.log('authCheck----Start');
                // console.log(inputinfo);
                // console.log(inputpass);
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
            },
            loginFailed(){
                // this.$set(this.showErrorMsg, this.showErrorMsg.length, this.errorMsg.nomatch);
                this.showErrorMsg.push(this.errorMsg.nomatch);
                this.isError = true;
                this.$store.commit('loginFalse');
            },
            toSignUp(){
                // console.log('signUP--Start');
                this.$store.commit('signUpTrue');
            }
        }
    }
</script>

<style>
.login-inner{
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
}
</style>