<template>
    <div class="management-container">
        <b-container fluid="sm" class="bv-example-row">
        <b-row>
            <b-col sm='3'></b-col>
            <b-col sm='6'>
                <b-card
                class='text-left'
                text-variant="dark"
                title="Brands"
                sub-title="Management"
                >   
                    <b-card-text>
                        Here you can add or update brands.
                    </b-card-text>
                    <template #footer>
                        <b-button size="sm" class="mb-1" variant="primary" @click="$router.push('/brands/add')">
                            <b-icon icon="plus" aria-hidden="true"></b-icon> Add
                        </b-button>
                        <b-button size="sm" class="mb-1" style="margin-left:10px;" variant="secondary" @click="openBrandsModal">
                            <b-icon icon="pencil" aria-hidden="true"></b-icon> Edit
                        </b-button>
                    </template>
                    <b-modal id="bv-modal-brands" scrollable>
                        <template #modal-title>
                            Available brands
                        </template>
                        <div class="d-block text-center">
                            <template v-if="brands == null">
                                <div class="text-center">
                                    <b-spinner variant="primary" label="Text Centered"></b-spinner>
                                </div>
                            </template>
                            <template v-else>
                                <div v-for="brand in brands" :key="brand.id">
                                    <b-link @click="$router.push('/brands/' + brand.id + '/update')">{{brand.name}}</b-link>
                                </div>
                            </template>
                        </div>
                        <template #modal-footer class="text-right">
                            <b-button size="sm" class="mb-1" @click="$bvModal.hide('bv-modal-brands'); brands=null">Close</b-button>
                        </template>
                    </b-modal>
                </b-card>
                <b-card
                class='text-left'
                text-variant="dark"
                title="Tags"
                sub-title="Management"
                >   
                    <b-card-text>
                        Here you can add or update tags.
                    </b-card-text>
                    <template #footer>
                        <b-button size="sm" class="mb-1" variant="primary" @click="$router.push('/tags/add')">
                            <b-icon icon="plus" aria-hidden="true"></b-icon> Add
                        </b-button>
                        <b-button size="sm" class="mb-1" style="margin-left:10px;" variant="secondary" @click="openTagsModal">
                            <b-icon icon="pencil" aria-hidden="true"></b-icon> Edit
                        </b-button>
                    </template>
                    <b-modal id="bv-modal-tags" scrollable>
                        <template #modal-title>
                            Available tags
                        </template>
                        <div class="d-block text-center">
                            <template v-if="tags == null">
                                <div class="text-center">
                                    <b-spinner variant="primary" label="Text Centered"></b-spinner>
                                </div>
                            </template>
                            <template v-else>
                                <div v-for="tag in tags" :key="tag.id">
                                    <b-link @click="$router.push('/tags/' + tag.id + '/update')">{{tag.name}}</b-link>
                                </div>
                            </template>
                        </div>
                        <template #modal-footer class="text-right">
                            <b-button size="sm" class="mb-1" @click="$bvModal.hide('bv-modal-tags'); tags=null">Close</b-button>
                        </template>
                    </b-modal>
                </b-card>
            </b-col>
            <b-col sm='3'></b-col>
        </b-row>
        </b-container>
    </div>
</template>

<script>
import { getExternalRequest } from '../../api/common'

export default {
  name: 'Management',
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
  mounted(){
  },
  data:() => {
      return {
          brands: null,
          tags: null
      }
  },
  methods: {
    async openBrandsModal(){
        this.$bvModal.show('bv-modal-brands')
        await this.getBrands()
    },
    async openTagsModal(){
        this.$bvModal.show('bv-modal-tags')
        await this.getTags()
    },
    async getBrands(){
      let response = await getExternalRequest('brands/')
      this.brands = response.data
    },
    async getTags(){
      let response = await getExternalRequest('tags/')
      this.tags = response.data
    },
  }
}
</script>

<style scoped>
.management-container{
    padding: 10px;
    background-color: #f0f0f0;
    display: flex;
    align-items: flex-end;
    justify-content: center;
}
.card{
    margin-top: 10px;
    width: 100%;
    height: fit-content;
}
.card-body {
    width: 100%;
    height: fit-content;
    background: linear-gradient(#d7d7e6, #b2b6d8);
}
.card-footer{
    background: linear-gradient(#e8e8f0, #d0d1da);
}
label{
    font-size: 20pt;
}
</style>
