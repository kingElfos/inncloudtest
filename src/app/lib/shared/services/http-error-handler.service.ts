import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor(private messageService: MessageService) {}

  handleError(error: HttpErrorResponse) {
    let errorMessage: string;

    errorMessage = error.error.message;


    this.messageService.add({
      severity: 'error',
      summary: 'Error en la petición',
      detail: errorMessage
    });
  }
}
