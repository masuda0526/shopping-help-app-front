<template>
  <FlashMessageView></FlashMessageView>
  <div class="wrapper">
    <router-view/>
  </div>
</template>

<script>
import FlashMessageView from './views/FlashMessageView.vue';

  export default{
    components:{
      FlashMessageView
    }
  }
</script>

<style>

</style>
