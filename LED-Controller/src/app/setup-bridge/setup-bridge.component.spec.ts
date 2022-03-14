import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupBridgeComponent } from './setup-bridge.component';

describe('SetupBridgeComponent', () => {
  let component: SetupBridgeComponent;
  let fixture: ComponentFixture<SetupBridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupBridgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
