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

    if (error.error instanceof ErrorEvent) {
      // Error en el lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error en el lado del servidor
      errorMessage = `Código de error: ${error.status}, Mensaje: ${error.message}`;
    }


    this.messageService.add({
      severity: 'error',
      summary: 'Error en la petición',
      detail: errorMessage
    });
  }
}
