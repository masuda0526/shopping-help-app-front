<template>
    <AuthView v-if="!$store.state.isLogin && !$store.state.isSignUp"/>
    <MypageView v-if="$store.state.isLogin && !$store.state.isSignUp"/>
    <SignUpView v-if="$store.state.isSignUp"/>
</template>

<script>
import AuthView from './AuthView.vue';
import axios from 'axios';
import MypageView from './MypageView.vue';
import SignUpView from './SignUpView.vue';

    export default{
        name:'AuthMypage',
        components:{
            AuthView,
            MypageView,
            SignUpView
        },
        data(){
            return{
                
            }
        },
        methods:{
            authCheck(inputinfo, inputpass){
                console.log('authCheck----Start');
                console.log(inputinfo);
                console.log(inputpass);
                const AUTH_URL = "http://localhost:8080/auth";
                axios.get(AUTH_URL, {
                    params:{
                        auth_info:inputinfo,
                        pass:inputpass
                    }
                })
                    .then( res => {
                        this.userInfo = res.data;
                        if(this.userInfo.length > 0){
                            this.isLogin = true;
                        }else{
                            this.$refs.AuthView.loginFailed();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            logout(){
                this.isLogin = false;
                this.userInfo = [];
            }
        }
    }
</script>

<style>
/* @import '../../assets/css/common.css'; */
</style>