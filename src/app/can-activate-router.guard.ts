import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouterGuard implements CanActivate {
  // store beare token from authentication service method
  private _bearerToken: any;
  // constructor injecting DI - authentication & router service
  constructor(public authService: AuthenticationService,
    public routerService: RouterService) {
    this._bearerToken = this.authService.getBearerToken();
  }
  // authentication service will validate user credential
  // when authentication succeeds, it calls router service to route to dashboard
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // making use of authentication service to validate the token
      const booleanPromise = this.authService.isUserAuthenticated(this._bearerToken);
      return booleanPromise.then((authenticated) => {
        if(!authenticated){
          // route to login
          // making use of router service for navigation
          this.routerService.routeToLogin();
        }
        // else route to forward route if no error or it is authenticated
        return authenticated;
      });
  }
}
