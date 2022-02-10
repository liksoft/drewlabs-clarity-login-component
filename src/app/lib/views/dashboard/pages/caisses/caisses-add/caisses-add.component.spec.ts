import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaissesAddComponent } from './caisses-add.component';

describe('CaissesAddComponent', () => {
  let component: CaissesAddComponent;
  let fixture: ComponentFixture<CaissesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaissesAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaissesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
