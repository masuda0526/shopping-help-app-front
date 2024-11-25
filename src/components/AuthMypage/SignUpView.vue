<template>
    <div class="w40 mauto">
        <h2>新規登録</h2>
        <div>
            <div class="error-body" v-if="this.isError">
                <p v-for="err, i in this.showErrMsg" :key = i>{{ err }}</p>
            </div>
            <table class="mb-s">
                <tr>
                    <th>名前</th>
                    <td><input type="text" name="name" v-model="name"></td>
                </tr>
                <tr>
                    <th>メールアドレス</th>
                    <td><input type="text" name="email" v-model="email"></td>
                </tr>
                <tr>
                    <th>電話番号</th>
                <td><input type="text" name="tel" v-model="tel"></td>
            </tr>
            <tr>
                <th>パスワード</th>
                <td><input type="password" name="pass" v-model="pass"></td>
            </tr>
            <tr>
                <th>パスワード（確認用）</th>
                <td><input type="password" name="repass" v-model="repass"></td>
            </tr>
        </table>
        <button class="btn gr" @click="signup">新規登録</button>
    </div>
    </div>
</template>

<script>
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
                showErrMsg:[],
                isError:false
            }
        },
        methods:{
            validation(){
                this.showErrMsg = []
                if(this.name === "" || this.email === "" || this.tel === "" || this.pass === "" || this.repass === ""){
                    this.showErrMsg.push(this.ERR_MSG.requireInput);
                    this.isError = true
                }
                if(this.repass !== this.pass){
                    this.showErrMsg.push(this.ERR_MSG.noMatchPass);
                    this.isError = true;
                }
                if(!this.showErrMsg.length > 0){
                    this.isError = false;
                }
            },
            signup(){
                console.log('signup-----Start!');
                this.validation();
                if(!this.isError){
                    // console.log(this.$store.state.BASE_URL + 'signup');
                    axios.get(this.$store.state.BASE_URL + 'signup',{
                        params:{
                            name:this.name,
                            email:this.email,
                            password:this.pass,
                            tel:this.tel
                        }
                    }).then( (res) => {
                        console.log('AJAX-----OK');
                        console.log(res);
                        this.$store.commit('signUpFalse');
                    }).catch( err => {
                        console.log(err);
                    })
                }
            }
        }
    }
    
</script>

<style>
.up-title{
    text-align: center;
}
table{
    border-collapse: collapse;
    margin: 0 auto;
}
/* td,th{
    border: solid 1px;
} */
th{
    width: 200px;
    text-align: left
}
td{
    width: 400px;
    padding: 15px 8px;
}
</style>