import { Users } from '../../api/users'
import {
  SET_USER_INFO,
  UPDATE_USER_INFO
} from './mutation-types.js'


const state= {
    user: {
      info: null
    }
};
const getters = {
    user: state => {
      return state.user;
    }
};
const mutations = {
    [SET_USER_INFO]: (state, payload) => {
      state.user.info = payload;
    },
    [UPDATE_USER_INFO]: (state, payload) => {
      state.user.info = payload;
    }
};
const actions = {
    GET_USER_INFO: async (context, userId) => {
      context.commit('SET_USER_INFO', await Users.getUserInfo(userId).then(response => {return response.data}))
    },
    UPDATE_USER_INFO: async (context, newPrefix) => {
      Accounts.changePrefix(newPrefix);
      context.commit('SET_USER_INFO', await Accounts.getUserInfo().then(response => {return response.data}))
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
};