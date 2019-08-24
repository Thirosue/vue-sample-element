/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import * as session from '@/store/modules/session';
import * as form from '@/store/modules/form';
import * as master from '@/store/modules/master';

Vue.use(Vuex);

export const GETTER_TYPES = {
  GET_PROCESSING: 'GET_PROCESSING',
  GET_LOADING: 'GET_LOADING',
  GET_COLLAPSE: 'GET_COLLAPSE',
  GET_PAGE: 'GET_PAGE',
};

export const MUTATION_TYPES = {
  SET_PROCESSING: 'SET_PROCESSING',
  SET_LOADING: 'SET_LOADING',
  SET_COLLAPSE: 'SET_COLLAPSE',
  SET_PAGE: 'SET_PAGE',
};

const store = new Vuex.Store({
  modules: {
    session,
    master,
    form,
  },

  state: {
    processing: false,
    loading: false,
    isCollapse: true,
    page: 1,
    mode: process.env.NODE_ENV,
  },

  getters: {
    [GETTER_TYPES.GET_PROCESSING](state) {
      return state.processing;
    },
    [GETTER_TYPES.GET_LOADING](state) {
      return state.loading;
    },
    [GETTER_TYPES.GET_COLLAPSE](state) {
      return state.isCollapse;
    },
    [GETTER_TYPES.GET_PAGE](state) {
      return state.page;
    },
  },

  mutations: {
    [MUTATION_TYPES.SET_PROCESSING](state, processing) {
      state.processing = processing;
    },
    [MUTATION_TYPES.SET_LOADING](state, loading) {
      state.loading = loading;
    },
    [MUTATION_TYPES.SET_COLLAPSE](state, isCollapse) {
      state.isCollapse = isCollapse;
    },
    [MUTATION_TYPES.SET_PAGE](state, page) {
      state.page = page;
    },
  },

  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({ storage: window.sessionStorage })],
});

export default store;
