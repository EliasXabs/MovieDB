import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActorComponent } from './actor.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterModule } from '@angular/router';
import { ActorService } from '../actor.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

describe('ActorComponent', () => {
  let component: ActorComponent;
  let fixture: ComponentFixture<ActorComponent>;
  let mockActorService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    // Mock services
    mockActorService = jasmine.createSpyObj('ActorService', ['getActorMovies', 'searchActors']);
    mockActorService.getActorMovies.and.returnValue(of([])); // Assume it returns an empty array for simplicity
    mockActorService.searchActors.and.returnValue(of([]));

    // Mock ActivatedRoute
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => '1', // Example actor ID
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, RouterModule.forRoot([])], // RouterModule is needed if you use routerLink or routerOutlet in your template
      declarations: [ActorComponent],
      providers: [
        { provide: ActorService, useValue: mockActorService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no movies if getActorMovies returns empty array', () => {
    expect(component.movies.length).toEqual(0);
  });
});
