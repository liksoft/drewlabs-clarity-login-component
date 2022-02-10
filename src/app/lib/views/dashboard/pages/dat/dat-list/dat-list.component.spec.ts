import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatListComponent } from './dat-list.component';

describe('DatListComponent', () => {
  let component: DatListComponent;
  let fixture: ComponentFixture<DatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
