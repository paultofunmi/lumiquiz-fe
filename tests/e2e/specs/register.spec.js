
describe('Visit Register Page', () => {
  it('Submit form without specifying inputs', () => {
    cy.visit('/register')
    cy.contains('h1', 'Register')
    cy.contains('p', 'Join us today')

    cy.get("form").submit();

    cy.contains('ul', 'Email field cannot be empty')
    cy.contains('ul', 'Username field cannot be empty')
    cy.contains('ul', 'Ensure that Password confirmation field is not empty')
    cy.contains('ul', 'Ensure that Password field is not empty and is at least 5 characters')
  })
    
  it('Submit form with filled invalid inputs', () => {
    cy.visit('/register')
    cy.contains('h1', 'Register')
    cy.contains('p', 'Join us today')

    cy.get('input[name="password"]').type("1234").should("have.value", "1234");


    cy.get("form").submit();

    cy.contains('ul', 'Email field cannot be empty')
    cy.contains('ul', 'Username field cannot be empty')
    cy.contains('ul', 'Ensure that Password confirmation field is not empty')
    cy.contains('ul', 'Ensure that Password field is not empty and is at least 5 characters')
  })
    
  it('Submit form with non-matching password fields', () => {
    cy.visit('/register')
    cy.contains('h1', 'Register')
    cy.contains('p', 'Join us today')

    cy.get('input[name="password"]').type("123456").should("have.value", "123456");
    cy.get('input[name="password-confirm"]').type("1234567").should("have.value", "1234567");
    cy.get('input[name="username"]').type("username").should("have.value", "username");
    cy.get('input[name="email"]').type("email").should("have.value", "email");


    cy.get("form").submit();

    cy.contains('ul', 'Ensure that password field and password confirm field matches')    
  })  
    
  it('Submit form with an invalid email', () => {
    cy.visit('/register')
    cy.contains('h1', 'Register')
    cy.contains('p', 'Join us today')

    cy.get('input[name="password"]').type("123456").should("have.value", "123456");
    cy.get('input[name="password-confirm"]').type("123456").should("have.value", "123456");
    cy.get('input[name="username"]').type("username").should("have.value", "username");
    cy.get('input[name="email"]').type("email").should("have.value", "email");


    cy.get("form").submit();

    cy.contains('ul', 'The email must be a valid email address')    
  })   
  
  it('Submit form with an valid inputs', () => {
    cy.visit('/register')
    cy.contains('h1', 'Register')
    cy.contains('p', 'Join us today')

    cy.get('input[name="password"]').type("123456").should("have.value", "123456");
    cy.get('input[name="password-confirm"]').type("123456").should("have.value", "123456");
    cy.get('input[name="username"]').type("username").should("have.value", "username");
    cy.get('input[name="email"]').type("tester.account@gmail.com").should("have.value", "tester.account@gmail.com");


    cy.get("form").submit();

    cy.contains('h1', 'Movie Search')    
  })   
  
  it('Submit form with duplicate inputs', () => {
    cy.visit('/register')
    cy.contains('h1', 'Register')
    cy.contains('p', 'Join us today')

    cy.get('input[name="password"]').type("123456").should("have.value", "123456");
    cy.get('input[name="password-confirm"]').type("123456").should("have.value", "123456");
    cy.get('input[name="username"]').type("username").should("have.value", "username");
    cy.get('input[name="email"]').type("tester.account@gmail.com").should("have.value", "tester.account@gmail.com");


    cy.get("form").submit();

    cy.contains('ul', 'The name has already been taken.')      
    cy.contains('ul', 'The email has already been taken.')      
  })     
})
