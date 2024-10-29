import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  protected loginForm!: FormGroup;
  protected authService = inject(AuthService);
  protected fb = inject(FormBuilder);
  protected router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['innclod', Validators.required],
      password: ['somepassword', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      if (this.authService.login(username, password)) {
        this.router.navigate(['/projects']);
      } else {
        alert('clave incorrecta');
      }
    }
  }
}
