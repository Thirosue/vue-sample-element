import { shallowMount, mount } from '@vue/test-utils';
import { default as _localVue } from '../lib/testHelper';
import VueRouter from 'vue-router';
import { default as _store } from '@/store';
import StaffList from '@/views/staff/StaffList.vue';
import mockFetch from '@/../tests/mockFetch';
import flushPromises from 'flush-promises';

const localVue = _localVue();
const router = new VueRouter();

/* elements */
const getFirstName = wrapper => wrapper.find('#firstName input');
const getLastName = wrapper => wrapper.find('#lastName input');
const getEmail = wrapper => wrapper.find('#email input');
const getTel = wrapper => wrapper.find('#tel input');
const getErrorAll = wrapper => wrapper.findAll('.is-danger');
const getSubmitButton = wrapper => wrapper.find('#form-submit');

/* setup */
const initMount = store => {
  const wrapper = mount(StaffList, { store, router, localVue });
  const firstName = getFirstName(wrapper);
  const lastName = getLastName(wrapper);
  const email = getEmail(wrapper);
  const tel = getTel(wrapper);
  const allErrorMsg = getErrorAll(wrapper);
  const submitButton = getSubmitButton(wrapper);
  return {
    wrapper,
    firstName,
    lastName,
    email,
    tel,
    allErrorMsg,
    submitButton
  };
}

describe('StaffList view', () => {
  let store;

  beforeEach(() => {
    store = _store;
    router.push('/').catch(err => { });
  });

  it('mount', () => {
    const wrapper = shallowMount(StaffList, { store, router, localVue });
    expect(wrapper.isVueInstance()).toBe(true);
  });

  it('初期状態で　submit が enable となる', () => {
    const { allErrorMsg, submitButton } = initMount(store);

    for (let i = 0; i < allErrorMsg.length; i++) {
      expect(allErrorMsg.at(i).text()).toHaveLength(0);
    }
    expect(submitButton.attributes().disabled).toBe(undefined);
  });


  it('全てのフィールドに正常値を入力した場合、submit が enable となる', () => {
    const { firstName, lastName, email, tel, allErrorMsg, submitButton } = initMount(store);

    firstName.setValue('firstName');
    lastName.setValue('lastName');
    email.setValue('email');
    tel.setValue('tel');
    tel.trigger('blur');

    for (let i = 0; i < allErrorMsg.length; i++) {
      expect(allErrorMsg.at(i).text()).toHaveLength(0);
    }
    expect(submitButton.attributes().disabled).toBe(undefined);
  });

  it('初期状態で検索した場合、1ページ目を表示するよう state change する', () => {
    const { wrapper, submitButton } = initMount(store);
    const $router = wrapper.vm.$router;
    const spy = jest.spyOn($router, 'push');

    submitButton.trigger('click');

    expect(spy).toHaveBeenCalled(); //pushされる
    expect(location.hash).toContain('rows=10');
    expect(location.hash).toContain('page=1');
    spy.mockRestore();
  });

  it('全てのフィールドに正常値を入力して検索した場合、入力した内容がURLパラメータに追加されること', () => {
    const { wrapper, firstName, lastName, email, tel, submitButton } = initMount(store);

    firstName.setValue('firstName');
    lastName.setValue('lastName');
    email.setValue('email');
    tel.setValue('tel');
    tel.trigger('blur');

    const $router = wrapper.vm.$router;
    const spy = jest.spyOn($router, 'push');
    submitButton.trigger('click');

    expect(spy).toHaveBeenCalled(); //pushされる
    expect(location.hash).toContain('firstName=firstName');
    expect(location.hash).toContain('lastName=lastName');
    expect(location.hash).toContain('email=email');
    expect(location.hash).toContain('tel=tel');
    spy.mockRestore();
  });

  it('URLパラメータが設定されている場合、検索条件にURLパラメータが設定されること', async () => {
    //setting mock
    const result = require('./mock/result.json');
    window.fetch = mockFetch(result);

    //setting router
    router.push({ path: '/', query: { firstName: 'firstName', lastName: 'lastName', email: 'email', tel: 'tel', rows: 10, page: 1 } });

    const { wrapper } = initMount(store);

    expect(wrapper.vm.where.firstName).toBe('firstName');
    expect(wrapper.vm.where.lastName).toBe('lastName');
    expect(wrapper.vm.where.email).toBe('email');
    expect(wrapper.vm.where.tel).toBe('tel');
  });

  it('検索結果が0件の場合、検索結果一覧が表示されないこと', async () => {
    //setting mock
    const result = require('./mock/result.2.json');
    window.fetch = mockFetch(result);

    //setting router
    router.push({ path: '/', query: { firstName: 'hoge', rows: 10, page: 1 } });

    const { wrapper } = initMount(store);

    await flushPromises();

    const resultList = wrapper.find('#result-list tbody tr');
    expect(resultList.exists()).toBe(false);
  });

  it('検索結果が12件の場合、ページャーに2ページ目が含まれること', async () => {
    //setting mock
    const result = require('./mock/result.1.json');
    window.fetch = mockFetch(result);

    //setting router
    router.push({ path: '/', query: { rows: 10, page: 1 } });

    const { wrapper } = initMount(store);

    await flushPromises();
    const resultList = wrapper.find('#result-list tr');
    expect(resultList.exists()).toBe(true);

    const pager = wrapper.find('.el-pagination');
    expect(pager.text()).toContain('2');
  });

  it('検索結果が存在する場合、検索結果の2件目が検索結果の2件目と一致すること', async () => {
    //setting mock
    const result = require('./mock/result.json');
    window.fetch = mockFetch(result);

    //setting router
    router.push({ path: '/', query: { rows: 10, page: 1 } });

    const { wrapper } = initMount(store);

    await flushPromises();

    const resultList = wrapper.findAll('#result-list tbody tr');

    // TODO 結果が2倍に増幅される
    // console.log(resultList.length);
    // expect(resultList.length).toBe(4);

    const secondRow = resultList.at(1);
    const cols = secondRow.findAll('td');
    expect(cols.at(1).text()).toBe('robert'); //firstname
    expect(cols.at(2).text()).toBe('de niro'); //lastname
    expect(cols.at(3).text()).toBe('sample@sample.com'); //email
    expect(cols.at(4).text()).toBe('09012345678'); //tel
  });
});
