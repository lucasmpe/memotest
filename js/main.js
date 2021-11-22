const cuadros = [
    'img/aguilas-doradas.jpg',
    'img/alianza-petrolera.jpg',
    'img/america-de-cali.jpg',
    'img/atletico-bucaramanga.jpg',
    'img/atletico-huila.jpg',
    'img/atletico-junior.jpg',
    'img/atletico-nacional.jpg',
    'img/deportes-quindio.jpg',
    'img/deportes-tolima.jpg',
    'img/deportivo-cali.jpg',
    'img/deportivo-pasto.jpg',
    'img/deportivo-pereira.jpg',
    'img/envigado-fc.jpg',
    'img/independiente-medellin.jpg',
    'img/independiente-santa-fe.jpg',
    'img/jaguares-de-cordoba.jpg',
    'img/la-equidad-seguros.jpg',
    'img/millonarios.jpg',
    'img/once-caldas.jpg',
    'img/patriotas-boyaca.jpg'
];

const CANTIDAD_CUADROS = cuadros.length;
let registroAsignaciones = new Array(CANTIDAD_CUADROS);

function registroAsignacionesEstaLleno() {
    let suma = 0;
    for(let i=0; i<registroAsignaciones.length; i++) {
        suma += registroAsignaciones[i];
    }
    if(suma === CANTIDAD_CUADROS*2) {
        return true;
    }
    return false;
}

function asignarCuadro(imagenCarta) {
    if (registroAsignacionesEstaLleno()) {
        return false;
    }
    const indiceAleatorio = Math.floor(Math.random() * 20);
    if(registroAsignaciones[indiceAleatorio] < 2) {
        imagenCarta.src = cuadros[indiceAleatorio];
        registroAsignaciones[indiceAleatorio]++;
        return true;
    } else {
        asignarCuadro(imagenCarta)
    }
}

function iniciarTablero() {
    registroAsignaciones.fill(0);    
    for(let i=0; i<CANTIDAD_CUADROS*2; i++) {
        const $imagenCarta = document.querySelector(`#carta-${i+1} img`); //Obtengo el elemento 'img' de cada una de las cartas
        asignarCuadro($imagenCarta);
    }
}

//iniciarTablero();






















