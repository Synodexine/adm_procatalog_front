import {
  SET_IMAGE_LINK,
} from './mutationTypes'


const state= {
    product: {
      imageLink: null,
    }
};
const getters = {
    product: state => {
      return state.product;
    }
};
const mutations = {
    [SET_IMAGE_LINK]: (state, imageLink) => {
      state.product.imageLink = imageLink;
    }
};
const actions = {
    SET_IMAGE_LINK: async (context, imageLink) => {
      context.commit('SET_IMAGE_LINK', imageLink)
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};