Cypress.Commands.add('fillMandatoryFieldsAndSubmit', user => {
    cy.get('#firstName').type(user.firstName)
    cy.get('#lastName').type(user.lastName)
    cy.get('#email').type(user.email)
    cy.get('#open-text-area').type(user.message, { delay: 100 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
})  