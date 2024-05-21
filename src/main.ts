// src/main.ts
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { ActorComponent } from './app/actor/actor.component';
import { FavoritesComponent } from './app/favorites/favorites.component';

if (environment.production) {
  enableProdMode();
}

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'actor/:id', component: ActorComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule)
  ]
}).catch(err => console.error(err));
