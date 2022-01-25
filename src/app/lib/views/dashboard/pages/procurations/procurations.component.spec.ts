import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurationsComponent } from './procurations.component';

describe('ProcurationsComponent', () => {
  let component: ProcurationsComponent;
  let fixture: ComponentFixture<ProcurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
