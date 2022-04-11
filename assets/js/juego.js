const miModulo = ( () =>{
    // Patron modulo para proteger el codigo o sea encapsular todo el codigo dentro de una funcion anonima auto invocable 
    'use strict'

    /**
     * 2C = 2 DE TREBOL
     * 2D = 2 DE DIAMANTE
     * 2H = 2 DE CORAZONES
     * 2S = 2 DE ESPADA 
     */

    // Mano de carta no se usa const ya que luego se cambiara su valor
    let deck         = [];

    // Tipos de cartas (Pintas) y Cartas Especiales AS J Q K
    const tipos      = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];

    // Variables para las puntuaciones
    // let puntosJugador = 0,
    //     puntosCPU     = 0;
    let puntosJugadores = [];

    // Referenias del HTML

    const btnPedir   = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo   = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          smalls             = document.querySelectorAll('small');


    // Funcion para iniciar el jeugo
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        // Ciclo para la cantidad de jugadores
        for ( let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        // Simplificacion del seteo de los puntos de abajo
        smalls.forEach( (elem ) => elem.innerText = 0);

        // // Se setean los puntos a 0 del body - ARRIBA SE SIMPLIFICA
        // smalls[0].innerText = 0;
        // smalls[1].innerText = 0;

       divCartasJugadores.forEach ( elem  => elem.innerText = '');

       btnPedir.disabled = false;
       btnDetener.disabled = false;

    }

    // Esta funcion crea una nueva baraja
    const crearDeck = () => {
        deck = []; // Inicializnado el deck en 0

        // For para crear arreglo con numeros del 2 al 10
        for( let i = 2; i<=10; i++){

            //For para crear arrelgo de los numeros del 2 al 10 mas el tipo de carta
            for (const tipo of tipos) {
                deck.push(i + tipo );
            }
        }

        // For para crear arreglo de las cartas especiales
        for (const tipo of tipos) {

            // For para crear arreglo de cartas especiales mas el tipo de carta
            for (const esp of especiales) {
                deck.push( esp + tipo );
            }
        }

        // Funcion shuffle de libreria underscore para desordenar arreglo
        return _.shuffle(deck);;
    }

    // Esta funcion permite tomar una carta
    const pedirCarta = ()=>{

        // Condicion If por si no hay cartas en el deck
        if( deck.length === 0 ){
            throw 'Error no hay mas cartas en el deck'
        }

        // Operacion para eliminar la ultima posicion en el deck (array) directamente desde el return
        return deck.pop();
    }

    // Funcion para saber el valor de la carta extraida en la funcion de pedirCarta()
    const valorCarta = ( carta )=>{

        // Se utiliza la propiedad substring que sirve para extrae desde la posicion que se indique en este caso desde la 0 hasta la posicion que se desee, los string se pueden trabajar como arreglos 'CARTA' siendo [0] la C y asi sucesivamente
        const valor = carta.substring( 0, carta.length -1 );
        
        // Opcion Corta
        // Como lo que importa es el valor del return se empieza desde el return y se tratan los casos con oeprador ternario
        return ( isNaN ( valor ) ) ?
                ( valor === 'A'  ) ? 11 : 10
                :   valor * 1;

        // Opcion Larga
        // let puntos = 0;

        // // Condicion para evaluar si se recibe una carta numerica o carta especial
        // if( isNaN( valor ) ){
        //     puntos = ( valor === 'A' )? 11 : 10
        // } else{
        //     // Se multiplica *1 para transformar el string en numero
        //     puntos = valor *1;
        // }
        // console.log( puntos );
    }

    // const valor = valorCarta( pedirCarta() );
    // console.log({ valor });

    // Turno: 0 = a primer jugador y último sera la CPU
    const acumularPuntos = ( carta, turno ) =>{

         // Suma de los pts del cpu + el valor de la carta
         puntosJugadores[ turno ] = puntosJugadores[ turno ] + valorCarta( carta );
            
         // Insertar pts del CPU en el 1er small del body
         smalls[ turno ].innerText = puntosJugadores[ turno ];
         return puntosJugadores[ turno ]; 
    }

    const crearCarta = (carta, turno )=>{

        // Referencia al HTML para crear elemento tipo en este caso tipo img
        const imgCarta = document.createElement('img');
    
        // Ruta de las imagenes
        imgCarta.src= `./assets/cartas/${ carta }.png`;
    
        // Clase de las imagenes
        imgCarta.classList.add( 'carta' )
        
        // Insertar carta (img) al body en el div
        divCartasJugadores[turno].append( imgCarta )
    }

    const determinarGanador = () =>{
        
        // Desestructuracion del objeto puntosJugadores
        const [ puntosMinimos, puntosCPU ] = puntosJugadores;
        
        setTimeout(() =>{

            if ( puntosCPU === puntosMinimos ){
                alert('Ninguno de los 2 Gana :S ');
            } else if ( puntosMinimos >21 ){
                alert(' Gana el CPU :( ');
            } else if ( puntosCPU >21 ){
                alert(' Ganasteeee!!!! :D  ');
            } else{
                alert(' Gana el CPU :( ');
            }
    
        }, 100);

    }

    // Turno computadora
    const turnoCPU = ( puntosMinimos ) =>{
    
        let puntosCPU = 0;
        do {
                const carta = pedirCarta();
            
                puntosCPU = acumularPuntos( carta, puntosJugadores.length -1 );

                crearCarta( carta, puntosJugadores.length -1 );

                // // Suma de los pts del cpu + el valor de la carta (SE PASO A LA FUNCION ACUMULAR PUNTOS)
                // puntosCPU = puntosCPU + valorCarta( carta );
                // // Insertar pts del CPU en el 1er small del body
                // smalls[1].innerText = puntosCPU;
            
                // // Referencia al HTML para crear elemento tipo en este caso tipo img
                // const imgCarta = document.createElement('img');
                // // Ruta de las imagenes
                // imgCarta.src= `./assets/cartas/${ carta }.png`;
                // // Clase de las imagenes
                // imgCarta.classList.add( 'carta' )
                // // Insertar carta (img) al body en el div
                // divCartasCPU.append( imgCarta );

            // Condicion por si el jugador saca mas de 21
            // if ( puntosMinimos >21 ){
            //     break;
            // }
            
    } while ( (puntosCPU < puntosMinimos ) && ( puntosMinimos <=21 ) );

    determinarGanador();

    }

    // Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0 );

        // // Suma de los pts del jugador + el valor de la carta SE SUSTITUYE POR LA FUNCION acumularPuntos
        // puntosJugador = puntosJugador + valorCarta( carta );
        // // Insertar pts del jugador en el 1er small del body
        // smalls[0].innerText = puntosJugador;

        crearCarta( carta, 0)

        // // Referencia al HTML para crear elemento tipo en este caso tipo img SE SUTITUYO POR FUNCION crearCarta
        // const imgCarta = document.createElement('img');
        // // Ruta de las imagenes
        // imgCarta.src= `./assets/cartas/${ carta }.png`;
        // // Clase de las imagenes
        // imgCarta.classList.add( 'carta' )
        // // Insertar carta (img) al body en el div
        // divCartasJugador.append( imgCarta );

        // Condicion de los puntos
        if ( puntosJugador >21 ){
            console.warn(' Los Siento Has Perdido, Te Pasaste De 21 Puntos!!! ')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoCPU( puntosJugador );

        } else if ( puntosJugador === 21 ) {
        console.warn('21, Genial!!!') 
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCPU( puntosJugador );
        }
        
    });

    // Boton de detenerr o quedarse con los puntos sacados
    btnDetener.addEventListener('click', () =>{

        // Deshabilitar botonoes de pedir y detenr
        btnPedir.disabled   = true;
        btnDetener.disabled = true;
        
        // Se llamaa la funcion del turno del pc pasandole los pts del jugdor como parametro
        turnoCPU( puntosJugadores[0] );
        
    });

    // // Boton nuevo Juego
    // btnNuevo.addEventListener('click', ()=>{
    //     inicializarJuego();
    // });

    return {
        nuevoJuego: inicializarJuego
    }

})();

