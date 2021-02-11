describe('Home page test', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('h1', 'LumiQuiz')
    cy.contains('p', 'Rate Movies & Rank on Leaderboard')
  })
})
