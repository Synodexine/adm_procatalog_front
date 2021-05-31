<template>
    <b-navbar class="nav-bar" variant="dark" type="dark">
        <b-navbar-brand href="#" to="/">
            <div>Product catalog</div>
        </b-navbar-brand>

        <b-navbar-nav>
            <b-nav-item to="/search">
                <div >Search</div>
            </b-nav-item>
            <b-nav-item href="#" @click="openDocs">
                <div>Documentation</div>
            </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="getUser.info == null" class="ml-auto">
            <b-nav-item to='/accounts/login'>Log in</b-nav-item>
            <b-nav-item to='/accounts/register'>Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto">
            <b-nav-item-dropdown :text="$store.getters.user.info.name" right>
                <b-dropdown-item to="/accounts/info">Account</b-dropdown-item>
                <b-dropdown-item v-if="isEditingAllowed" to="/management">Management</b-dropdown-item>
                <b-dropdown-item id='about-button'>About</b-dropdown-item>
                <b-popover
                :target="'about-button'"
                placement='left'
                title="About us"
                triggers="hover focus"
                content="This service can be used for trade markets and online shops, it shares API, which is totally free. If you are a developer, you can see our API on the Documentation link. If you want to publish the info about your product, please, contact us"
                ></b-popover>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item @click="logOut">Log out</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
export default {
  name: 'NavigationBar',
  computed: {
      getUser(){
          return this.$store.getters.user
      },
      isEditingAllowed: function() {
        let user = this.$store.getters.user.info
        let allowed = false
        if (user != null)
            user.role.groups.forEach(group => {
                if (group.name == 'Writer')
                allowed = true
            });
        return allowed
      },
      isAdminAllowed: function() {
        let user = this.$store.getters.user.info
        let allowed = false
        if (user != null)
            user.role.groups.forEach(group => {
                if (group.name == 'Admin')
                allowed = true
            });
        return allowed
      }
  },
  methods: {
      logOut(){
          this.$store.dispatch('REMOVE_USER_INFO')
          this.$cookie.delete('access_token')
          this.$cookie.delete('refresh_token')
          console.log(this.$store.getters.user.info)
          console.log(this.$cookie.get('refresh_token'))
          console.log(this.$cookie.get('access_token'))
          this.$router.push('/search')
          this.$router.go()
      },
      openDocs(){
          window.open('http://116.203.149.31:8000/docs/', '_blank')
      }

  }
}
</script>

<style scoped>
/* .nav-bar {
    color: white;
} */
.navbar-brand{
    font-size: 17pt;
}
.nav-text {
    color: whitesmoke;
}
.nav-item{
    color: whitesmoke;
    font-size: 15pt;
}
.dropdown-toggle{
    color: white;
}
</style>
