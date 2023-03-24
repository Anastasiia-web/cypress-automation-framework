/// <reference types="cypress" />

describe("All featured products names & price calculation", () => {
  it("Latest products names + length + clcik index 0", () => {
    cy.visit("https://automationteststore.com/");
    cy.get("#latest .prdocutname").each(($li, index, $lis) => {
      const name = $li.text();
      cy.log(name);
    });
    cy.get("#latest .prdocutname").should("have.length", 4);
    cy.get("#latest .prdocutname").first().click();
  });

  it.only("Latest products prices sum", () => {
    cy.visit("https://automationteststore.com/");

    cy.get("#latest .oneprice, #latest .pricenew").invoke("text").as("price");
    cy.get("@price").then((price) => {
      // cy.log(price.split("$"));
      var sumTotal = 0;
      var itemPrice = price.split("$");
      var i;
      for (i = 0; i < itemPrice.length; i++) {
        sumTotal += Number(itemPrice[i]);
        // cy.log(sumTotal); // 198
      }
      expect(sumTotal).to.eq(198);
    });
  });
});
