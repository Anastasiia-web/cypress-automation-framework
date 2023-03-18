/// <reference types="cypress" />
/// <reference types="cypress-xpath" />                

describe('varifying variables, cypress commands and jquery commands', () => {
    it('Navigating to specific product pages', () => {
        cy.visit("https://automationteststore.com/")
        cy.get("[href='https\:\/\/automationteststore\.com\/index\.php\?rt\=product\/category\&path\=36']")
        cy.get("[href='https\:\/\/automationteststore\.com\/index\.php\?rt\=product\/category\&path\=43']")
        // or BETTER using part of the url creating dynamic xpath selector by Ranorex Selocity tool
        cy.get("a[href*='product/category&path=']").contains('Makeup').click()
        cy.get("a[href*='product/category&path=']").contains('Skincare').click()
    });

    it('without variable_Navigating to Makeup page', () => {
        cy.visit("https://automationteststore.com/")
        cy.get("a[href*='product/category&path=']").contains('Makeup').click()
        cy.xpath("/html//div[@id='maincontainer']/div[@class='container-fluid']//span[@class='maintext']").should("contain", "Makeup")
        // or created and verified in Ranorex Selocity
        cy.get("h1 .maintext").should("contain", "Makeup")       
    });

    it('using variable & promiss_Navigating to Makeup page', () => {
        cy.visit("https://automationteststore.com/")
        cy.get("a[href*='product/category&path=']").contains('Makeup').click()

        cy.get("h1 .maintext").then(($headerText) => {
            const headerText = $headerText.text()
            cy.log(headerText)    //  testing the assigning variable result in logs
            // Asserion 2 options:
            // 1 
            expect(headerText).is.eq('Makeup')    // Chai library
            // 2
            cy.wrap($headerText).should("contain", "Makeup")    
        })      
    });

    it.only('Validate properties of the Contact Us page', () => {
        cy.visit("https://automationteststore.com/index.php?rt=content/contact")

        // uses Cypress commands and chaining
        cy.contains('#ContactUsFrm', 'Contact Us Form').find('#field_11').should('contain', 'First name:')


        // JQuery approach
        cy.contains('#ContactUsFrm', 'Contact Us Form').then(text => {
            const firstNameText = text.find('#field_11').text()
            expect(firstNameText).to.contain('First name:')

            // Embended commands (closure)
            cy.get('#field_11').then(fnText => {
                cy.log(fnText.text())    // First name:                             - text
                cy.log(fnText)           // <div#field_11.form-group.form_field>    - the element itself
            })
        })  
    });
});
