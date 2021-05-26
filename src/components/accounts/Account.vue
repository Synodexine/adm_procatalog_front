<template>
    <div class="account-container">
        <b-container fluid="sm" class="bv-example-row">
        <b-row>
            <b-col sm='3'></b-col>
            <b-col sm='6'>
                <b-icon icon='person-circle' class='mb-2 h1'></b-icon>
                <b-list-group>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Username
                    <b-badge variant="primary">{{this.$store.getters.user.info.name}}</b-badge>
                </b-list-group-item>

                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Email
                    <b-badge variant="primary">{{this.$store.getters.user.info.email}}</b-badge>
                </b-list-group-item>

                <b-list-group-item v-if="this.$store.getters.user.info.first_name!=null" class="d-flex justify-content-between align-items-center">
                    Full Name
                    <b-badge variant="primary">{{this.$store.getters.user.info.first_name + ' ' + this.$store.getters.user.info.last_name}}</b-badge>
                </b-list-group-item>

                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Active account
                    <b-badge variant="primary">Yes</b-badge>
                </b-list-group-item>

                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Role
                    <b-badge variant="primary">{{this.$store.getters.user.info.role.name}}</b-badge>
                </b-list-group-item>

                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    Permissions
                    <b-badge variant="primary">{{permissions}}</b-badge>
                </b-list-group-item>
            </b-list-group>
            </b-col>
            <b-col sm='3'></b-col>
        </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
  name: 'Account',
  computed: {
      isViewingAllowed: function() {
        let user = this.$store.getters.user.info
        let allowed = false
        if (user != null)
            allowed = true
        return allowed
      },
      permissions: function(){
            let user = this.$store.getters.user.info
            let groupsNames = ['Reader']
            if (user != null)
                user.role.groups.forEach(group => {
                    groupsNames.push(group.name)
                });
            return groupsNames.join(', ')
      }
  },
  data:() => {
      return {
          searchString: '',
      }
  },
  methods: {
  },
  beforeMount(){
      if (!this.isViewingAllowed){
          this.$router.go(-1)
      }
  }
}
</script>

<style scoped>
.account-container{
    padding: 50px;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.form {
    width: 50%;
}
label{
    font-size: 20pt;
}
</style>
