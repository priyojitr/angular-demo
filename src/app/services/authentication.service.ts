import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {

  private authUrl: string;

  constructor(public http: HttpClient) {
    this.authUrl = 'http://localhost:3000/auth/v1';
  }

  authenticateUser(formData) {
    return this.http.post(this.authUrl, formData);
  }

  setBearer(token) {
    // setting bearer token of server to browser local storage
    localStorage.setItem('bearerToken',token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }
}
