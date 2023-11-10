import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('./open-close.component').then((m) => m.OpenCloseComponent)
    }
];
