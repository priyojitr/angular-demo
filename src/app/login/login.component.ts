import { Component, OnInit } from '@angular/core';
// import authentication service
import { AuthenticationService } from '../services/authentication.service';
// import router service
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public bearerToken: any;
  public errorMessage: string;
  public username: string;
  public password: string;

  constructor(private _authService: AuthenticationService,
    public routerService: RouterService) {
      this.username = '';
      this.password = '';
    }

  ngOnInit() {
  }

  loginSubmit(formFields) {
    // console.log(formFields.value);
    // user service for http call
    this._authService.authenticateUser(formFields.value).subscribe(
      res => {
        // this token need to be stored in browser local storage used for subsequent server calls
        this.bearerToken = res['token'];
        // set bearer token to browser
        this._authService.setBearerToken(this.bearerToken);
        this.routerService.routeToDashboard();
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

}
