<template>
    <HeaderView title="ログイン"></HeaderView>
    <div class="form-container bg-glay">
        <label for="">メールアドレスor電話番号</label>
        <input type="text" class="">
        <label for="">パスワード</label>
        <input type="password" class="">
    </div>
    <div class="button-container">
        <button class="button button-red">ログイン</button>
        <div style="text-align: right; padding-top: 25px;">
            <router-link to="/signup">新規登録＞</router-link>
        </div>
    </div>
</template>

<script>
    export default{
        
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