<template>
    <div class="col-3">
        <p v-if="!editFlg" @click="toggleEdit">
            <fa icon="plus" />
            買い物リストを追加
        </p>
        <div v-else class="row">
            <input type="text" v-model="this.product_name" class="form-control col-8">
            <button @click="addList" class="btn btn-primary col-3 ml-2">追加</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default{
        data:function(){
            return{
                editFlg:false,
                product_name:'',
            }
        },
        methods:{
            toggleEdit:function(){
                this.editFlg = !this.editFlg;
            },
            addList:function(){
                // console.log('送信データ-------------------');
                // console.log('product_name = ' + this.product_name);
                // console.log('request_user_id = ' + this.$store.state.userInfo.id);
                // console.log('----------------------------');
                axios.get(this.$store.state.BASE_URL + 'request/add',{
                    params:{
                        product_name:this.product_name,
                        request_user_id:this.$store.state.userInfo.id
                    }
                }).then((res) => {
                    console.log(res);
                    if(res){
                        // console.log('通信成功！');
                        this.toggleEdit();
                        this.product_name = '';
                        // this.updateRequestList();
                        this.$store.commit("updateRequestInfo");
                    }else{
                        // console.log('通信失敗!');
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
        }
    }
</script>