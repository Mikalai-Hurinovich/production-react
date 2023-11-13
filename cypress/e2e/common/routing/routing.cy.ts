describe('routing', () => {
    describe('unauthorized user', () => {
        it('should have Main page access', () => {
            cy.visit('/');
            cy.get('[data-testid=MainPage]').should('exist');
        });
        it('should have About page access', () => {
            cy.visit('/about');
            cy.get('[data-testid=AboutPage]').should('exist');
        });
        it('shouldn\'t have Profile page access and have toast appeared', () => {
            cy.visit('/profile/1');
            cy.get('[data-testid=MainPage]').should('exist');
            cy.contains('You are not authorized to visit this page').should('exist');
        });
        it('should open "not found" page if route doesn\'t exist', () => {
            cy.visit('/awdawda');
            cy.get('[data-testid=NotFoundPage]').should('exist');
        });
    });
    describe('authorized user', () => {
        beforeEach(() => {
            cy.visit('/');
            cy.get('[data-testid=authActions]').click().contains('Login').click();
            cy.get('input').first().type('admin');
            cy.get('input').last().type('123');
            cy.contains('Login').click();
            cy.get('a[href="/articles"]').should('exist');
        });
        it('should have Main page access', () => {
            cy.visit('/');
            cy.get('[data-testid=MainPage]').should('exist');
        });
        it('should have About page access', () => {
            cy.visit('/about');
            cy.get('[data-testid=AboutPage]').should('exist');
        });
        it('should have Profile page access', () => {
            cy.visit('/profile/1');
            cy.get('[data-testid=ProfilePage]').should('exist');
        });
    });
});
