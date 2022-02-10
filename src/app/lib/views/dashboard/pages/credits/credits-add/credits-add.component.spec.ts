import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditsAddComponent } from './credits-add.component';

describe('CreditsAddComponent', () => {
  let component: CreditsAddComponent;
  let fixture: ComponentFixture<CreditsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
