import { USER_LOCALSTORAGE_KEY } from '../../src/shared/const/localstorage';

Cypress.Commands.add(
    'login',
    (username: string, password: string) => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/login',
            body: {
                username,
                password,
            },
        }).then(({ body }) => {
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
        });
    },
);

declare global {
  namespace Cypress {
    interface Chainable {
      login(username: string, password: string): Chainable<void>;
    }
  }
}
export {};
