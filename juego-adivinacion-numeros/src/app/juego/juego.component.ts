import { Component, OnInit } from '@angular/core';
import { Configuracion } from '../models/Configuracion';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})

export class JuegoComponent implements OnInit {

  public configuracion: Configuracion;

  constructor() {
    this.configuracion = new Configuracion("","",0,0);
  }

  errores: { [key: string]: string } = {
    nombre: '',
    apellido: '',
    rangoMaximo: '',
    intentos: ''
  };

  campoValidado: { [key: string]: boolean } = {
    nombre: false,
    apellido: false,
    rangoMaximo: false,
    intentos: false
  };

  numeroAleatorio: number = 0;
  juegoIniciado: boolean = false;
  intentosRestantes: number = 0;
  intento: number = 0;
  mensajeJuego: string = '¿Preparado?';
  numeroIngresado: number | null = null;
  juegoFinalizado: boolean = false;

  /* Metodo que valida un campo del formulario y lo marca como validado o no
  para la validacion final del formulario. */
  validarCampo(campo: string): void {
    if (campo === 'nombre' && !this.configuracion.nombre) {
      this.errores[campo] = 'El nombre no puede estar vacío';
    } else if (campo === 'apellido' && !this.configuracion.apellido) {
      this.errores[campo] = 'El apellido no puede estar vacío';
    } else if (campo === 'rangoMaximo' && (!this.configuracion.rangoMaximo || this.configuracion.rangoMaximo < 4)) {
      this.errores[campo] = 'El rango debe ser como mínimo 4';
    } else if (campo === 'intentos' && (!this.configuracion.intentos || this.configuracion.intentos < 1)) {
      this.errores[campo] = 'El número de intentos deben ser como mínimo 1';
    } else {
      if (campo === 'rangoMaximo') {
        this.numeroAleatorio = Math.floor(Math.random() * this.configuracion.rangoMaximo);
        console.log(this.numeroAleatorio);
      }
      this.errores[campo] = '';
      this.campoValidado[campo] = true;
      return;
    }
    this.campoValidado[campo] = false;
    console.log(this.errores);
  }

  /* Metodo que permite mostrar la vista del juego y ocultar el formulario mientras se juega. Resetea los intentos. */
  iniciarJuego(): void {
    this.juegoIniciado = true;
    this.intentosRestantes = this.configuracion.intentos;
    this.intento = 0;
  }

  /* Metodo que comprueba si el numero ingresado por el usuario coincide con el numero generado. Cambia el valor del mensaje 
  que se muestra en pantalla indicando lo cerca que ha estado de acertar. Tambien bloquea el juego si se termina modificando 
  el valor de la variable juegoFinalizado, permitiendo unicamente reiniciar la partida. */
  comprobarNumero(): void {
    if (this.numeroIngresado === null) return;
    
    this.intento++;
    this.intentosRestantes--;

    if (this.numeroIngresado === this.numeroAleatorio) {
      this.mensajeJuego = '¡Has ganado!';
      this.juegoFinalizado = true;
      return;
    } else if (this.numeroIngresado > this.numeroAleatorio) {
      this.mensajeJuego = 'Te pasaste';
    } else {
      const diferencia = this.numeroAleatorio - this.numeroIngresado;
      if (diferencia === 1) {
        this.mensajeJuego = 'Caliente';
      } else if (diferencia === 2) {
        this.mensajeJuego = 'Templado';
      } else {
        this.mensajeJuego = 'Frío';
      }
    }

    if (this.intentosRestantes <= 0 && this.numeroIngresado !== this.numeroAleatorio) {
      this.mensajeJuego = `¡Game Over! El número era ${this.numeroAleatorio}`;
      this.juegoFinalizado = true;
    }
    this.numeroIngresado = null;
  }

  /* Metodo que reinicia la partida, volviendo a mostrar el formulario reiniciando la configuracion. */
  reiniciarJuego(): void {
    this.juegoIniciado = false;
    this.juegoFinalizado = false;
    this.configuracion = new Configuracion("","",0,0);
    this.numeroIngresado = null;
    this.campoValidado = {
      nombre: false,
      apellido: false,
      rango: false
    };
  }

  ngOnInit(): void {
  }

}
