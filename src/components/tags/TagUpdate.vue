<template>
    <div class="tag-creation-container">
          <template v-if="attrsFetched == null">
            <div class="text-center">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
        </template>
        <template v-if="attrsFetched == false">
            <div class="text-center">
                An error occured fetching available attributes.
            </div>
        </template>
      <b-container v-if="isEditingAllowed && attrsFetched" class="bv-example-row" fluid>
        <b-row class="text-center">
          <b-col sm="6">
            <b-form class="form text-left" @submit.stop.prevent @submit="onSubmit">
                <b-form-group
                id="name-fieldset"
                description="Enter the tag name."
                label="Name"
                label-for="name"
                invalid-feedback="Enter at least 2 letters"
                :state="nameState(tagName)"
                >
                    <b-form-input lazy id="name" v-model="tagName" trim></b-form-input>
                </b-form-group>
                <v-select taggable multiple v-model="attrs" label="name" :options="fetchedAttrs"/>
                <ErrorPanel v-bind:errors="errors"></ErrorPanel>
                <b-button style="margin-top: 20px; margin-right: 10px;" size="sm" class="mb-2" variant="secondary" @click="$router.go(-1)">
                  <b-icon icon="arrow-left" aria-hidden="true"></b-icon> Back
                </b-button>
                <b-button type="submit" style="margin-top: 20px" size="sm" class="mb-2" variant="success">
                    <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon> Update tag
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
  name: 'TagUpdate',
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
          tagName: '',
          attrsFetched: null,
          tagFetched: null,
          fetchedAttrs: [],
          attrs: [],
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
      if (this.tagName.length < 2)
        this.errors.push('The tag name must be at least 2 symbols long')
      if (this.errors.length == 0) {
        let tagName = {
          name: this.tagName,
          attrs: this.attrs,
        }
        let response = await patchExternalRequest('tags/' +this.$route.params.id, tagName)
        if (response.status == 200){
          this.$router.push('/management')
        }
        else{
            this.errors.push(response.data.detail)
        }
      }
    }
  },
  async beforeMount() {
    let response = await getExternalRequest('tags/' + this.$route.params.id)
    let responseFetch = response.status == 200;
    if (responseFetch){
        let tag = response.data
        this.tagName = tag.name
        this.attrs = tag.attrs
        this.tag = true;
    }
    else {
        this.tagFetched = false;
    }
    response = await getExternalRequest('attributes/')
    if (response.status == 200){
      this.fetchedAttrs = response.data
      this.attrsFetched = true
    }
    else
      this.attrsFetched = false
  }
}
</script>

<style scoped>
.tag-creation-container{
    background-color: #f0f0f0;
    padding: 50px;
}
.v-select{
    background-color: white;
    border-radius: 5px;
    margin-bottom: 20px;
}
</style>
