<template>
    <HeaderView :title="nameTitle"></HeaderView>
    <ItemList
        v-for="reqitem in reqitems"
        :reqitem="reqitem"
        :key="reqitem.id"
        @clickRM="getPersonalRequests"
    ></ItemList>
    <AddItem
        :unitlist="unitList"
        @clickOK="getPersonalRequests"
        v-if="!this.isAddBtnActive"
    ></AddItem>
    <div class="btArea" v-if="this.isAddBtnActive">
        <div v-if="isDeliBtnActive">
            <button class="button button-red addButton" @click="clickADD">
                追加
            </button>
            <button class="button button-blue deliButton"  @click="clickRecieve">
                届いた
            </button>
        </div>
        <div v-if="!isDeliBtnActive" class="center">
            <button class="button button-red" @click="clickADD">追加</button>
        </div>
    </div>
</template>

<script>
import router from "@/router";
import ItemList from "./PersonalShopList/ItemList.vue";
import AddItem from "./PersonalShopList/AddItem.vue";
import HeaderView from "@/views/HeaderView.vue";
import axios from "axios";

export default {
    components: {
        HeaderView,
        ItemList,
        AddItem,
    },
    data() {
        return {
            nameTitle: this.$store.state.userInfo.name + "さん\n買い物リスト",
            reqitems: [],
            unitList: [],
            isAddBtnActive: true,
            isDeliBtnActive: false,
        };
    },
    methods: {
        getPersonalRequests() {
            this.$store.commit("debug", "リクエストアイテムリスト取得");
            this.isAddBtnActive = true;
            axios
                .get(this.$store.state.BASE_URL + "getpersonalrequest", {
                    params: {
                        r_uid: this.$store.state.userInfo.id,
                    },
                })
                .then((res) => {
                    this.$store.commit("debug", res);
                    this.$store.commit(
                        "debug",
                        "リクエストアイテムリスト取得終了"
                    );
                    this.reqitems = res.data;
                    for (let i of this.reqitems) {
                        if (i.buycode != 0) {
                            this.$store.commit("debug", "buycode:" + i.buycode);
                            this.isDeliBtnActive = true;
                            break;
                        }
                        this.isDeliBtnActive = false;
                    }
                    this.$store.commit("debug", this.reqitems[0]);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        getUnitList() {
            this.$store.commit("debug", "単位のリスト取得");
            axios
                .get(this.$store.state.BASE_URL + "getunitlist", {
                    params: {
                        order: 0,
                    },
                })
                .then((res) => {
                    this.$store.commit("debug", res);
                    this.$store.commit("debug", "単位のリスト取得終了");
                    this.unitList = res.data;
                    this.$store.commit("debug", this.unitList[0]);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        clickADD() {
            this.$store.commit("debug", "追加ボタン押下");
            this.isAddBtnActive = false;
        },
        clickRecieve() {
            router.push({ name: "recieve" });
        },
    },
    mounted: function () {
        this.getPersonalRequests();
        this.getUnitList();
    },
    created: function () {
        this.$store.commit("checkLogin");
    },
};
</script>

<style scoped>
.btArea {
    margin-top: 40px;
}
.addButton {
    margin-left: 10%;
}
.center {
    text-align: center;
}
.deliButton {
    float: right;
    margin-right: 10%;
}
.hide {
    display: none;
}
.show {
    display: block;
}
</style>
