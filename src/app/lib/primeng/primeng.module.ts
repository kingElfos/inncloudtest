import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
@NgModule({
  providers:[MessageService],
  exports:[
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MessageModule,
    TableModule,
    CardModule]
})
export class PrimengModule { }
