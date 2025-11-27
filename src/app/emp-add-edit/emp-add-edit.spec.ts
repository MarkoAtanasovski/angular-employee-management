import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpAddEdit } from './emp-add-edit';

describe('EmpAddEdit', () => {
  let component: EmpAddEdit;
  let fixture: ComponentFixture<EmpAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpAddEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
