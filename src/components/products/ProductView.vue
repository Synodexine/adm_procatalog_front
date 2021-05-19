<template>
    <b-container class="bv-example-row view-container" fluid>
        <b-row class="text-center">
            <b-col sm="1"></b-col>
            <b-col sm="12">
            <b-container class="bv-example-row" fluid>
                <b-row class="text-center">
                    <b-col sm="4">
                        <b-button squared variant="outline-secondary">
                            <b-icon icon="arrow-left" aria-hidden="true"></b-icon> Back
                        </b-button>
                        <b-button squared variant="outline-primary">
                            <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon> Update
                        </b-button>
                        <b-button squared variant="outline-danger">
                            <b-icon icon="trash" aria-hidden="true"></b-icon> Delete
                        </b-button>
                    </b-col>
                    <b-col sm="8"></b-col>
                </b-row>
                <b-row>
                    <b-col sm="12">
                        <b-img src="https://i.stack.imgur.com/y9DpT.jpg"></b-img>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12" class="text-left">
                        <label>Apple iphone 12  </label>
                    </b-col>
                </b-row>
            </b-container>
            </b-col>
            <b-col sm="1"></b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'ProductView',
  beforeMount(){
      this.passedProduct = this.product
  },
  props: {
      product: Object
  },
  data:() => {
      return {
          passedProduct: null,
      }
  },
  methods: {
      
  }
}
</script>

<style scoped>
.row{
    margin-top: 20px;
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
