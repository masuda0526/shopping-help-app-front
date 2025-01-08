<template>
    <header>
        <h1>
            <div>買い物行くけど、</div>
            <div style="text-align: right;">なんかいる？</div>
        </h1>
        <h2>{{ title }}</h2>
    </header>
</template>

<script>
    export default{
        data:function(){
            return{
                // title:""
            }
        },
        props:['title'],

    }
</script>

<style scoped>
    header{
        margin: 0 auto;
    }
    h1{
        font-size: 32px;
        margin-bottom: 90px;
    }
    h2{
        font-size: 32px;
        margin-bottom: 10px;
        text-align: center;
    }
</style>