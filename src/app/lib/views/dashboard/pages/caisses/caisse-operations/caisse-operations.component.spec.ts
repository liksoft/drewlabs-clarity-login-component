import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseOperationsComponent } from './caisse-operations.component';

describe('CaisseOperationsComponent', () => {
  let component: CaisseOperationsComponent;
  let fixture: ComponentFixture<CaisseOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaisseOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaisseOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
