describe('Todos main page', () => {
    it('should add a new todo, set it as completed and remove it', () => {
        cy.visit('/');

        cy.findByRole('textbox').type('Nueva tarea{enter}');
        cy.findByText(/Nueva tarea/i).should('exist');

        cy.get('li:last-child').within(() => {
            cy.findByRole('checkbox').should('exist').click();
            cy.get('label').should('exist');

            cy.get('.remove').should('exist').click({ force: true });
        });

        cy.findByText(/Nueva tarea/i).should('not.exist');
    });

    it('should add a todo and then edit its title', () => {
        cy.visit('/');

        cy.findByRole('textbox').type('Nueva tarea_v1{enter}');
        cy.findByText(/Nueva tarea_v1/i).should('exist');

        cy.get('li:last-child').within(() => {
            cy.findByRole('textbox').should('not.exist');
            cy.get('label').should('exist').click();
            cy.findByRole('textbox').should('exist').type('{backspace}2{enter}');
        });

        cy.findByText(/Nueva tarea_v1/i).should('not.exist');
        cy.findByText(/Nueva tarea_v2/i).should('exist');
    });
});
