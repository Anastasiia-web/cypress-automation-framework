/// <reference types="cypress" />

describe("Calculate total of normal & sale products", () => {
  it("Calculate total of normal and sale products", () => {
    cy.visit("https://automationteststore.com/");
    cy.get(".thumbnail").as("productThumbnail");
    // cy.get('@productThumbnail').find('.oneprice').each(($el, index, $list) => {
    //     cy.log($el.text());
    // });
    cy.get(".thumbnail").find(".oneprice").invoke("text").as("itemPrice");

    var itemsTotal = 0;

    cy.get("@itemPrice").then(($linkText) => {
      var itemsPriceTotal = 0;
      var itemPrice = $linkText.split("$");
      var i;
      for (i = 0; i < itemPrice.length; i++) {
        cy.log(itemPrice[i]);
        itemsPriceTotal += Number(itemPrice[i]);
      }
      itemsTotal += itemsPriceTotal;
      cy.log("Non sale price items total: " + "$" + itemsPriceTotal);
    });
  });

  it("Calculate total of sale products", () => {
    cy.visit("https://automationteststore.com/");
    cy.get(".thumbnail").as("productThumbnail");

    cy.get(".thumbnail").find(".pricenew").invoke("text").as("saleItemPrice");

    var itemsTotal = 0;

    cy.get("@saleItemPrice").then(($linkText) => {
      var itemsPriceTotal = 0;
      var itemPrice = $linkText.split("$");
      var i;
      for (i = 0; i < itemPrice.length; i++) {
        cy.log(itemPrice[i]);
        itemsPriceTotal += Number(itemPrice[i]);
      }
      itemsTotal += itemsPriceTotal;
      cy.log("Sale price items total: " + "$" + itemsPriceTotal);
    });
  });
});
