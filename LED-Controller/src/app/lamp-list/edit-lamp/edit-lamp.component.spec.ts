import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLampComponent } from './edit-lamp.component';

describe('EditLampComponent', () => {
  let component: EditLampComponent;
  let fixture: ComponentFixture<EditLampComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLampComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLampComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
