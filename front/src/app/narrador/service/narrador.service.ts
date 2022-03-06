import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NarradorService {

  constructor(
    private httpClient: HttpClient
  ) { }


  public listarNarradores() {
    return this.httpClient.get('http://localhost:3000/narrador/listar');
  }

  public buscarNarradores(id: string) {
    return this.httpClient.get('http://localhost:3000/narrador/' + id);
  }

  public guardarNarradores(body: any) {
    return this.httpClient.post('http://localhost:3000/narrador', body);
  }

 /*  public borrarNarradores(id: string) {
    return this.httpClient.delete('http://localhost:3000/narrador/' + id);
  } */
}
