// https://docs.cypress.io/api/introduction/api.html

import Config from '../Config';

const { email, password } = { email: 'sample@sample.com', password: 'password' };

/* Page Object */
const getEmail = () => cy.get('#email');
const getEmailError = () => cy.get('.' + Config.MY_APP_PREFIX + '-input-email .is-danger');
const getPassword = () => cy.get('#password');
const getPasswordError = () => cy.get('.' + Config.MY_APP_PREFIX + '-input-password .is-danger');

describe('Login Form Test', () => {
  beforeEach(function () {
    cy.visit('/login');
  })

  it('Login Form が 正常に開くこと', () => {
    cy.contains('h1', 'Login Form');
  });

  it('Email必須エラーが正常に動作すること', () => {
    getEmail().type('a');
    getEmail().type(`{backspace}`).blur();

    getEmailError().invoke('text').should('to.have.length.at.least', '1'); //1文字以上
  });

  it('Emailフォーマットエラーが正常に動作すること', () => {
    getEmail().type('hoge@hoge').blur();

    getEmailError().invoke('text').should('to.have.length.at.least', '1');
  });

  it('パスワード必須エラーが正常に動作すること', () => {
    getPassword().type('a');
    getPassword().type(`{backspace}`).blur();

    getPasswordError().invoke('text').should('to.have.length.at.least', '1');
  });

  it('パスワード長エラーチェックが正常に動作すること', () => {
    getPassword().type('1234567').blur();

    getPasswordError().invoke('text').should('to.have.length.at.least', '1');
  });

  it('ログインできること', () => {
    getEmail().type(email);
    getPassword().type(`${password}{enter}`);

    cy.location('pathname').should('eq', '/');
  });
});
