<template>
    <div class="product-creation-container">
      <b-container v-if="isEditingAllowed" class="bv-example-row" fluid>
        <b-row class="text-center">
          <b-col sm="6">
            <b-form class="form text-left" @submit.stop.prevent @submit="onSubmit">
                <b-form-group
                id="name-fieldset"
                description="Enter the product name."
                label="Name"
                label-for="productName"
                invalid-feedback="Enter at least 2 letters"
                :state="nameState(productName)"
                >
                    <b-form-input lazy id="name" v-model="productName" trim></b-form-input>
                </b-form-group>
                <ImageSelector :chosenImageLink="chosenImageLink" :searchString="productName"></ImageSelector>
                <label for="brand">Brand</label>
                <v-select id="brand" v-model="selectedBrand" label="name" :options="brands"></v-select>
                <label for="tags">Tags</label>
                <v-select id="tags" v-model="selectedTags" label='name' multiple :options="tags"></v-select>
                <b-card no-body>
                <b-tabs card>
                  <b-tab v-for="variant in variants" :key="'variant-tab-' + variant.id"
                  :title="variant.name ? variant.name : 'New variant'" lazy>
                    <!-- <template #title>
                      {{variant.name ? variant.name : 'New variant'}}
                      <b-icon icon="trash" variant="danger" aria-hidden="true"></b-icon>
                    </template> -->
                    <b-form-group
                    id="variant-name-fieldset"
                    description="Enter the variant name."
                    label="Variant name"
                    label-for="variant-name"
                    invalid-feedback="Enter at least 2 letters"
                    :state="nameState(variant.name)"
                    >
                      <b-form-input lazy id="variant-name" v-model="variant.name" trim></b-form-input>
                    </b-form-group>
                    <label>Attributes</label>
                    <b-table striped hover :items="variant.attributes_values">
                      <template #cell(name)="data">
                        <v-select
                        v-model="variant.attributes_values[data.index].name" 
                        label='name'
                        :reduce="(data)=>data.name"
                        @input="attrSelection(variant)"
                        :options="getAllowedAttributes(variant)"></v-select>
                      </template>
                      <template #cell(value)="data">
                        <b-form-input v-model="data.item.value"></b-form-input>
                      </template>
                    </b-table>
                    <b-button 
                    style="margin-bottom: 20px"
                    size="sm"
                    variant="danger"
                    class="float-right"
                    @click="removeVariant(variant.id)">
                      Remove variant
                    </b-button>
                  </b-tab>

                  <template #tabs-end>
                    <b-nav-item role="presentation" @click.prevent="addVariant"><b>+</b></b-nav-item>
                  </template>

                  <template #empty>
                    <div class="text-center text-muted">
                      There are no variants yet<br>
                      Create a new variant using the <b>+</b> button above.
                    </div>
                  </template>
                </b-tabs>
                </b-card>
                <ErrorPanel v-bind:errors="errors"></ErrorPanel>
                <b-button type="submit" style="margin-top: 20px" size="sm" class="mb-2">
                    <b-icon icon="plus-circle" aria-hidden="true"></b-icon> Add product
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
import { getExternalRequest, postExternalRequest } from '../../api/common'
import ErrorPanel from '../common/ErrorPanel'
import ImageSelector from './ImageSelector'

export default {
  components: { ErrorPanel, ImageSelector },
  name: 'ProductCreation',
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
          productName: '',
          chosenImageLink: '',
          brands: [],
          tags: [],
          selectedBrand: null,
          selectedTags: [],
          variants: [],
          variantsCounter: 0,
          productAllowedAttrs: [],
          errors: []
      }
  },
  methods: {
    async getBrands(){
      let response = await getExternalRequest('brands/')
      this.brands = response.data
    },
    async getTags(){
      let response = await getExternalRequest('tags/')
      this.tags = response.data
    },
    attrSelection(variant){
      for (let i=0; i < variant.attributes_values.length; i++) {
        if (['', null].includes(variant.attributes_values[i].name)){
          variant.attributes_values.splice(i, 1);
          i--;
        }
      }
      variant.attributes_values.push({name:'', value: ''})
    },
    getAllowedAttributes(variant){
      if (variant){
        let variantAllowedAttrs = []
        let selectedTagsAttrsNames = []
        let variantAttrsNames = []

        this.selectedTags.forEach(selectedTag => {
          selectedTag.attrs.forEach(attr => {
            selectedTagsAttrsNames.push(attr.name);
          })
          selectedTagsAttrsNames.push(selectedTag.name);
        })

        variant.attributes_values.forEach(attr => {
          variantAttrsNames.push(attr.name);
        })

        this.productAllowedAttrs.forEach(productAttr => {
          if (!variantAttrsNames.includes(productAttr.name) && selectedTagsAttrsNames.includes(productAttr.name)){
            variantAllowedAttrs.push(productAttr);
          }
        });
        return variantAllowedAttrs
      }
    },
    nameState(nameToValidate){
        return nameToValidate.length < 2 && nameToValidate.length != 0 ? false : true
    },
    addVariant(){
      let variant = {
        id: this.variantsCounter,
        name: '',
        attributes_values: [
          {
            name: '',
            value: ''
          }
        ]
      };
      this.variants.push(variant);
      this.variantsCounter += 1;
    },
    addAttributeValue() {
      let attributeValue = {
        name: '',
        value: '',
      };
      this.attributesValues.push(attributeValue);
    },
    removeVariant(variantId){
      for (let i = 0; i <= this.variants.length; i++) {
        if (this.variants[i].id == variantId) {
          this.variants.splice(i, 1);
          break;
        }
      }
    },
    async onSubmit() {
      this.errors = []
      if (!this.isEditingAllowed){
        this.errors.push('You have no permissions for this!')  
      }
      if (this.productName.length < 2)
        this.errors.push('The product name must be at least 2 symbols long')
      if (this.selectedBrand == null)
        this.errors.push('The brand field must not be empty')
      if (this.selectedTags.length == 0)
        this.errors.push('The tags field must not be empty')
      this.variants.forEach(variant => {
        if (variant.name < 2)
          this.errors.push('Variant name must be at least 2 symbols long. You passed: ' + variant.name)
        for (let i = 0; i < variant.attributes_values.length; i++) {
          let currentAttr = variant.attributes_values[i];
          if (currentAttr.name == null || currentAttr.name == '')
            continue
          else
            if (['', null].includes(currentAttr.value))
              this.errors.push('Variant attribute value must not be blank')
        }
      })
      console.log(this.chosenImageLink);
      if (this.errors.length == 0) {
        for (let i = 0; i < this.variants.length; i++){
          let currentVariant = this.variants[i]
          currentVariant.attributes_values.splice(currentVariant.attributes_values.length - 1, 1);
          currentVariant.attributes_values
        }
        let product = {
          name: this.productName,
          brand: {
            name: this.selectedBrand.name
          },
          tags: this.selectedTags,
          variants: this.variants,
          image_link: this.$store.getters.product.imageLink
        }
        let response = await postExternalRequest('products/', product)
        if (response.status == 200){
          this.$store.dispatch('SET_IMAGE_LINK', '')
          this.$router.push(product.id)
          for (let i = 0; i < this.variants.length; i++){
            let currentVariant = this.variants[i]
            currentVariant.attributes_values.push({name:'', value: ''})
          }
        }
        else{
            this.errors.push(response.data)
        }
      }
    }
  },
  async beforeMount() {
    this.$store.dispatch('SET_IMAGE_LINK', '')
      await this.getBrands()
      await this.getTags()
      for (let i = 0; i < this.tags.length; i++) {
        for (let j=0; j < this.tags[i].attrs.length; j++) {
          this.productAllowedAttrs.push(this.tags[i].attrs[j])
        }
      } 
  }
}
</script>

<style scoped>
.product-creation-container{
    background-color: #f0f0f0;
    padding: 50px;
}
.v-select{
    background-color: white;
    border-radius: 5px;
    margin-bottom: 20px;
}
/* .active {
  background-color: #f0f0f0;
} */
</style>
