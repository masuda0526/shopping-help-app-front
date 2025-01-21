<template>
    <div class="comCard">
        <h3 class="comCard-name">{{ memberData.user_name }} さん</h3>
        <ShoppingRequestCardItemComponent v-for="item in memberData.requests" :key="item.id" :item="item"></ShoppingRequestCardItemComponent>
    </div>
</template>

<script>
import ShoppingRequestCardItemComponent from './ShoppingRequestCardItemComponent.vue';

export default{
    data(){
        return{

        }
    },
    props:['memberData'],
    components:{
        ShoppingRequestCardItemComponent
    }

}
</script>