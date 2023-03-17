/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

describe("Test Contact Us form via Automation Test Store", () => {
    it("Should be able to submit a successful submission via Contact Us form - css selectors", () => {
        cy.visit("https://www.automationteststore.com/");
        cy.get('.info_links_footer > :nth-child(5) > a').click();
        cy.get('#ContactUsFrm_first_name').type("Joe");
        cy.get('#ContactUsFrm_email').type("joe@gmail.com");
        cy.get('#ContactUsFrm_enquiry').type("Do you provide an additional discount on bulk orders?");
        cy.get('.col-md-6 > .btn').click()
    })

    it("1_Should be able to submit a successful submission via Contact Us form - XPath selectors with XPath and Ranorex Selocity plugins", () => {
        cy.visit("https://www.automationteststore.com/");
        cy.xpath("//a[contains(@href, 'contact')]").click();
        cy.get('#ContactUsFrm_first_name').type("Joe");
        cy.get('#ContactUsFrm_email').type("joe@gmail.com");
        cy.get('#ContactUsFrm_enquiry').type("Do you provide an additional discount on bulk orders?");
        cy.get('.col-md-6 > .btn').click()
    })

    it("2_Should be able to submit a successful submission via Contact Us form - optimized XPath selectors with XPath and Ranorex Selocity plugins", () => {
        cy.visit("https://www.automationteststore.com/");
        cy.get("a[href$='contact']").click();                  // created with Ranorex Selocity tool
        cy.get('#ContactUsFrm_first_name').type("Joe");
        cy.get('#ContactUsFrm_email').type("joe@gmail.com");
        cy.get('#ContactUsFrm_email').should('have.attr', 'name', 'email')    // testing the email attribute exists
        cy.get('#ContactUsFrm_enquiry').type("Do you provide an additional discount on bulk orders?");
        cy.get("button[title='Submit']").click()

        // cy.get('.mb40 > :nth-child(3)').should('contain', 'Your enquiry has been successfully sent to the store owner!')
        // or
        cy.get('.mb40 > :nth-child(3)').should('have.text', 'Your enquiry has been successfully sent to the store owner!')
    })

    it("Should NOT be able to submit a successful submission via Contact Us form with the string which has not an email validation", () => {
        cy.visit("https://www.automationteststore.com/");
        cy.get("a[href$='contact']").click();                  // created with Ranorex Selocity tool
        cy.get('#ContactUsFrm_first_name').type("Joe");
        cy.get('#ContactUsFrm_email').type("joeddddddddd");
        cy.get('#ContactUsFrm_email').should('have.attr', 'name', 'email')    // testing the email attribute exists
        cy.get('#ContactUsFrm_enquiry').type("Do you provide an additional discount on bulk orders?");
        cy.get("button[title='Submit']").click();

        cy.get('.element_error').should('be.visible').and('contain.text', 'E-Mail Address does not appear to be valid!').and('have.css', 'color', 'rgb(225, 69, 41)')
    })

    // it("Should not be able to submit a successful submission via Contact Us form as all fields are required", () => {

    // })
})

describe("Example_Using Promiss_Test Contact Us form via Automation Test Store", () => {
    it("Should be able to submit a successful submission via contact us form", () => {
        cy.visit("https://www.automationteststore.com/");
        cy.get("a[href$='contact']").click().then(function(linkText){
            cy.log("Clicked on link using text: " + linkText.text())
        })
        //cy.xpath("//a[contains(@href, 'contact')]").click();
        cy.get('#ContactUsFrm_first_name').type("Joe");
        cy.get('#ContactUsFrm_email').type("joe_blogs123@gmail.com");
        cy.get('#ContactUsFrm_email').should('have.attr', 'name', 'email')
        cy.get('#ContactUsFrm_enquiry').type("Do you provide additional discount on bulk orders?")
        cy.get("button[title='Submit']").click();
        cy.get('.mb40 > :nth-child(3)').should('have.text', 'Your enquiry has been successfully sent to the store owner!')
        cy.log("Test has completed!");
    });
})