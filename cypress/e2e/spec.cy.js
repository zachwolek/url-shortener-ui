describe('Shortened URL App', () => {
  beforeEach(() => {
    cy.fixture('loadpage').then((json) => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', json)
    })
  cy.visit('http://localhost:3000/')
  })
  it('should show the page title on page load', () => {
    cy.get('h1').should('contain.text', "URL Shortener")
  })
  it('should show the form', () => {
    cy.get('form')
    .get('input[name="title"]').should('exist')
    .get('input[name="urlToShorten"]').should('exist')
    .get('button').should('exist').should('contain.text', "Shorten Please!")
  })
  it('should show the existing shortened URLs', () => {
    cy.get('.URL-Container').get('.url').should('have.length', 1)
    .get('.url').first().contains('h3', "Awesome photo")
    .get('.url').first()
    .get('.short-url').should('have.text',"http://localhost:3001/useshorturl/1")
    .get('.long-url').should('have.text', "https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80")
  })
})

describe('Show Forms', () => {
  beforeEach(() => {
    cy.fixture('loadpage').then((json) => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', json)
    })
    cy.intercept("POST",'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body:    {
        "title": "New URL Box",
        "long_url": "https://example.com/example",
        "id": 2,
        "short_url": "http://localhost:3001/useshorturl/2"
      }
  })
  cy.visit('http://localhost:3000/')
  })
  it('should show information in the input value fields after filling the form', () => {
    cy.get('form')
    .get('input[name="title"]').type('New URL Box')
    .should('have.value', 'New URL Box')
    ///which do you like better? 
    .get('input[name="urlToShorten"]').type('https://example.com/example')
    .get('input[name="urlToShorten"]').should('have.value', 'https://example.com/example')
  })
  it('should show a new rendered shortened URL after the user submits the form', () => {
    cy.get('form')
    .get('input[name="title"]').type('New URL Box')
    .get('input[name="urlToShorten"]').type('https://example.com/example')
    .get('button').click()
    .get('.URL-Container').get('.url').should('have.length', 2)
    .get('.url').first().contains('h3', "Awesome photo")
    .get('.short-url').first().contains('http://localhost:3001/useshorturl/1')
    .get('.long-url').first().contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    .get('.url').last().contains('h3', "New URL Box")
    .get('.short-url').last().contains('http://localhost:3001/useshorturl/2')
    .get('.long-url').last().contains('https://example.com/example')
  })
})

// - When a user fills out and submits the form, the new shortened URL is rendered