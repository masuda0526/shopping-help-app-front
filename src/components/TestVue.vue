<template>
    <div>
        <h1>TestVue</h1>
        <ul>
            <li v-for="(user, i) in userList" :key="i">{{ user.name }}  {{ user.email }}</li>
        </ul>
        <!-- {{ userList }} -->
        <h2>RequestList</h2>
        <p>{{ requestList }}</p>
    </div>
</template>

<script>
import axios from 'axios';

export default{
    data(){
        return{
            userList:[],
            requestList:[]
        }
    },
    mounted(){
        const userInfoUrl = 'http://localhost:8080/test';
        const requestInfoUrl = "http://localhost:8080/request";

        axios.get(userInfoUrl)
            .then(res => {
                this.userList = res.data
                console.log(res);
            })
            .catch(error => {console.log(error)});
        console.log(this.userList);
        axios.get(requestInfoUrl)
            .then(res => {
                this.requestList = res.data
                console.log(res)
            })
            .catch(error => {console.log(error)});
    }
}

</script>