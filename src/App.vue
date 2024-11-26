<template>
  <nav>
    <router-link to="/community">コミュニティー</router-link>|
    <router-link to="/request">リクエスト</router-link>|
    <router-link to="/mypage">マイページ</router-link>
  </nav>
  <div class="d-flex justify-content-center">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
