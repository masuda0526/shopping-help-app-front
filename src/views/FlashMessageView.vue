<template>
    <transition>
        <!-- <div v-show="isShow"> -->
        <div v-show="isShow" :class="{flashmsg:true, show: this.isShow, none:!this.isShow, error:this.isErr, success:!this.isErr}" :key="this.$store.state.flashMsg.key">
            {{ this.$store.state.flashMsg.msgText }}
        </div>
    </transition>
</template>

<script>
    export default{
        data:function(){
            return {
                isErr:false,
                isShow:false,
            }
        },
        methods:{
            checkMsg(){
                let flg = this.$store.state.flashMsg.msgText != ""
                console.log('flg: ' + flg)
                return flg;
            }
        },
        updated(){
            if(this.checkMsg()){
                this.isShow = !this.isShow;
            }
            setInterval(()=>{
                this.isShow = false;
            }, 3000)
            setInterval(()=>{
                this.$store.commit('deleteFlashMsg');
            },5000)
            // this.showMsg()
        }
    }
</script>

<style scoped>
.v-enter-active, .v-leave-active{
    opacity: 0.7;
    transition: opacity 1.5s;
}
/* .v-enter-to, .v-leave{
    opacity: 0.7;
    transition: opacity 1.5s;
} */
.v-enter, .v-leave-to{
    opacity: 0;
    transition: opacity 1.5s;
}
.flashmsg{
    /* opacity: 0.7; */
    width: 100%;
    padding: 30px 20px;
    text-align: center;
    color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    transition: opacity 1.5s;
}
.none{
    opacity: 0;
    transition: all 1.5s;
}
.show{
    opacity: 0.7;
    transition: all 1.5s;
}
.success{
    background: #008cff;
}
.error{
    background: #db0000;
}
</style>