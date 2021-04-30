<template>
    <b-navbar class="nav-bar" variant="dark">
        <b-navbar-brand href="#">
            <div class="nav-text">Product catalog</div>
        </b-navbar-brand>

        <b-navbar-nav>
            <b-nav-item href="#">
                <div class="nav-text">Search</div>
            </b-nav-item>
            <b-nav-item href="#">
                <div class="nav-text">Documentation</div>
            </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown text="User" class="nav-text" right>
                <b-dropdown-item href="#">Account</b-dropdown-item>
                <b-dropdown-item href="#">Settings</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style scoped>
.nav-bar {
    color: white;
    /* background-color: #8fb2e3; */
}
.nav-text {
    color: whitesmoke;
}
</style>
