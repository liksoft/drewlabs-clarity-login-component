import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatAddComponent } from './dat-add.component';

describe('DatAddComponent', () => {
  let component: DatAddComponent;
  let fixture: ComponentFixture<DatAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
