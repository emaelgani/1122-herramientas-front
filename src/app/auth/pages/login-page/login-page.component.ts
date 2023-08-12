import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  private authService = inject(AuthService);
  private fb          = inject(FormBuilder);
  private router      = inject(Router);
  private _snackBar   = inject(MatSnackBar);

  public myForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });


  login(){
    const { username, password } = this.myForm.value;

    this.authService.login(username, password)
        .subscribe({
          next: () => this.router.navigateByUrl('/dashboard'),
          error: (err) => {
          this._snackBar.open('Credenciales inválidas', 'ERROR');
          }
        })
  }



}
