/// <reference types="cypress" />
// /// <reference types="cypress-xpath" />            // as we do not use it here

describe("Alias and invoke", () => {
  it("Validate a specific hair care product", () => {
    cy.visit("https://automationteststore.com/");
    // using part of the url creating dynamic xpath selector by Ranorex Selocity tool
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
    cy.get(".fixed_wrapper .prdocutname")
      .eq(0)
      .invoke("text")
      .as("productThumbnail");
    cy.get("@productThumbnail").its("length").should("be.gt", 5); // length is greater than 5
    cy.get("@productThumbnail").should("include", "Seaweed Conditioner");
  });

  it("Validate products number on the page and icon title", () => {
    cy.visit("https://automationteststore.com/");
    cy.get(".prdocutname").should("have.length", 16); // counts products number on the page
    cy.get(".thumbnail").as("iconText");
    cy.get("@iconText")
      .find(".productcart")
      .invoke("attr", "title")
      .should("contain", "Add to Cart");
  });

  it.only("Calculate numbers of total and sale products", () => {
    cy.visit("https://automationteststore.com/");
    // cy.get(".prdocutname").should("have.length", 16); // counts products number on the page
    cy.get(".priceold").invoke("contain").as("sale");
    cy.log("@sale");
  });
});
