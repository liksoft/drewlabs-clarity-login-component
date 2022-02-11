import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatComponent } from './dat.component';

describe('DatComponent', () => {
  let component: DatComponent;
  let fixture: ComponentFixture<DatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
