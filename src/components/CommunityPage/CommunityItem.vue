<template>
    <div class="card mb-3">
        <h3 class="card-header">{{item.community_name}}
            <fa v-if="isListOpen" icon="angle-down" class="icon" @click="toggleIsOpen" />
            <fa v-else icon="angle-up" class="icon" @click="toggleIsOpen" />
        </h3>
        <ul class="list-group" v-if="isListOpen">
            <li class="list-group-item" v-for="member in item.member" :key="member.user_id">{{member.name}}</li>
        </ul>
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