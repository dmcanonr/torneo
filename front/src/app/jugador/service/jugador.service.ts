import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public listarJugadores() {
    return this.httpClient.get('http://localhost:3000/jugadores/listar');
  }

  public borrarJugador(id: string) {
    return this.httpClient.delete('http://localhost:3000/jugador/' + id);
  }

  public buscarJugador(id: string) {
    return this.httpClient.get('http://localhost:3000/jugador/' + id);
  }

  public guardarJugador(body: any) {
    return this.httpClient.post('http://localhost:3000/jugador', body);
  }
}
