import is from 'is_js';
import querystring from 'querystring'; // eslint-disable-line

class Api {
  /** *******************
   * Get Settings
   * ****************** */
  static makeGetUrl
    = (base, where) => base + (is.empty(where) ? '' : `?${querystring.stringify(where)}`);

  // get filter
  /* filter implements */
  static searchEnd = response => response;

  static checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  };

  static toJson = response => response.json();

  static toText = response => response.text();

  static fetchGet
    = (base, where = {}) => window.fetch(this.makeGetUrl(base, where), {
      method: 'GET',
    }).then(this.searchEnd).then(this.checkStatus);

  /** *******************
   * Post/Put Settings
   * ****************** */
  static submitButton = () => document.querySelectorAll('.button');

  static updateHeader = ({
    'X-Requested-With': 'csrf', // csrf header
    'Content-Type': 'application/json',
  });

  /* filter implements */
  static updateStartFilter = () => { };

  /* filter implements */
  static updateEndFilter = () => { };

  static updatehEnd = (response) => {
    this.updateEndFilter();
    return response;
  };

  static postBase = (url, data) => {
    this.updateStartFilter();
    return window.fetch(url, {
      method: 'POST',
      headers: this.updateHeader,
      body: JSON.stringify(data),
    });
  };

  static putBase = (url, data) => {
    this.updateStartFilter();
    return window.fetch(url, {
      method: 'PUT',
      headers: this.updateHeader,
      body: JSON.stringify(data),
    });
  };

  static fetchPost =
    (url, data) => this.postBase(url, data).then(this.updatehEnd).then(this.checkStatus);

  static fetchPut =
    (url, data) => this.putBase(url, data).then(this.updatehEnd).then(this.checkStatus);

  /** *******************
   * Delete Settings
   * ****************** */
  static fetchDelete = url => window.fetch(url, {
    method: 'DELETE',
    headers: this.updateHeader,
  }).then(this.checkStatus);
}

const API_CONFIG = {};
API_CONFIG.HOST = window.location.origin;
API_CONFIG.BASE_URL = `${API_CONFIG.HOST}/admin`;
API_CONFIG.ENDPOINT_LOG = `${API_CONFIG.BASE_URL}/api/log`;
API_CONFIG.ENDPOINT_AUTH = `${API_CONFIG.BASE_URL}/api/auth`;
API_CONFIG.ENDPOINT_STAFF = `${API_CONFIG.BASE_URL}/api/staff`;
API_CONFIG.ENDPOINT_CODE = `${API_CONFIG.BASE_URL}/api/code`;
API_CONFIG.ENDPOINT_INQUIRY = `${API_CONFIG.BASE_URL}/api/inquiry`;
API_CONFIG.ENDPOINT_TRANSLATE = `${API_CONFIG.BASE_URL}/api/translate`;
API_CONFIG.ENDPOINT_HOLIDAY = `${API_CONFIG.BASE_URL}/api/holiday`;

/** *******************
 * API Settings
 * ****************** */
export const logApi = {
  access: path => Api.fetchGet(`${API_CONFIG.ENDPOINT_LOG}/access`, path),
  error: data => Api.fetchPost(`${API_CONFIG.ENDPOINT_LOG}/error`, data),
};

export const authApi = {
  doAuth: loginInfo => Api.fetchPost(API_CONFIG.ENDPOINT_AUTH, loginInfo).then(Api.toJson),
  checkSession: () => Api.fetchPut(API_CONFIG.ENDPOINT_AUTH).then(Api.toJson),
  logout: () => Api.fetchDelete(API_CONFIG.ENDPOINT_AUTH).then(Api.toJson),
};

export const masterApi = {
  getCodeCategory: () => Api.fetchGet(`${API_CONFIG.BASE_URL}/api/codeCategory`).then(Api.toJson),
  getInquiryCategory: () => Api.fetchGet(`${API_CONFIG.BASE_URL}/api/inquiry/category`).then(Api.toJson),
  getInquiryGenre: () => Api.fetchGet(`${API_CONFIG.BASE_URL}/api/inquiry/genre`).then(Api.toJson),
  getSex: () => Api.fetchGet(`${API_CONFIG.BASE_URL}/api/inquiry/sex`).then(Api.toJson),
};

export const staffApi = {
  findAll: where => Api.fetchGet(API_CONFIG.ENDPOINT_STAFF, where).then(Api.toJson),
  findById: id => Api.fetchGet(`${API_CONFIG.ENDPOINT_STAFF}/${id}`).then(Api.toJson),
  create: data => Api.fetchPost(API_CONFIG.ENDPOINT_STAFF, data).then(Api.toJson),
  update: data => Api.fetchPut(API_CONFIG.ENDPOINT_STAFF, data).then(Api.toJson),
  delete: id => Api.fetchDelete(`${API_CONFIG.ENDPOINT_STAFF}/${id}`).then(Api.toJson),
  changePassword: data => Api.fetchPost(`${API_CONFIG.ENDPOINT_STAFF}/updatePassword`, data).then(Api.toJson),
};

export const codeApi = {
  findAll: where => Api.fetchGet(API_CONFIG.ENDPOINT_CODE, where).then(Api.toJson),
  findById: id => Api.fetchGet(`${API_CONFIG.ENDPOINT_CODE}/${id}`).then(Api.toJson),
  create: data => Api.fetchPost(API_CONFIG.ENDPOINT_CODE, data).then(Api.toJson),
  update: data => Api.fetchPut(API_CONFIG.ENDPOINT_CODE, data).then(Api.toJson),
  delete: id => Api.fetchDelete(`${API_CONFIG.ENDPOINT_CODE}/${id}`).then(Api.toJson),
};

export const inquiryApi = {
  findAll: where => Api.fetchGet(API_CONFIG.ENDPOINT_INQUIRY, where).then(Api.toJson),
  create: data => Api.fetchPost(API_CONFIG.ENDPOINT_INQUIRY, data).then(Api.toJson),
};

export const holidayApi = {
  findAll: where => Api.fetchGet(API_CONFIG.ENDPOINT_HOLIDAY, where).then(Api.toJson),
  findById: id => Api.fetchGet(`${API_CONFIG.ENDPOINT_HOLIDAY}/${id}`).then(Api.toJson),
  create: data => Api.fetchPost(API_CONFIG.ENDPOINT_HOLIDAY, data).then(Api.toJson),
  update: data => Api.fetchPut(API_CONFIG.ENDPOINT_HOLIDAY, data).then(Api.toJson),
  delete: id => Api.fetchDelete(`${API_CONFIG.ENDPOINT_HOLIDAY}/${id}`).then(Api.toJson),
};

