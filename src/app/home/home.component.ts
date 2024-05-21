import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  actors: any[] = [];
  query: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(private actorService: ActorService) { }

  ngOnInit(): void {
    this.loadPopularActors(); // Load popular actors upon initialization
  }

  onSearch(): void {
    if (!this.query) {
      this.loadPopularActors(); // Reload popular actors if search query is empty
    } else {
      this.loading = true;
      this.error = '';
      this.actorService.searchActors(this.query).subscribe({
        next: (data) => {
          this.actors = data;
          this.loading = false;
          if (this.actors.length === 0) {
            this.error = 'No actors found.';
          }
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.loading = false;
          this.error = 'An error occurred while searching. Please try again.';
        }
      });
    }
  }

  loadPopularActors(): void {
    this.loading = true;
    this.actorService.getPopularActors().subscribe({
      next: (data) => {
        this.actors = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading popular actors', error);
        this.loading = false;
        this.error = 'Failed to load popular actors.';
      }
    });
  }

  toggleFavorite(actor: any): void {
    let favorites: any[] = JSON.parse(localStorage.getItem('actorFavorites') || '[]');
    const index = favorites.findIndex(fav => fav.id === actor.id);

    if (index !== -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(actor);
    }
    localStorage.setItem('actorFavorites', JSON.stringify(favorites));
  }

  isFavorite(actor: any): boolean {
    const favorites: any[] = JSON.parse(localStorage.getItem('actorFavorites') || '[]');
    return favorites.some(fav => fav.id === actor.id);
  }
}