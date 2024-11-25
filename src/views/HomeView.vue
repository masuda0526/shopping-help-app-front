<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <TestVue/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import TestVue from '@/components/TestVue.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    TestVue
  }
}
</script>
