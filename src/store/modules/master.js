/* eslint-disable */

import { buildModuleTypes } from '@/helpers';

const moduleName = 'master';
const GETTER_TYPES = {
  CODE_CATEGORIES: 'CODE_CATEGORIES',
  INQUIRY_CATEGORIES: 'INQUIRY_CATEGORIES',
  INQUIRY_GENRE: 'INQUIRY_GENRE',
  SEX: 'SEX',
};
const MUTATION_TYPES = {
  SET_CODE_CATEGORIES: 'SET_CODE_CATEGORIES',
  SET_INQUIRY_CATEGORIES: 'SET_INQUIRY_CATEGORIES',
  SET_INQUIRY_GENRE: 'SET_INQUIRY_GENRE',
  SET_SEX: 'SET_SEX',
  CLEAR_VALUES: 'CLEAR_VALUES',
};

export const MASTER_GETTER_TYPES = buildModuleTypes({
  moduleName,
  types: GETTER_TYPES,
});

export const MASTER_MUTATION_TYPES = buildModuleTypes({
  moduleName,
  types: MUTATION_TYPES,
});

export const namespaced = true;

export const state = {
  codeCategories: null,
  inquiryCategories: null,
  inquiryGenre: null,
  sex: null,
};

export const getters = {
  [GETTER_TYPES.CODE_CATEGORIES](state) {
    if (state.codeCategories === null) {
      return {};
    }
    return state.codeCategories;
  },
  [GETTER_TYPES.INQUIRY_CATEGORIES](state) {
    if (state.inquiryCategories === null) {
      return {};
    }
    return state.inquiryCategories;
  },
  [GETTER_TYPES.INQUIRY_GENRE](state) {
    if (state.inquiryGenre === null) {
      return {};
    }
    return state.inquiryGenre;
  },
  [GETTER_TYPES.SEX](state) {
    if (state.sex === null) {
      return {};
    }
    return state.sex;
  },
};

export const mutations = {
  [MUTATION_TYPES.SET_CODE_CATEGORIES](state, values) {
    state.codeCategories = values;
  },
  [MUTATION_TYPES.SET_INQUIRY_CATEGORIES](state, values) {
    state.inquiryCategories = values;
  },
  [MUTATION_TYPES.SET_INQUIRY_GENRE](state, values) {
    state.inquiryGenre = values;
  },
  [MUTATION_TYPES.SET_SEX](state, values) {
    state.sex = values;
  },

  [MUTATION_TYPES.CLEAR_VALUES](state) {
    state.codeCategories = null;
    state.inquiryCategories = null;
    state.inquiryGenre = null;
    state.sex = null;
  },
};
