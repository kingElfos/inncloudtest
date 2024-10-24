import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerService {
  private messageService = inject(MessageService);

  handleError(error: HttpErrorResponse) {
    const errorMessage: string = error.error.message;
    this.messageService.add({
      severity: 'error',
      summary: 'Error en la petición',
      detail: errorMessage,
    });
  }
}
