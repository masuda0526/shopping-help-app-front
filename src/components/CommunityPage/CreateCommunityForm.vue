<template>
    <div>
        <div v-if="!isCrtMode">
            コミュニティーをつくる
        </div>
        <div v-else class="">
            <div class="mx-auto col-sm-6">
                <h3>コミュニティーをつくる</h3>
                <div class="">
                    <div class="row mb-3">
                        <label class="col-sm-3 d-block w-100" for="community_name">コミュニティー名</label>
                        <input class="col-sm-9 d-block w-100" type="text" name="community_name" id="" v-model="community_name">
                    </div>
                    <div class="row mb-3">
                        <label class="col-sm-3 d-block w-100" for="com_expl">コミュニティーの説明</label>
                        <textarea class="col-sm-9 d-block w-100" name="" id="" cols="30" rows="10" v-model="com_expl"></textarea>
                    </div>
                    <div class="row justify-content-around">
                        <button class="btn btn-primary" @click="createCommunity">登録する</button>
                        <button class="btn btn-link">元の画面に戻る</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default{
        data:function(){
            return{
                isCrtMode:true,
                community_name:'',
                com_expl:''
            }
        },
        methods:{
            clickTest:function(){
                this.$store.commit('debug', 'TEST-----OK');
            },
            createCommunity:function(){
                this.$store.commit('debug', '登録処理開始＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝');
                this.$store.commit('debug', '＜登録内容＞');
                this.$store.commit('debug', this.community_name);
                this.$store.commit('debug', this.com_expl);
                this.$store.commit('debug', '＜登録内容（ここまで）＞');
                
                if(this.formValid()){
                    axios.get(this.$store.state.BASE_URL+'community/create', {
                        params:{
                            community_name:this.community_name,
                            com_expl:this.com_expl
                        }
                    }).then((res) => {
                        if(res){
                            // this.$store.commit('debug', '登録完了');
                            this.formClear();
                        }else{
                            this.$store.commit('debug', '登録失敗');
                        }
                    }).catch( err => {
                        this.$store.commit('debug', '接続エラー');
                        this.$store.commit('debug', err);
                    });
                }
                this.$store.commit('debug', '登録処理終了＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝');
            },
            formValid(){
                let validRst = false;
                this.$store.commit('debug', 'バリデーション開始');
                if(this.community_name != ""){
                    validRst = true;
                    this.$store.commit('debug', 'バリデーションOK');
                }else{
                    this.$store.commit('debug', 'バリデーションNG');
                }
                return validRst;
            },
            formClear(){
                this.$store.commit('debug', 'フォーム情報を初期化します');
                this.community_name = "";
                this.com_expl="";
            }
        }
    }
</script>