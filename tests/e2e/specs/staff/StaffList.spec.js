// https://docs.cypress.io/api/introduction/api.html

/* Page Object */
const getFirstName = () => cy.get('#firstName');
const getLastName = () => cy.get('#lastName');
const getEmail = () => cy.get('#email');
const getTel = () => cy.get('#tel');
const getSubmit = () => cy.get('#form-submit');
const getResultList = () => cy.get('#result-list tbody tr');
const getNoResult = () => cy.get('#no-result');

describe('Staff List Test', () => {
  beforeEach(function () {
    cy.login();
    cy.visit('/staffList');
    cy.viewport(1024, 1024);
  })

  it('担当者一覧 が 正常に開くこと', () => {
    cy.contains('h1', '担当者一覧');
  });

  it('フォーム未入力で検索結果が1件以上になること また ページリロードで状態が復元できること', () => {
    getSubmit().click();
    getResultList().should('to.have.length.at.least', '1');

    cy.reload();
    getResultList().should('to.have.length.at.least', '1');
  });

  it('名前を入力して検索すると、検索結果が正常に絞り込まれること また ページリロードで状態が復元できること', () => {
    getFirstName().type(`john{enter}`);
    getSubmit().click();
    getResultList().should('to.have.length.at.most', '2');

    cy.reload();
    getResultList().should('to.have.length.at.most', '2');
  });

  it('苗字を入力して検索すると、検索結果が正常に絞り込まれること また ページリロードで状態が復元できること', () => {
    getLastName().type(`doe{enter}`);
    getSubmit().click();
    getResultList().should('to.have.length.at.most', '2');

    cy.reload();
    getResultList().should('to.have.length.at.most', '2');
  });

  it('Emailを入力して検索すると、検索結果が正常に絞り込まれること また ページリロードで状態が復元できること', () => {
    getEmail().type(`hoge@sample.com{enter}`);
    getSubmit().click();
    getResultList().should('to.have.length.at.least', '1');

    cy.reload();
    getResultList().should('to.have.length.at.least', '1');
  });

  it('Telを入力して検索すると、検索結果が正常に絞り込まれること また ページリロードで状態が復元できること', () => {
    getTel().type(`09011112222{enter}`);
    getSubmit().click();
    getResultList().should('to.have.length.at.most', '2'); 

    cy.reload();
    getResultList().should('to.have.length.at.most', '2'); 
  });

  it('検索条件に合致する担当者が存在しない場合、検索結果なしとなること また ページリロードで状態が復元できること', () => {
    getFirstName().type(`hoge`);
    getLastName().type(`fuga`);
    getEmail().type(`piyo{enter}`);
    getTel().type(`09011112222{enter}`);
    getSubmit().click();
    getNoResult().invoke('text').should('to.have.length.be.at.least', '1');

    cy.reload();
    getNoResult().invoke('text').should('to.have.length.be.at.least', '1');
  });
});
