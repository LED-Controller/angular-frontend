import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupBridgeIpComponent } from './setup-bridge-ip.component';

describe('SetupBridgeIpComponent', () => {
  let component: SetupBridgeIpComponent;
  let fixture: ComponentFixture<SetupBridgeIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetupBridgeIpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupBridgeIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
