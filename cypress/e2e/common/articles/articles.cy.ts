describe('articles', () => {
    describe('articles', () => {
        beforeEach(() => {
            cy.login(Cypress.env('username'), Cypress.env('password'));
        });
        it('should get article details from fixtures and render them in correct way', () => {
            cy.visit('/articles');
            cy.intercept('/articles?*', { fixture: 'articles.json' });
            cy.get('[data-testid=ArticlesPage]').should('exist');
        });
        it.skip('should skip the test, until route isn\'t ready', () => {
            cy.visit('/articles/create');
            cy.get('[data-testid=CreateArticlePage]').should('exist');
        });
    });
});
