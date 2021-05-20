<template>
    <b-container class="bv-example-row view-container" fluid>
        <b-modal id="modal-ask-delete" header-bg-variant="danger" header-text-variant="light">
            <template #modal-title>
                Delete product "{{product.name}}"
            </template>
            <div class="d-block text-center">
                <h5>Are you sure you want to <b>completely</b> delete the product?</h5>
            </div>
            <template #modal-footer>
                <b-button variant="danger" @click="deleteProduct()">
                    Yes
                </b-button>
                <b-button variant="secondary" @click="$bvModal.hide('modal-ask-delete')">
                    No
                </b-button>
            </template>
        </b-modal>
        <template v-if="productFetch == null">
            <div class="text-center">
                <b-spinner variant="primary" label="Text Centered"></b-spinner>
            </div>
        </template>
        <template v-if="productFetch == false">
            <ErrorPanel v-bind:errors="errors"></ErrorPanel>
        </template>
        <b-row v-if="productFetch" class="text-center">
            <b-col sm="1"></b-col>
            <b-col sm="12">
            <b-container class="bv-example-row" fluid>
                <b-row class="text-left">
                    <b-col sm="6">
                        <b-button-group>
                        <b-button squared variant="outline-secondary" @click="$router.go(-1)">
                            <b-icon icon="arrow-left" aria-hidden="true"></b-icon> Back
                        </b-button>
                        <b-button squared variant="outline-primary" @click="$router.push(product.id + '/update')">
                            <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon> Update
                        </b-button>
                        <b-button squared variant="outline-danger" @click="$bvModal.show('modal-ask-delete')">
                            <b-icon icon="trash" aria-hidden="true"></b-icon> Delete
                        </b-button>
                        </b-button-group>
                    </b-col>
                    <b-col sm="6"></b-col>
                </b-row>
                <b-row>
                    <b-col sm="12">
                        <b-img src="https://i.stack.imgur.com/y9DpT.jpg"></b-img>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12" class="text-center">
                        <label>{{product.brand.name}} {{product.name}}</label>
                    </b-col>
                </b-row>
                <b-row style="margin-bottom: 50px">
                    <b-col sm="12" class="text-left">
                        <b-card no-body>
                            <b-tabs card>
                                <b-tab v-for="variant in variants" :key="'variant-tab-' + variant.id"
                                :title="variant.name" lazy>
                                    <label>{{variant.name}}</label>
                                    <b-table striped hover :fields="variantsFields" :items="variant.attributes_values">
                                        <template #cell(name)="data">
                                            {{data.item.name}}
                                        </template>
                                        <template #cell(value)="data">
                                            {{data.value}}
                                        </template>
                                    </b-table>
                                </b-tab>
                            <template #empty>
                                <div class="text-center text-muted">
                                There are no variants for this product<br>
                                </div>
                            </template>
                            </b-tabs>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
            </b-col>
            <b-col sm="1"></b-col>
        </b-row>
    </b-container>
</template>

<script>
import {getExternalRequest, deleteExternalRequest} from '../../api/common'
import ErrorPanel from '../common/ErrorPanel'

export default {
  name: 'ProductView',
  components: {
      ErrorPanel
  },
  async beforeMount(){
      let response = await getExternalRequest('products/' + this.$route.params.uuid)
      this.productFetch = response.status == 200
      if (!this.productFetch)
        this.errors.push(response.data)
      
      this.product = response.data
      this.variants = this.product.variants
  },
  data:() => {
      return {
          productFetch: null,
          product: null,
          variants: [],
          errors: [],

          variantsFields: ['name', 'value']
      }
  },
  methods: {
      async deleteProduct(){
          let response = await deleteExternalRequest('/products/' + this.product.id)
          if (response.status != 204){
              this.errors = []
              this.errors.push(response.data)
          }
          else {
              this.$router.go(-1)
          }
      }
  }
}
</script>

<style scoped>
.view-container{
    background-color: #f0f0f0;
    padding: 20px;
}
.row{
    margin-top: 10px;
}
.col-sm-4 .btn{
    margin-left: 20px;
}
.view-container{
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
