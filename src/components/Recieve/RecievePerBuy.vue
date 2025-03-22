<template>
    <div class="comCard rcvBtnPar">
        <button class="button-s button-blue rcvBtn" @click="recieve">
            届いた
        </button>
        <h3 class="comCard-name">{{ rilstPerUser[0].buyUserName + "さん" }}</h3>
        <div
            class="comCard-item"
            v-for="rilst in rilstPerUser"
            v-bind:key="rilst"
        >
            <div class="comCard-product setw">
                <p>{{ rilst.productName }}</p>
                <p>{{ rilst.vol + rilst.unit }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import axios from "axios";

export default {
    props: ["rilstPerUser"],
    data() {
        return {};
    },
    components: {},
    methods: {
        recieve(e) {
            console.log(e);
            this.$store.commit("debug", "届けたボタン押下処理");
            this.$store.commit(
                "debug",
                "buycode:" + this.rilstPerUser[0].buyCode
            );
            this.$store.commit("debug", "seq:" + this.rilstPerUser[0].seq);
            axios
                .get(this.$store.state.BASE_URL + "commitrecieve", {
                    params: {
                        buycode: this.rilstPerUser[0].buyCode,
                        seq: this.rilstPerUser[0].seq,
                    },
                })
                .then((res) => {
                    this.$store.commit("debug", "取得したデータ");
                    this.$store.commit("debug", res.data);
                    this.$store.commit("initConfirmFlgs");
                    this.$store.state.confirmFlgs.registMethod = 3;
                    this.$store.state.confirmFlgs.buycode = this.rilstPerUser[0].buyCode;
                    this.$store.state.confirmFlgs.seq = this.rilstPerUser[0].seq;
                    router.push({name:'confilm'})
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    mounted: function () {},
};
</script>

<style scoped>
.rcvBtnPar {
    position: relative;
}
.rcvBtn {
    position: absolute;
    right: 8px;
    top: 8px;
}
.setw {
    width: 100%;
}
</style>
