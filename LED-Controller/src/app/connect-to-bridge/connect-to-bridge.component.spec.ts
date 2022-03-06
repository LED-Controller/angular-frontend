import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectToBridgeComponent } from './connect-to-bridge.component';

describe('ConnectToBridgeComponent', () => {
  let component: ConnectToBridgeComponent;
  let fixture: ComponentFixture<ConnectToBridgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectToBridgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectToBridgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
