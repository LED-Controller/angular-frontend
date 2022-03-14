import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LampDialogComponent } from './lamp-dialog.component';

describe('LampDialogComponent', () => {
  let component: LampDialogComponent;
  let fixture: ComponentFixture<LampDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LampDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LampDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
