import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public listarEquipos() {
    return this.httpClient.get('http://localhost:3000/equipos/listar');
  }

  public buscarEquipo(id: string) {
    return this.httpClient.get('http://localhost:3000/equipo/' + id);
  }

  public guardarEquipo(body: any) {
    return this.httpClient.post('http://localhost:3000/equipo', body);
  }

  public borrarEquipo(id: string) {
    return this.httpClient.delete('http://localhost:3000/equipo/' + id);
  }
}
