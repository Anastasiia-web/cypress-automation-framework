/// <reference types="cypress" />
/// <reference types="cypress-xpath" />                

describe('Iterate over elements', () => {
    it('Log information of all Hair Care products', () => {
        cy.visit("https://automationteststore.com/")
        // using part of the url creating dynamic xpath selector by Ranorex Selocity tool
        cy.get("a[href*='product/category&path=']").contains('Hair Care').click()
    });

    it('Add specific product to basket', () => {
        cy.visit("https://automationteststore.com/")
        // using part of the url creating dynamic xpath selector by Ranorex Selocity tool
        cy.get("a[href*='product/category&path=']").contains('Hair Care').click()
    });
});