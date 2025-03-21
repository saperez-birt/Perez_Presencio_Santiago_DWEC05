export class Configuracion {
    constructor(
        public nombre: string,
        public apellido: string,
        public rangoMaximo: number,
        public intentos: number
    ) {
        console.log('Configuracion constructor');
    }
}