import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'games'
    },
    {
        path: 'games', loadChildren: () => import('./games/games.module').then(m => m.GamesModule)
    }
];
