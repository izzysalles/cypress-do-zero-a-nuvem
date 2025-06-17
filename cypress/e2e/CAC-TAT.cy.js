describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Mensagem de teste ', 10)

    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 50 })
    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('testegmail,com')
    cy.get('#open-text-area').type('Mensagem de teste', { delay: 100 })
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
      .type('abcdefghij')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Mensagem de teste', { delay: 100 })
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('João')
      .should('have.value', 'João')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .type('Silva')
      .should('have.value', 'Silva')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .type('teste@gmail.com')
      .should('have.value', 'teste@gmail.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .type('1234567890')
      .should('have.value', '1234567890')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit({
      firstName: 'João',
      lastName: 'Silva',
      email: 'teste@gmail.com',
      message: 'Mensagem de teste'
    })
  })
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube')   
    cy.get('#product').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria')   
    cy.get('#product').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select('blog')   
    cy.get('#product').should('have.value', 'blog')
  })
  it('marca o tipo de atendimento "Feedback"', () => {
   cy.get('[type="radio"]').check('feedback')
   cy.get('[type="radio"]').should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
   cy.get('[type="radio"]').each(($radio) => {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('#email-checkbox').check()
    cy.get('#phone-checkbox').check()
    cy.get('#email-checkbox').should('be.checked')
    cy.get('#phone-checkbox').should('be.checked')

    cy.get('#phone-checkbox').uncheck()
    cy.get('#phone-checkbox').should('not.be.checked')
  })

  it.only('exibe mensagem de erro ao submeter o formulário com um arquivo que não é imagem', () => {
    cy.get('#firstName').type('João')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#open-text-area').type('Mensagem de teste', { delay: 100 })
    cy.get('#phone-checkbox').check()
    cy.get('#phone-checkbox').should('be.checked')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
})