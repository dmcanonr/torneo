import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public login(user: string, password: string) {
    return this.httpClient.post('http://localhost:3000/login', {
      user: user,
      password: password
    });
  }
}
