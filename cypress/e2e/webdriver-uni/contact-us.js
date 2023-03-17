// const { it } = require("mocha")                       // used before the plagin was installed "ES6 Mocha Snippets"
/// <reference types="Cypress" />                        // to be able to use cypress commands

describe("Test Contact Us form via WebdriverUni", () => {

    it("Should be able to submit a successful submission via Contact Us form", () => {
        cy.visit(ContactUsFormUrl)
        cy.get('[action="contact_us.php"]').find('[placeholder="First Name"]').type("Anastasiia")
        cy.get('[action="contact_us.php"]').find('[placeholder="Last Name"]').type("Ivashchenko")
        cy.get('[action="contact_us.php"]').find('[placeholder="Email Address"]').type("i@gmail.com")
        cy.get('[action="contact_us.php"]').find('[placeholder="Comments"]').type("Hi)")
        cy.get('[value="SUBMIT"]').click()
        cy.get('h1').should('contain', "Thank You for your Message!")
    })


    it("Should not be able to submit a successful submission via Contact Us form as all fields are required", () => {
        cy.visit(ContactUsFormUrl)
        cy.get('[action="contact_us.php"]').find('[placeholder="First Name"]').type("Anastasiia")
        cy.get('[action="contact_us.php"]').find('[placeholder="Last Name"]').type("Ivashchenko")
        cy.get('[action="contact_us.php"]').find('[placeholder="Comments"]').type("Hi)")
        cy.get('[value="SUBMIT"]').click()
        cy.get('body').should('contain', "Error: all fields are required").and('contain', "Error: Invalid email address")
        //or
        cy.get('body').contains("Error: all fields are required Error: Invalid email address")
    })
})
