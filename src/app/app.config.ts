import {provideHttpClient, withFetch} from '@angular/common/http';
import {ApplicationConfig} from '@angular/core';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    //provideAnimations(),
      provideAnimationsAsync(),
    //provideHttpClient(withFetch())
  ]
};
