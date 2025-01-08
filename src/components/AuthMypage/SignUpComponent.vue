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
                        <div v-bind:class="{'selectRole-content':true, 'selected':!this.isDelevary}" @click="clickIrai">頼む側</div>
                        <div v-bind:class="{'selectRole-content':true, 'selected':this.isDelevary}" @click="clickDelivery">届ける側</div>
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
                    noMatchPass:'パスワードが一致しません'
                },
                name:'',
                email:'',
                tel:'',
                pass:'',
                repass:'',
                isDelevary:false,
                showErrMsg:[],
                isError:false
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
                if(!this.showErrMsg.length > 0){
                    this.isError = false;
                    this.$store.commit('debug', 'バリデーションOK');
                }
            },
            signup(){
                this.$store.commit('debug', 'サインアップ処理開始=========================================');
                this.validation();//バリデーション
                if(!this.isError){
                    axios.get(this.$store.state.BASE_URL + 'signup',{
                        params:{
                            name:this.name,
                            email:this.email,
                            password:this.pass,
                            tel:this.tel
                        }
                    }).then( (res) => {
                        this.$store.commit('debug', '登録完了');
                        this.$store.commit('debug', res);
                        this.$store.commit('signUpFalse');
                        router.push({name:'login'});
                    }).catch( err => {
                        this.$store.commit('debug', '登録失敗');
                        this.$store.commit('debug', err);
                    })
                }
            },
            clickIrai(){
                this.isDelevary = false;
            },
            clickDelivery(){
                this.isDelevary = true;
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