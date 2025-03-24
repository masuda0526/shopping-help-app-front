<template>
    <div>
        <div>
            <div class="text-danger" v-if="this.isError">
                <p v-for="err, i in this.showErrMsg" :key = i>{{ err }}</p>
            </div>
            <div class="bg-glay form-container" >
                <label>名前</label>
                <input type="text" name="name" v-model="name">
                <label>メールアドレス</label>
                <input type="text" name="email" v-model="email">
                <label>電話番号</label>
                <input type="text" name="tel" v-model="tel">
                <label>パスワード</label>
                <input type="password" name="pass" v-model="pass">
                <label>パスワード（確認用）</label>
                <input type="password" name="repass" v-model="repass">
                <div class="selectRole">
                    <div class="selectRole-title">
                        選択
                        <div v-bind:class="{'selectRole-content':true, 'selected':this.user_type === 0}" @click="clickIrai">頼む側</div>
                        <div v-bind:class="{'selectRole-content':true, 'selected':this.user_type === 1}" @click="clickDelivery">届ける側</div>
                    </div>
                </div>
            </div>
            <div class="button-container">
                <button class="button button-red" @click="signup">新規登録</button>
                <div style="text-align: right; padding-top: 25px;">
                    <router-link to="/login">ログインページへ＞</router-link>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';

    export default{
        data(){
            return{
                ERR_MSG:{
                    requireInput:'未入力の入力必須項目があります',
                    noMailString:'メールアドレスの形式で入力してください',
                    noMatchPass:'パスワードが一致しません',
                    emailDuplicate:'入力されたメールアドレスはすでに登録済みです'
                },
                name:'',
                email:'',
                tel:'',
                pass:'',
                repass:'',
                user_type:0,
                showErrMsg:[],
                isError:false,
                isCheckEmailDupErr:false,
            }
        },
        methods:{
            validation(){
                this.showErrMsg = []
                if(this.name === "" || this.email === "" || this.tel === "" || this.pass === "" || this.repass === ""){
                    this.showErrMsg.push(this.ERR_MSG.requireInput);
                    this.isError = true;
                    this.$store.commit('debug', 'バリデーションNG（未入力項目あり）');
                }
                if(this.repass !== this.pass){
                    this.showErrMsg.push(this.ERR_MSG.noMatchPass);
                    this.isError = true;
                    this.$store.commit('debug', 'バリデーションNG（確認用パスワード不一致）');
                }
                if(this.isCheckEmailDupErr){
                    this.showErrMsg.push(this.ERR_MSG.emailDuplicate);
                    this.isError = true;
                    this.$store.commit('debug', 'バリデーションNG（登録済みメールアドレス）');
                }
                if(!this.showErrMsg.length > 0){
                    this.isError = false;
                    this.$store.commit('debug', 'バリデーションOK');
                }
            },
            checkEmailDuplicate(){
                let that = this;
                return new Promise(function(resolve, reject){
                    that.$store.commit('debug', '〇Email重複チェック開始');
                    that.$store.commit('debug', 'パラメータ');
                    that.$store.commit('debug', that.email);
                    axios.get(that.$store.state.BASE_URL + 'email/duplicate/check', {
                        params:{
                            email:that.email
                        }
                    }).then((res) => {
                        that.$store.commit('debug', "サーバー接続成功");
                        that.$store.commit('debug', "------重複結果------");
                        that.$store.commit('debug', res);
                        that.$store.commit('debug', "-------------------");
                        that.isCheckEmailDupErr = res.data;
                        resolve();
                    }).catch(err => {
                        that.$store.commit('debug', 'エラー発生');
                        that.$store.commit('debug', err);
                        reject();
                    })
                })
            },
            registUser(){
                this.$store.commit('debug', 'サインアップ処理開始=========================================');
                this.validation();//バリデーション
                if(!this.isError){
                    axios.get(this.$store.state.BASE_URL + 'signup',{
                        params:{
                            name:this.name,
                            email:this.email,
                            password:this.pass,
                            tel:this.tel,
                            user_type:this.user_type,
                        }
                    }).then( (res) => {
                        this.$store.commit('debug', '登録完了');
                        this.$store.commit('debug', res);
                        router.push({name:'login'});
                    }).catch( err => {
                        this.$store.commit('debug', '登録失敗');
                        this.$store.commit('debug', err);
                    })
                }
            },
            // 0:頼む側、1:届ける側
            clickIrai(){
                this.user_type = 1;
            },
            clickDelivery(){
                this.user_type = 0;
            },
            signup(){
                let that = this;
                this.checkEmailDuplicate()
                .then(function(){
                    that.registUser();
                })
                
            }
        }
    }
    
</script>

<style scoped>
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
.form-container{
    padding: 50px 10px;
    margin-bottom: 10px;
}
.button-container{
    text-align: center;
}
.selectRole{
    font-size: 20px;
}
.selectRole-title{

}
.selectRole-content{
    display: inline-block;
    background-color: #fff;
    width: 100px;
    text-align: center;
    padding: 10px;
    margin-left: 40px;
}
.selectRole-content:hover{
    cursor: pointer;
}
.selected{
    background-color: #ffd153;
}

</style>