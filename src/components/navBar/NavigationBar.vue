<template>
    <b-navbar class="nav-bar" variant="dark" type="dark">
        <b-navbar-brand href="#" to="/">
            <div>Product catalog</div>
        </b-navbar-brand>

        <b-navbar-nav>
            <b-nav-item to="/search">
                <div >Search</div>
            </b-nav-item>
            <b-nav-item href="#">
                <div>Documentation</div>
            </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav v-if="getUser.info == null" class="ml-auto">
            <b-nav-item>Log in</b-nav-item>
            <b-nav-item>Register</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-else class="ml-auto">
            <b-nav-item-dropdown text="User" right>
                <b-dropdown-item to="account">Account</b-dropdown-item>
                <b-dropdown-item to="settings">Settings</b-dropdown-item>
                <b-dropdown-item to="about">About</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item to="logout">Log out</b-dropdown-item>
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
      }
  }
}
</script>

<style scoped>
/* .nav-bar {
    color: white;
} */
.nav-text {
    color: whitesmoke;
}
.dropdown-toggle{
    color: white;
}
</style>
