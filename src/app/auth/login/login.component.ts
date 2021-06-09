import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../authResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.required
      ])
    });
  }

  onLogin(): void {
    this.authService
      .login(this.form.value.email, this.form.value.password)
      .subscribe(
        (response: AuthResponse) => {
          this.errorMessage = '';
          console.log(response);
        },
        (error) => {
          console.log(error);

          this.errorMessage = error.error;
        }
      );
  }
}
