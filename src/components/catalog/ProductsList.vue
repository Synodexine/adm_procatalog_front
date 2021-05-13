<template>
    <div class="list-container">
        <b-pagination
        style="margin-top: 20px"
        align="right"
        v-model="currentPage"
        :total-rows="productsGroups.length"
        :per-page="3"
        ></b-pagination>
        <b-container id='rows-container' class="bv-example-row" fluid>
            <b-row v-for="(productGroup, index) in productsGroups" :key="productGroup.uid">
                <template v-if="index+1<=currentPage*3 && index+1>(currentPage-1)*3">
                    <b-col
                    v-for="product in productGroup.products"
                    :key="product.id"
                    sm="4">
                        <b-card
                        :title="product.name" 
                        img-src="https://i.stack.imgur.com/y9DpT.jpg"
                        img-alt="Image"
                        img-top
                        img-height="300"
                        img-width="300"
                        >
                            <b-badge 
                            pill
                            variant="dark"
                            v-for="tag in product.tags"
                            :key="tag.name">
                                {{tag.name}}
                            </b-badge>
                            <template #footer>
                                <b-button size="sm">
                                    <b-icon icon="eye" aria-hidden="true"></b-icon> View
                                </b-button>
                            </template>
                        </b-card>
                    </b-col>
                </template>
            </b-row>
        </b-container>
        <b-pagination
        style="margin-top: 20px"
        align="center"
        v-model="currentPage"
        :total-rows="productsGroups.length"
        :per-page="3"
        ></b-pagination>
    </div>
</template>

<script>
import { postExternalRequest } from '../../api/common'
export default {
  name: 'ProductsList',
  props: {
      searchString: String
  },
  async beforeMount(){
    await this.searchProducts()
    let tripletsCount = 0;
    let counter = 0;
    for (let i = 0; i < this.products.length; i++){
        counter++;
        if (counter == 3){
            tripletsCount++;
            counter = 0;
        }
    }
    if (counter > 0)
        tripletsCount++
    for (let i = 0; i < tripletsCount; i++){
        this.productsGroups.push({products:[], uid: i})
    }

    counter = 0;
    let tripletCounter = 0;
    for (let i = 0; i < this.products.length; i++){
        if (counter < 3){
            this.productsGroups[tripletCounter].products.push(this.products[i])
            counter++
        }
        else {
            counter = 0;
            tripletCounter++
            i--
        }
    }
  },
  methods: {
      async searchProducts() {
            let response = await postExternalRequest('search/products/', {search_string: this.searchString})
            if (response.status == 200){
                this.products = response.data
            }
      }
  },
  data: () => {
      return {
          products: [],
          productsGroups: [],
          currentPage: 1,
      }
  }
}
</script>

<style scoped>
.list-container{
    text-align: left;
}
.card-img-top {
    object-fit: cover;
}
.card {
    margin-top: 20px;
}
.badge {
    margin-right: 5px;
    font-size: 15pt;
}
.btn {
    width: 40%;
    height: 40px;
}

</style>
