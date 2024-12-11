import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'animals',
    loadChildren: () => import('./animals/animals.module').then( m => m.AnimalsPageModule)
  },
];

@NgModule({
  imports: [
    //added useHash: true => simpler routes for web server instead /animals we have /index.html#/animals or /#/animals
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
