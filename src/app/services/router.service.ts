import { Injectable } from '@angular/core';
// import router service
import { Router } from '@angular/router';


@Injectable()
export class RouterService {

  constructor(public router: Router) { }

  routeToDashboard() {
    // navigating to dashboard component
    this.router.navigate(['dashboard']);
  }

  routeToLogin() {
    // navigate to login
    this.router.navigate(['login']);
  }
}
