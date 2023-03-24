/// <reference types="cypress" />

describe("All featured products names & price calculation", () => {
  it("Featured products name", () => {
    cy.visit("https://automationteststore.com/");
    cy.get("#featured .thumbnails.list-inline .prdocutname").as("productName");
    cy.get("@productName").each(($li, index, $lis) => {
      cy.log("Index " + index + " is for " + $li.text());
    });
  });

  it.only("Featured products price sum", () => {
    cy.visit("https://automationteststore.com/");
    cy.get(
      "#featured .thumbnails.list-inline .oneprice, #featured .thumbnails.list-inline .pricenew"
    )
      .invoke("text")
      .as("productPrice");

    cy.get("@productPrice").then((price) => {
      cy.log(price); // $29.50$19.00$28.00$38.50
      var itemsSum = 0;
      var itemPrice = price.split("$");

      var i;
      for (i = 0; i < itemPrice.length; i++) {
        cy.log(itemPrice[i]);
        itemsSum += Number(itemPrice[i]);
        cy.log("Items total: " + itemsSum);
      }
      expect(itemsSum).to.equal(115);
    });
  });
});
