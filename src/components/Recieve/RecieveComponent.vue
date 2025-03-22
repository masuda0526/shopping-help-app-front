<template>
<RecievePerBuy
v-for="rilstPerUser in recieveItemList"
        :rilstPerUser="rilstPerUser"
        :key="rilstPerUser"
></RecievePerBuy>
</template>

<script>
import axios from "axios";
import RecievePerBuy from './RecievePerBuy.vue';

export default {
    data() {
        return {
            recieveItemList: [],
        };
    },
    components: {RecievePerBuy},
    methods: {
        getRecieveList() {
            this.$store.commit("debug", "受け取り画面用データ取得処理を開始");
            axios
                .get(this.$store.state.BASE_URL + "getrecievewaititemlist", {
                    params: {
                        r_uid: this.$store.state.userInfo.id,
                    },
                })
                .then((res) => {
                    this.$store.commit("debug", "取得したデータ");
                    this.$store.commit("debug", res.data);
                    this.recieveItemList = res.data;
                    this.$store.commit(
                        "debug",
                        this.recieveItemList[0][0].productName
                    );
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    mounted: function () {
        this.getRecieveList();
    },
};
</script>

<style scoped>
</style>
