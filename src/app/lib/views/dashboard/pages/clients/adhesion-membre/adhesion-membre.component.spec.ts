import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdhesionMembreComponent } from './adhesion-membre.component';

describe('AdhesionMembreComponent', () => {
  let component: AdhesionMembreComponent;
  let fixture: ComponentFixture<AdhesionMembreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdhesionMembreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdhesionMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
