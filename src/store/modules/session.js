/* eslint-disable */

import { buildModuleTypes } from '@/helpers';

const moduleName = 'session';
const GETTER_TYPES = {
  VALUES: 'VALUES',
  IS_LOGIN: 'IS_LOGIN',
};
const MUTATION_TYPES = {
  SET_VALUES: 'SET_VALUES',
  CLEAR_VALUES: 'CLEAR_VALUES',
};

export const SESSION_GETTER_TYPES = buildModuleTypes({
  moduleName,
  types: GETTER_TYPES,
});

export const SESSION_MUTATION_TYPES = buildModuleTypes({
  moduleName,
  types: MUTATION_TYPES,
});

export const namespaced = true;

export const state = {
  values: null,
};

export const getters = {
  [GETTER_TYPES.VALUES](state) {
    if (state.values === null) {
      return {};
    }
    return state.values;
  },
  [GETTER_TYPES.IS_LOGIN](state) {
    return state.values !== null;
  },
};

export const mutations = {
  [MUTATION_TYPES.SET_VALUES](state, values) {
    state.values = values;
  },

  [MUTATION_TYPES.CLEAR_VALUES](state) {
    state.values = null;
  },
};
