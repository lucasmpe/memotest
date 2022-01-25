/// <reference types="Cypress" />

const URL = '127.0.0.1:8080';
const NUMERO_CARTAS = 20;

context('Memotest', () => {

    before(() => {
        cy.visit(URL);
    });

    it('se asegura que haya un tablero con cartas', () => {
        cy.get('#tablero').find('.carta').should('have.length', NUMERO_CARTAS);
    });

    it('se asegura que haya un tablero con imagenes', () => {
        cy.get('#tablero').find('.frente').should('have.length', NUMERO_CARTAS);
    });

    it('se asegura que las cartas sean aleatorias', () => {
        cy.get('.frente').then((imagenes) => {
            let imagenesOriginales = [];
            imagenes.each(function(i, imagen) {  
                imagenesOriginales.push(imagen.src);
            });
        
            cy.visit(URL);

            let imagenesNuevas = [];
            cy.get('.frente').then((imagenes) => {
                imagenes.each(function(i, imagen) {
                    imagenesNuevas.push(imagen.src);
                });
                cy.wrap(imagenesOriginales).should('not.deep.equal', imagenesNuevas);
            });
        });
    });

    describe('resuelve el juego', () => {
        let mapaDePares, listaDePares;

        it('elige una combinación erronea', () => {
            //get() me devuelve un objeto en jquery --> 'imagenes' que debo iterar con each en vez de un forEach
            cy.get('.frente').then((imagenes) => {
                mapaDePares = obtenerParesDeImagenes(imagenes);
                listaDePares = Object.values(mapaDePares);
                
                console.log(listaDePares);

                listaDePares[0][0].previousSibling.click();
                listaDePares[1][0].previousSibling.click();

                cy.get('.frente').should('have.length', NUMERO_CARTAS);
            });
        });

        it('resuelve el juego', () => {
            cy.get('.frente').should('have.length', NUMERO_CARTAS);

            cy.clock();

            listaDePares.forEach((par) => {

                cy.get(par[0].previousSibling).click();
                cy.get(par[1].previousSibling).click();

                cy.tick(500);
            });

            cy.get('.frente').should('have.length', 0);

            cy.get('.tablero').should('not.be.visible');
            const intentos = NUMERO_CARTAS / 2 + 1;
            cy.get('.fin-de-juego').
                should('be.visible').
                contains(
                    `Finalizaste el juego en ${intentos} intentos.`,
            );

        });

    });
});

function obtenerParesDeImagenes(imagenes) {
    const pares = {};

    imagenes.each((i, imagen) => {
        
        const club = imagen.src.replace('http://' + URL + '/img/', '').replace('.jpg','');

        if (pares[club]) {
            pares[club].push(imagen);
        } else {
            //Si no existe el array de elementos 'img' entoces los creo, por eso el uso de '[]'
            pares[club] = [imagen];
        }
    });
    console.log(pares);
    return pares;
};
