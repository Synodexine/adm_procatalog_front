<template>
    <div class="search-container">
        <b-form class="form" @submit.stop.prevent @submit="onSubmit">
            <label for="search-input">Search</label>
            <div style="display:flex; flex-direction: row; align-items: center;">
            <b-form-input
                v-model="searchString"
                id="search_input"
                placeholder="Apple Iphone 11"
                trim
            ></b-form-input>
            </div>
            <b-button type="submit" style="margin-top: 20px" size="sm" class="mb-2">
                <b-icon icon="search" aria-hidden="true"></b-icon> Search
            </b-button>
            <b-button 
            v-if="isEditingAllowed"
            style="margin-top: 20px; margin-left: 10px" size="sm" class="mb-2" variant="primary" @click="$router.push('/products/add')">
                <b-icon icon="plus" aria-hidden="true"></b-icon> Add product
            </b-button>
        </b-form>
    </div>
</template>

<script>
export default {
  name: 'Search',
  computed: {
      isEditingAllowed: function() {
        let user = this.$store.getters.user.info
        let allowed = false
        if (user != null)
            user.role.groups.forEach(group => {
                if (group.name == 'Writer')
                allowed = true
            });
        return allowed
      }
  },
  data:() => {
      return {
          searchString: ''
      }
  },
  methods: {
      executeRequest() {
          if (this.searchString.length >= 3)
          this.$router.push({path: '/catalog', query: {search: this.searchString}});
      },
      onSubmit(){
          this.executeRequest();
      }
  }
}
</script>

<style scoped>
.search-container{
    background-color: #f0f0f0;
    height: 90%;
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
