import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLampsDialogComponent } from './add-lamps-dialog.component';

describe('AddLampsDialogComponent', () => {
  let component: AddLampsDialogComponent;
  let fixture: ComponentFixture<AddLampsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLampsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLampsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
