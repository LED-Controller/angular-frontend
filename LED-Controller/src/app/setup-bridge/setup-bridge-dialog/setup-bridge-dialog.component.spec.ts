import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupBridgeDialogComponent } from './setup-bridge-dialog.component';

describe('SetupBridgeDialogComponent', () => {
  let component: SetupBridgeDialogComponent;
  let fixture: ComponentFixture<SetupBridgeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupBridgeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupBridgeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
