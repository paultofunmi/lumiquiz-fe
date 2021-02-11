
describe('Visit Login Page', () => {
  it('Submit form without specifying input', () => {
    cy.visit('/login')
      cy.contains('h1', 'Login')
      cy.contains('p', 'Welcome')

      cy.get("form").submit();

      cy.contains('ul', 'Email field cannot be empty')
      cy.contains('ul', 'Ensure that Password field is not empty and is at least 5 characters')
  })
    
  it('Submit form invalid input', () => {
    cy.visit('/login')
      cy.contains('h1', 'Login')
      cy.contains('p', 'Welcome')

       cy.get('input[type="password"]').type("1234").should("have.value", "1234");


      cy.get("form").submit();

      cy.contains('ul', 'Email field cannot be empty')
      cy.contains('ul', 'Ensure that Password field is not empty and is at least 5 characters')
  })
    
  it('Submit form invalid input password', () => {
    cy.visit('/login')
      cy.contains('h1', 'Login')
      cy.contains('p', 'Welcome')

      cy.get('input[type="password"]').type("1234").should("have.value", "1234");
      cy.get('input[type="email"]').type("email@gmail.com").should("have.value", "email@gmail.com");


      cy.get("form").submit();

      cy.contains('ul', 'Ensure that Password field is not empty and is at least 5 characters')
  }) 
  
  it('Submit form with invalid email', () => {
    cy.visit('/login')
      cy.contains('h1', 'Login')
      cy.contains('p', 'Welcome')

      cy.get('input[type="password"]').type("123456").should("have.value", "123456");
      cy.get('input[type="email"]').type("email").should("have.value", "email");


      cy.get("form").submit();

      cy.contains('ul', 'The email must be a valid email address.')
  })
  it('Submit form with invalid credentials', () => {
    cy.visit('/login')
      cy.contains('h1', 'Login')
      cy.contains('p', 'Welcome')

      cy.get('input[type="password"]').type("123456").should("have.value", "123456");
      cy.get('input[type="email"]').type("email@gmail.com").should("have.value", "email@gmail.com");


      cy.get("form").submit();

      cy.contains('ul', 'Invalid Login Credentials')
  })  
})
