import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';


@NgModule({
  exports:[
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
    TableModule,
    CardModule]
})
export class PrimengModule { }
