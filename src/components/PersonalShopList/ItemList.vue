<template>
    <div class="comCard-item" v-if="!this.hide">
        <div class="comCard-product setw">
            <p>{{ reqitem.product_name }}</p>
            <p class="unit">{{ returnVolAndUnit }}</p>
        </div>
        <button class="button bought" v-if="reqitem.inCart">購入済</button>
        <button class="button button-red" v-else @click="this.remove($event)">
            削除
        </button>
    </div>
</template>

<script>
import axios from "axios";

export default {
    props: ["reqitem"],
    data() {
        return {
            hide: false,
        };
    },
    methods: {
        remove(e) {
            this.$store.commit("debug", "削除処理を開始");
            console.log(e);
            console.log(this.reqitem);
            axios
                .get(this.$store.state.BASE_URL + "request/remove", {
                    params: {
                        request_id: this.reqitem.id,
                    },
                })
                .then((res) => {
                    this.$store.commit("debug", "取得したデータ");
                    this.$store.commit("debug", res);
                    if (res.data == 0) {
                        this.$store.commit("debug", "remove成功");
                        this.hide = true;
                        this.$emit("clickRM");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    computed: {
        returnVolAndUnit() {
            return this.reqitem.vol + this.reqitem.unit;
        },
    },
};
</script>

<style scoped>
.bought {
    box-shadow: 2px 3px 2px 1px #ffffff;
    color: red;
    pointer-events: none;
}
.setw {
    width: 100%;
}
.unit {
    margin-right: 10%;
}
</style>
