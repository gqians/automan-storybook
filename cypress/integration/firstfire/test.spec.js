context('Window', () => {
	beforeEach(() => {
	  cy.visit('http://localhost:6006/')
	})
	it('cy.root() - query the root DOM element', () => {
		// https://on.cypress.io/root

		// By default, root is the document
		cy.root().should('match', 'html')
	})
})
