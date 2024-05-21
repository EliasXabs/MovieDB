// src/app/actor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) { }

  searchActors(query: string): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/search/person`, {
      params: {
        api_key: this.apiKey,
        query: query
      }
    }).pipe(
      map(response => response.results)
    );
  }

  getActorMovies(actorId: number): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/person/${actorId}/movie_credits`, {
      params: {
        api_key: this.apiKey
      }
    }).pipe(
      map(response => response.cast)
    );
  }
  getPopularActors(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}/person/popular`, {
      params: {
        api_key: this.apiKey
      }
    }).pipe(
      map(response => response.results)
    );
  }
}
