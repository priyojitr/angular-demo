import { Component, OnInit } from '@angular/core';
// import authentication service
import { AuthenticationService } from '../services/authentication.service';
// import router service
import { RouterService } from '../services/router.service';
// import reactive form modules
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // binding html form & its control for error handling
  loginForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    }
  );

  public bearerToken: any;
  public errorMessage: string;
  
  constructor(private _authService: AuthenticationService,
    public routerService: RouterService) { }

  ngOnInit() {
  }

  // create getter methods for the login form parmas due to encapsulation
  get userName() {
    return this.loginForm.get('username');
  }
  get userPassword() {
    return this.loginForm.get('password');
  }
  // error messages for username field
  getUsernameErrorMsg() {
    return this.userName.hasError('required') ? 'Username field should not be blank' : '';
  }
  // error check for password field - required check
  getUserPasswordErrorMsg() {
    return this.userPassword.hasError('required') ? 'Password field should not be blank' : '';
  }
  // error check for password field - min len check
  getUserPasswordLenErrorMsg() {
    return this.userPassword.hasError('minlength') ? 'Password should be have min length as 4' : '';
  }

  loginSubmit() {
    console.log(this.loginForm.value);
    // user service for http call
    this._authService.authenticateUser(this.loginForm.value).subscribe(
      res => {
        // this token need to be stored in browser local storage used for subsequent server calls
        this.bearerToken = res['token'];
        // set bearer token to browser
        this._authService.setBearerToken(this.bearerToken);
        this.routerService.routeToDashboard();
      },
      err => {
        console.log('login error', err);
        this.errorMessage = err.error.message;
      }
    );
  }

}
