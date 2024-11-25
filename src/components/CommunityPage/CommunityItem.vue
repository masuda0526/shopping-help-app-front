<template>
    <div class="card">
        <div class="card-inner">
            <h2 class="card-title">{{item.community_name}}
                <fa v-if="isListOpen" icon="angle-down" class="icon" @click="toggleIsOpen" />
                <fa v-else icon="angle-up" class="icon" @click="toggleIsOpen" />
            </h2>
            <div class="card-body" v-if="isListOpen">
                <p class="card-member" v-for="member in item.member" :key="member.user_id">{{member.name}}</p>
            </div>
        </div>

    </div>
</template>

<script>
    export default{
        data:()=>{
            return{
                isListOpen:false
            }
        },
        props:['item'],
        methods:{
            toggleIsOpen(){
                this.isListOpen = !this.isListOpen;
            }
        }
    }

</script>