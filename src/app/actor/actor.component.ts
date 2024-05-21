// src/app/actor/actor.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActorService } from '../actor.service';

@Component({
  selector: 'app-actor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.css']
})
export class ActorComponent implements OnInit {
  actors: any[] = [];
  movies: any[] = [];
  actorName: string = '';
  loading: boolean = false;
  error: string = '';
  currentActorPage: number = 1;
  currentPage: number = 1;
  itemsPerPage: number = 9;

  constructor(private actorService: ActorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const actorId = +this.route.snapshot.paramMap.get('id')!;
    if (actorId) {
      this.loading = true;
      this.actorService.getActorMovies(actorId).subscribe({
        next: (data) => {
          this.movies = data;
          this.loading = false;
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.loading = false;
          this.error = 'An error occurred while fetching movies. Please try again.';
        }
      });
    } else {
      this.error = 'Invalid actor ID.';
    }
  }

  get paginatedMovies() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.movies.slice(start, end);
  }

  get totalPages() {
    return Math.ceil(this.movies.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
    }
  }