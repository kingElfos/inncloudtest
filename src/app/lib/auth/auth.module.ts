import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth.service';
import { AuthRoutingModule } from './routing/auth-routing.module';
import { PrimengModule } from '../primeng/primeng.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    PrimengModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
