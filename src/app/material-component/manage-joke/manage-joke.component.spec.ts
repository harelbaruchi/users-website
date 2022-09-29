import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJokeComponent } from './manage-joke.component';

describe('ManageJokeComponent', () => {
  let component: ManageJokeComponent;
  let fixture: ComponentFixture<ManageJokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageJokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageJokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
