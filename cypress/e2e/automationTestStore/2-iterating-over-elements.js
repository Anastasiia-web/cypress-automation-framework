/// <reference types="cypress" />
// /// <reference types="cypress-xpath" />            // as we do not use it here

describe("Iterate over elements", () => {
  it("Log information of all Fragrance products", () => {
    cy.visit("https://automationteststore.com/");
    // using part of the url creating dynamic xpath selector by Ranorex Selocity tool
    cy.get("a[href*='product/category&path=']").contains("Fragrance").click();
    cy.get(".fixed_wrapper .prdocutname")
      .should("have.length", 9) // assertion about the length
      .each(($li, index, $lis) => {
        cy.log("Index " + index + " is for " + $li.text()); // Index 0 is for ck one shock for him Deodorant
      });
  });

  it.only("Add specific product to the basket", () => {
    cy.visit("https://automationteststore.com/");
    // using part of the url creating dynamic xpath selector by Ranorex Selocity tool
    cy.get("a[href*='product/category&path=']").contains("Fragrance").click();
    cy.get(".fixed_wrapper .prdocutname").each(($li, index, $lis) => {
      if ($li.text() === "Gucci Guilty") {
        const name = $li.text();
        cy.wrap($li).click();

        cy.get(".bgnone").should("contain.text", name);
        cy.get(".breadcrumb").should("contain.text", name);
      }
    });
  });
});
