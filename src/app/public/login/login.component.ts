import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean;
  loading: boolean;
  error: any;
	loginForm: FormGroup;
  loginLoading: boolean;
  submittedLogin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

    this.loginForm = this.formBuilder.group({
        Email: ['', Validators.required],
        Password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  // convenience getter for easy access to form fields
  get l() { return this.loginForm.controls; }

  onSigninSubmit() {
      this.submittedLogin = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      this.loginLoading = true;
      this.authenticationService.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  // this.bc.postMessage("Logged In")
                  this.loginLoading = false;
                  // this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.error = error;
                  this.loginLoading = false;
              });
  }

  onSignupSubmit() {
    console.log("get here");
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.registerForm.invalid);
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.registerForm.value);
    this.authenticationService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)
          this.loading = false;
        },
        error => {
          console.log("here 2", error);
          this.error = error;
          // this.alertService.error(error);
          this.loading = false;
        });
  }
}
