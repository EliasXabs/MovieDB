// src/app/favorites/favorites.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Import RouterModule

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule, // For common directives like *ngIf, *ngFor
    RouterModule  // To use routerLink within this component
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteActors: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteActors = JSON.parse(localStorage.getItem('actorFavorites') || '[]');
  }

  removeFavorite(actor: any): void {
    this.favoriteActors = this.favoriteActors.filter(fav => fav.id !== actor.id);
    localStorage.setItem('actorFavorites', JSON.stringify(this.favoriteActors));
  }
}
