/// <reference types="cypress" />
// /// <reference types="cypress-xpath" />            // as we do not use it here

describe("Iterate over elements", () => {
  it("Log information of all Hair Care products", () => {
    cy.visit("https://automationteststore.com/");
    // using part of the url creating dynamic xpath selector by Ranorex Selocity tool
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    cy.get(".fixed_wrapper .prdocutname")
      // .should("have.length", 4)    // if we want to add the assertion about the length
      .each(($li, index, $lis) => {
        cy.log("Index " + index + " is for " + $li.text()); // Index 0 is for Seaweed Conditioner; Index 1 is for The Vert Shampoo
      });
  });

  it("Add specific product to basket", () => {
    cy.visit("https://automationteststore.com/");
    // using part of the url creating dynamic xpath selector by Ranorex Selocity tool
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    cy.get(".fixed_wrapper .prdocutname").each(($li, index, $lis) => {
      // index, $lis are not used here yet
      if ($li.text().includes("Curls to straight Shampoo")) {
        cy.wrap($li).click();
        cy.get(".breadcrumb").should("contain", "Curls to straight Shampoo");
        cy.get(".bgnone").should("contain", "Curls to straight Shampoo");
      }
    });
  });

  it.only("Add first product to basket", () => {
    cy.visit("https://automationteststore.com/");
    // using part of the url creating dynamic xpath selector by Ranorex Selocity tool
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    cy.get(".fixed_wrapper .prdocutname")
      .first() // or .eq(0);      = 0 index
      .then((firstProduct) => {
        const firstProductName = firstProduct.text();
        cy.get(firstProduct).click();
        cy.get(".breadcrumb").should("contain", firstProductName);
        cy.get(".bgnone").should("contain", firstProductName);
      });
  });
});
