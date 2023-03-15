// const { it } = require("mocha")                       // used before the plagin was installed "ES6 Mocha Snippets"
/// <reference types="Cypress" />                        // to be able to use cypress commands

describe("Test Contact Us form via WebdriverUni", () => {
    const ContactUsFormUrl = 'http://www.webdriveruniversity.com/Contact-Us/contactus.html'

    it('Should be able to redirect from home page to Contact Us form', () => {
        cy.visit("http://www.webdriveruniversity.com/")
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
        cy.get('[href="Contact-Us/contactus.html"]').click()
        // or
        cy.get('#contact-us').click({force: true})              // as the button is invisible use {force:true}
        // or (suggested selector by cypress)
        cy.get('#contact-us > .thumbnail')

        cy.url('contains', ContactUsFormUrl)
        cy.request(ContactUsFormUrl).should((response) => {
            expect(response.status).to.eq(200)
        })       
    });

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
