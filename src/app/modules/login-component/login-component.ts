import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../../core/services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [ReactiveFormsModule, NzInputModule, NzButtonModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss'
})
export class LoginComponent {
  async onSubmit() {
  if (this.formLogin.valid) {
    const { email, password } = this.formLogin.value;
    const token = await this.authService.sendCredentials({ email, password });

    if (token) {
      this.router.navigate(['/']);
    } else {
      console.error('Credenciales inválidas o error de conexión');
    }
  }
}

  formLogin:FormGroup = new FormGroup({});

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(80)
      ])
    });
  }
}
