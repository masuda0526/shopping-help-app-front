<template>
    <tr>
        <td >
            <div class="position-relative" v-on:mouseover="showExpl(index)" v-on:mouseleave="hideExpl(index)">
                {{ cmnty.community_name }}
                <span class="text-primary position-absolute" v-if="isShowExpl && showIndex === index" style="right: 0; top: -15px;">
                    {{ cmnty.com_expl }}
                </span>
            </div>
        </td>
        <td>
            <CommunityJoinAuthForm :community_id="cmnty.id" :com_auth_id="cmnty.com_auth_id"/>
        </td>
    </tr>
</template>

<script>
import CommunityJoinAuthForm from './CommunityJoinAuthForm.vue';
    // import axios from 'axios';
    export default{
        data:function(){
            return{
                isShowExpl:false,
                showIndex:null,
                joinMode:false,
                com_auth_id:""
            }
        },
        components:{
            CommunityJoinAuthForm
        },
        props:['cmnty', 'joinCommunityIDs'],
        methods:{
            showExpl(index){
                this.isShowExpl = true;
                this.showIndex = index;
            },
            hideExpl(){
                this.isShowExpl = false;
                this.showIndex = null;
            }
        }
    }
</script>