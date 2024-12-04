<template>
    <div class="col-sm-6 text-align-center mx-auto">
        <h2 class="mb-3">新規登録</h2>
        <div>
            <div class="text-danger" v-if="this.isError">
                <p v-for="err, i in this.showErrMsg" :key = i>{{ err }}</p>
            </div>
            <table class="table">
                <tr class="row">
                    <th class="col-sm-4">名前</th>
                    <td class="col-sm-8"><input class="form-control" type="text" name="name" v-model="name"></td>
                </tr>
                <tr class="row">
                    <th class="col-sm-4">メールアドレス</th>
                    <td class="col-sm-8"><input class="form-control" type="text" name="email" v-model="email"></td>
                </tr>
                <tr class="row">
                    <th class="col-sm-4">電話番号</th>
                    <td class="col-sm-8"><input class="form-control" type="text" name="tel" v-model="tel"></td>
                </tr>
                <tr class="row">
                    <th class="col-sm-4">パスワード</th>
                    <td class="col-sm-8"><input class="form-control" type="password" name="pass" v-model="pass"></td>
                </tr>
                <tr class="row">
                    <th class="col-sm-4">パスワード（確認用）</th>
                    <td class="col-sm-8"><input class="form-control" type="password" name="repass" v-model="repass"></td>
                </tr>
            </table>
            <div class="d-flex justify-content-between">
                <button class="btn btn-success" @click="signup">新規登録</button>
                <button class="btn btn-link" @click="returnLoginPage"><fa icon="rotate-left" />ログインページへ</button>
            </div>

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
                    }).catch( err => {
                        this.$store.commit('debug', '登録失敗');
                        this.$store.commit('debug', err);
                    })
                }
            },
            returnLoginPage(){
                this.$store.commit('signUpFalse');
            }
        }
    }
    
</script>

<style>
/* .up-title{
    text-align: center;
}
table{
    border-collapse: collapse;
    margin: 0 auto;
}
td,th{
    border: solid 1px;
}
th{
    width: 200px;
    text-align: left
}
td{
    width: 400px;
    padding: 15px 8px;
} */
</style>