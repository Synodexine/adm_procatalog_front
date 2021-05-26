<template>
  <div id="app">
      <NavigationBar></NavigationBar>
      <router-view></router-view>
  </div>
</template>

<script>
import NavigationBar from './components/navBar/NavigationBar.vue'
import { Users } from './api/users'

export default {
  name: 'App',
  components: {
    NavigationBar
  },
  async beforeMount(){
    if (this.$store.getters.user.info == null){
      let access_token = this.$cookie.get('access_token')
      if (access_token == null) {
        let refresh_token = this.$cookie.get('refresh_token')
        if (refresh_token != null){
          let tokens = await (await Users.refreshTokens(refresh_token)).data
          this.$cookie.set('access_token', tokens.access_token, 1)
          this.$cookie.set('refresh_token', tokens.refresh_token, 30)
          this.$store.dispatch('GET_USER_INFO_BY_TOKEN', tokens.access_token)
        }
      }
      else {
        this.$store.dispatch('GET_USER_INFO_BY_TOKEN', access_token)
      }
    }
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
  background-color: #f0f0f0;
}
</style>
