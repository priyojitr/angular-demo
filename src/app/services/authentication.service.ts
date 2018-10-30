import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthenticationService {

  private authUrl: string;

  constructor(public http: HttpClient) {
    this.authUrl = 'http://localhost:3000/auth/v1/';
  }

  authenticateUser(formData) {
    return this.http.post(this.authUrl, formData);
  }

  setBearerToken(token) {
    // setting bearer token of server to browser local storage
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  // this will authenticate user with the help of router-service, guards & authentication-service based on token
  isUserAuthenticated(token): Promise<boolean> {
    return this.http.post(`${this.authUrl}isAuthenticated`, { }, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
    })
    .pipe(map(res => res['isAuthenticated']))
    .toPromise();
  }
}
