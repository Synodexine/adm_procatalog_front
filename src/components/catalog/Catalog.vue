<template>
    <div class="catalog-container">
        <b-container class="bv-example-row" fluid>
        <b-row class="text-center">
            <b-col sm="3"></b-col>
            <b-col sm="9">
                <b-form class="form" @submit.prevent.stop @submit="onSubmit">
                    <div style="display:flex; align-items:center;">
                    <b-form-input
                        v-model="searchStringData"
                        id="search_input"
                        placeholder="Apple Iphone 12"
                        trim
                    ></b-form-input> 
                    <b-button type="submit" style="margin-left: 20px; width: 100px; margin-bottom: 0px;" size="sm">
                        <b-icon icon="search" aria-hidden="true"></b-icon> Search
                    </b-button>
                    </div>
                </b-form>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="3"></b-col>
            <b-col sm="9">
                <ProductsList :searchString="searchStringData"></ProductsList>
            </b-col>
        </b-row>
        </b-container>
    </div>
</template>

<script>
import ProductsList from './ProductsList.vue'
export default {
  components: { ProductsList },
  name: 'Catalog',
  beforeMount(){
    this.searchStringData = this.searchString;
  },
  props: {
    searchString: String,
  },
  data: () => {
      return {
          searchStringData: ''
      }
  },
  methods: {
      executeSearchRequest(){
          this.$router.push({path: this.$router.currentRoute.fullpath, query: {search: this.searchStringData}});
          this.$router.go()
      },
      onSubmit(){
          this.executeSearchRequest()
      }
  }
}
</script>

<style scoped>
.catalog-container{
    background-color: #f0f0f0;
    padding-top: 20px;
}
.form {
    width: inherit;
}
label{
    font-size: 20pt;
}

</style>
