import Vue from 'vue'
import Vuex from 'vuex'
import * as mutation_types from './mutation_types'
import FbHelper from '../modules/fbhelper'
import { emulateGetRequest, emulateDeleteRequest } from '../modules/requests'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   windowstate :'Home',
   isLogined: false,
   postContents: '',
   postTitle: '',
   postDate: 0,
   commentId: 0,
   commentList: [],
   replyList: [],
   replyId: 0,
   product: [], // products from JSON
   errorFromServer: false, // error loading data from JSON
   loaded: false, // sets if JSON data loaded
   errorDeleting: false // error deleting
  },
  getters: {
    getIsLogined: state => state.isLogined,
    getPostContents: state => state.postContents,
    getPostTitle: state => state.postTitle,
    getPostDate: state => state.postDate,
    getCommentId: state => state.commentId,
    getCommentList: state => state.commentList,
    getReplyList: state => state.replyList,
    getReplyId: state => state.replyId,
  },
  mutations:{
    CurrentView(state,payload){
      state.windowstate = payload
    },
    [mutation_types.IS_LOGINED](state, isLogined) {
      state.isLogined = isLogined
    },
    [mutation_types.POST_CONTENTS](state, postContents) {
        state.postContents = postContents
    },
    [mutation_types.POST_TITLE](state, postTitle) {
        state.postTitle = postTitle
    },
    [mutation_types.POST_DATE](state, postDate) {
        state.postDate = postDate
    },
    [mutation_types.ADD_COMMENT](state, commentContents) {
        const commentItem = {
            date: Date.now(),
            contents: commentContents,
            id: state.commentId,
        }

        state.commentList.push(commentItem);
        state.commentId++;
    },
    [mutation_types.ADD_REPLY](state, payload) {
        const replyItem = {
            date: Date.now(),
            contents: payload.contents,
            id: state.replyId,
            commentId: payload.commentId,
        }

        state.replyList.push(replyItem);
        state.replyId++;
    },
    setProducts(state, payload) {
      state.products = payload;
    },
    setError(state, payload) {
      state.errorFromServer = payload;
    },
    setLoaded(state, payload) {
      state.loaded = payload;
    },
    deleteProduct(state, payload) {
      state.products.splice(payload, 1);
    },
    setDeletingError(state, payload) {
      state.errorDeleting = payload;
    }
  },
  actions: {
    login({ commit }) {
      const fbHelper = new FbHelper();
      return new Promise(
        function(resolve, reject){
          fbHelper.fbLogin().then(
              function(response){
              if (response.status === 'connected') {
                commit(mutation_types.IS_LOGINED, true);
                resolve(response);
              } else {
                reject(response);
              }
          })
      })
    },
    getData({ commit }) {
      // get data from JSON
      emulateGetRequest()
        .then((success) => {
          commit('setProducts', success);
          commit('setLoaded', true);
          commit('setError', false);
        })
        .catch((error) => {
          alert(error)
          commit('setError', true );
          commit('setLoaded', true);
        })
    },
    deleteProduct({ commit, state }, payload) {
      // delete data from JSON (not exactly)
      emulateDeleteRequest()
        .then((success) => {
          alert(success)
          // console.log(success);
          // if success start searching and deleting data in products

          // if we want to delete several products
          if (toString.call(payload) === '[object Array]') {
            for (let i = 0; i < payload.length; i++) {
              for (let j = 0; j < state.products.length; j++) {
                if (state.products[j].id === payload[i].id) {
                  commit("deleteProduct", j);
                }
              }
            }
          }
          // if we want to delete one product
          else if (toString.call(payload) === '[object Object]') {
            for (let j = 0; j < state.products.length; j++) {
              if (state.products[j].id === payload.id) {
                commit("deleteProduct", j)
              }
            }
          }
        })
        .catch((error) => {
          alert(error)
          commit("setDeletingError", true);
        });
    }
  }
})