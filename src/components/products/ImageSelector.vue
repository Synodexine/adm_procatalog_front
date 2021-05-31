<template>
    <div class="selector-container">
        <label style="font-size:14pt; margin-left: 14px; margin-bottom: -10px">Image selector</label>
        <b-container fluid="md" class="text-center">
            <b-row>
                <b-col sm="8" style="margin-top: 10px"><input :value="$store.getters.product.imageLink" @input="updateImage" :disabled="choosingSuggested" style="width: 100%" placeholder="Paste an image link"></b-col>
                <b-col sm="4" style="margin-top: 10px">
                    <b-button :disabled="searchString==''" @click="choosingSuggested=!choosingSuggested" v-b-toggle.collapse-images size="sm">Choose suggested...</b-button>
                </b-col>
            </b-row>
            <b-collapse id="collapse-images" class="mt-2">
                <template v-if="updating">
                    <div class="text-center">
                        <b-spinner variant="primary" label="Text Centered"></b-spinner>
                    </div>
                </template>
                <template v-if="!updating && images.length == 0">
                    <b-row class="text-center">
                        <b-col sm="1"></b-col>
                        <b-col sm="10">An error occured while fetching the suggested images.</b-col>
                        <b-col sm="1"></b-col>
                    </b-row>
                </template>
                <b-row v-if="!updating && images.length != 0">
                    <b-col sm="1"></b-col>
                    <b-col sm="10">
                        <template v-for="image in images">
                            <img 
                            class="img-select" 
                            :class="{selected: $store.getters.product.imageLink == image}"
                            :src="image"
                            :key="image"
                            @click="$store.dispatch('SET_IMAGE_LINK', image)">
                        </template>
                    </b-col>
                    <b-col sm="1"></b-col>
                </b-row>
                <b-row class="text-left">
                    <b-col sm="6" style="margin-top: 10px">
                        <b-button size="sm" @click="fetchImages">Update</b-button>
                        <b-button style="margin-left:10px" size="sm" variant="danger" @click="$store.dispatch('SET_IMAGE_LINK', '')">Remove selection</b-button>
                    </b-col>
                </b-row>
            </b-collapse>
        </b-container>
    </div>
</template>

<script>
import {getExternalRequest} from '../../api/common'

export default {
    name: 'ImageSelector',
    computed: {
    },
    props: {
        searchString: String,
        chosenImageLink: String
    },
    data:() => {
        return {
            images: [],
            choosingSuggested: false,
            updating: true,
        }
    },
    async beforeMount(){
        await this.fetchImages()
    },
    methods: {
        async fetchImages(){
            this.updating = true;
            this.images = [];
            let response = await getExternalRequest('internal/images-links/?search_string=' + this.searchString)
            if (response.status == 200)
                this.images = response.data.images
            this.updating = false
        },
        updateImage(e){
            this.$store.commit('SET_IMAGE_LINK', e.target.value)
        }
    }
}
</script>

<style scoped>
.selector-container{
    background-color: #d6d6d6;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 5px;
    margin-bottom: 14px;
}
.img-select{
    width: 100px;
    height: 100px;
    margin: 5px;
}
.selected{
    border: rgb(0, 89, 255) solid 5px;
    border-radius: 5px;
}
</style>
