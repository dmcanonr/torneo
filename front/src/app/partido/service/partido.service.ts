import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public listarPartidos() {
    return this.httpClient.get('http://localhost:3000/partidos/listar');
  }

  public buscarPartido(id: string) {
    return this.httpClient.get('http://localhost:3000/partido/' + id);
  }

  public buscarDetallesPartido(id: string) {
    return this.httpClient.get('http://localhost:3000/partido/detalles/' + id);
  }

  public buscarEquiposGol(id: string) {
    return this.httpClient.get('http://localhost:3000/partido/' + id + '/equipos-gol');
  }

  public guardarPartido(body: any) {
    return this.httpClient.post('http://localhost:3000/partido', body);
  }
  
  public listarArbitros() {
    return this.httpClient.get('http://localhost:3000/arbitros/listar');
  }

  public listarNarradores() {
    return this.httpClient.get('http://localhost:3000/narrador/listar');
  }
  
  public agregarGol(id: string | null, body: any) {
    return this.httpClient.post('http://localhost:3000/partido/' + id + '/agregar-gol', body);

  }

  public agregarTarjeta(id: string | null, body: any) {
    return this.httpClient.post('http://localhost:3000/partido/' + id + '/agregar-tarjeta', body);

  }

  public agregarJugadorDestacado(id: string | null, body: any) {
    return this.httpClient.post('http://localhost:3000/partido/' + id + '/jugador-destacado', body);
  }

  public agregarCambio(id: string | null, body: any) {
    return this.httpClient.post('http://localhost:3000/partido/' + id + '/agregar-cambio', body);
  }
}
