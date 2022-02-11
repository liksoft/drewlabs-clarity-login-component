import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksOperationAddComponent } from './banks-operation-add.component';

describe('BanksOperationAddComponent', () => {
  let component: BanksOperationAddComponent;
  let fixture: ComponentFixture<BanksOperationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BanksOperationAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BanksOperationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
