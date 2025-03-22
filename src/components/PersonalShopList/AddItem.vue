<template>
    <div>
        <div class="lbl-area">
            <label class="lbl-item">商品</label>
            <label class="lbl-vol">数量</label>
            <label class="lbl-unit">単位</label>
        </div>
        <div class="input-area">
            <input type="text" class="item" v-model="inputItem" />
            <input type="text" class="vol" v-model="inputVol" />
            <select v-model="selectedUnit" class="unit">
                <option
                    v-for="unit in unitlist"
                    v-bind:value="unit.unit_name"
                    v-bind:key="unit.id"
                >
                    {{ unit.unit_name }}
                </option>
            </select>
        </div>
        <button class="button-green OKButton" @click="clickOK">OK</button>
    </div>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
    props: ["unitlist"],
    data() {
        return {
            inputItem: "",
            inputVol: "",
            selectedUnit: "",
        };
    },
    methods: {
        clickOK() {
            this.$store.commit("debug", "OK押下時の登録処理開始");
            console.log("inputItem: " + this.inputItem);
            console.log("inputVol: " + this.inputVol);
            console.log("selectedUnit: " + this.selectedUnit);
            if (
                this.inputItem == "" ||
                this.inputVol == "" ||
                this.selectedUnit == ""
            ) {
                this.inputItem = "";
                this.inputVol = "";
                this.selectedUnit = "";
                this.$emit("clickOK");
            } else {
                axios
                    .get(this.$store.state.BASE_URL + "request/add", {
                        params: {
                            product_name: this.inputItem,
                            vol: this.inputVol,
                            unit: this.selectedUnit,
                            request_user_id: this.$store.state.userInfo.id,
                        },
                    })
                    .then((res) => {
                        this.$store.commit("debug", "取得したデータ");
                        this.$store.commit("debug", res.data);
                        router.push({ name: "personalshoplist" });
                        this.$emit("clickOK");
                        this.inputItem = "";
                        this.inputVol = "";
                        this.selectedUnit = "";
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
    },
};
</script>

<style scoped>
.lbl-area {
    width: 100%;
}
.input-area {
    width: 100%;
    margin-bottom: 12px;
}
.lbl-item {
    width: 66%;
    margin-bottom: 0px;
    margin-right: 2%;
    color: #929090;
    font-size: 13px;
}
.lbl-vol {
    width: 15%;
    margin-bottom: 0px;
    margin-right: 2%;
    color: #929090;
    font-size: 13px;
}
.lbl-unit {
    width: 15%;
    margin-bottom: 0px;
    color: #929090;
    font-size: 13px;
}
.item {
    width: 66%;
    border: solid thin #929090;
    margin-right: 2%;
    height: 40px;
    padding: 5px;
}
.vol {
    width: 15%;
    border: solid thin #929090;
    margin-right: 2%;
    height: 40px;
    padding: 5px;
}
.unit {
    width: 15%;
    border: solid thin #929090;
    height: 40px;
    padding: 5px;
}
.set {
    float: right;
}
.OKButton {
    padding: 5px 30px;
    border-radius: 25px;
    font-size: 20px;
    box-shadow: 2px 3px 2px 1px #999;
    margin-left: 75%;
}
</style>
