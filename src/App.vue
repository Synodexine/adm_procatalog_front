<template>
  <div id="app">
      <NavigationBar></NavigationBar>
      <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from './components/navBar/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    NavigationBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background-color: #f0f0f0;
}
html{
  height: 100%;
}
body{
  height: 100%;
}
</style>
