import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig,provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {AuthGateway} from '@core/domain/auth/gateways/auth-gateway';
import {AuthService} from '@core/infrastructure/auth/repositories/auth-service';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch()),
    provideAnimations(),
    {
      provide:AuthGateway, useClass:AuthService
    }
  ],
};
