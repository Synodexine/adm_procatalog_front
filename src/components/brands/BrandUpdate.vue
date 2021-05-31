<template>
    <div class="brand-creation-container">
      <template v-if="brandFetch == null">
            <div class="text-center">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
        </template>
        <template v-if="brandFetch == false">
            <div class="text-center">
                An error occured fetching the requested brand.
            </div>
        </template>
      <b-container v-if="isEditingAllowed && brandFetch" class="bv-example-row" fluid>
        <b-row class="text-center">
          <b-col sm="6">
            <b-form class="form text-left" @submit.stop.prevent @submit="onSubmit">
                <b-form-group
                id="name-fieldset"
                description="Enter the brand name."
                label="Name"
                label-for="productName"
                invalid-feedback="Enter at least 2 letters"
                :state="nameState(brandName)"
                >
                    <b-form-input lazy id="name" v-model="brandName" trim></b-form-input>
                </b-form-group>
                <ErrorPanel v-bind:errors="errors"></ErrorPanel>
                <b-button style="margin-top: 20px; margin-right: 10px;" size="sm" class="mb-2" variant="secondary" @click="$router.go(-1)">
                  <b-icon icon="arrow-left" aria-hidden="true"></b-icon> Back
                </b-button>
                <b-button type="submit" style="margin-top: 20px" size="sm" class="mb-2" variant="success">
                    <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon> Update brand
                </b-button>
            </b-form>
          </b-col>
          <b-col sm="6">
          </b-col>
        </b-row>
      </b-container>
    </div>
</template>

<script>
import { getExternalRequest, patchExternalRequest } from '../../api/common'
import ErrorPanel from '../common/ErrorPanel'

export default {
  components: { ErrorPanel },
  name: 'BrandUpdate',
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
  data: () => {
      return {
          brandFetch: null,

          brandName: '',
          errors: []
      }
  },
  methods: {
    nameState(nameToValidate){
        return nameToValidate.length < 2 && nameToValidate.length != 0 ? false : true
    },
    async onSubmit() {
      this.errors = []
      if (!this.isEditingAllowed){
        this.errors.push('You have no permissions for this!')  
      }
      if (this.brandName.length < 2)
        this.errors.push('The product name must be at least 2 symbols long')
      if (this.errors.length == 0) {
        let brand = {
          name: this.brandName,
        }
        let response = await patchExternalRequest('brands/' + this.$route.params.id, brand)
        if (response.status != 200)
          this.errors.push(response.data)
        else
          this.$router.push('/management')
      }
    }
  },
  async beforeMount() {
      let response = await getExternalRequest('brands/' + this.$route.params.id)
      let responseFetch = response.status == 200;
      if (responseFetch){
          let brand = response.data
          this.brandName = brand.name
          this.brandFetch = true;
      }
      else {
          this.brandFetch = false;
      }
  }
}
</script>

<style scoped>
.brand-creation-container{
    background-color: #f0f0f0;
    padding: 50px;
}
.v-select{
    background-color: white;
    border-radius: 5px;
    margin-bottom: 20px;
}
</style>
