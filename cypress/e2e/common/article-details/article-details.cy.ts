describe('article-details', () => {
    describe('article-details', () => {
        beforeEach(() => {
            cy.login(Cypress.env('username'), Cypress.env('password'));
        });
        it('should get article details from fixtures and render them in correct way', () => {
            cy.visit('/articles/14');
            cy.intercept('http://localhost:8000/articles/14', { fixture: 'article-details.json' });
            cy.get('[data-testid=ArticleDetailsPage]').should('exist');
        });
    });
});
