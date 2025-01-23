<template>
    <div class="comCard dlvBtnPar">
        <button class="button-s button-green dlvBtn" v-if="delverybtn">届ける</button>
        <h3 class="comCard-name">{{ reqlist.user_name }}さん</h3>
        <RequestListCardItemComponent v-for="item in reqlist.requests" :reqitem="item" :key="item.id"></RequestListCardItemComponent>
    </div>
</template>

<script>
import RequestListCardItemComponent from './RequestListCardItemComponent.vue';

export default{
    components:{
        RequestListCardItemComponent
    },
    props:['reqlist', 'delverybtn']
}
</script>

<style scoped>
.dlvBtnPar{
    position: relative;
}
.dlvBtn{
    position: absolute;
    right: 8px;
    top:8px
}

</style>
