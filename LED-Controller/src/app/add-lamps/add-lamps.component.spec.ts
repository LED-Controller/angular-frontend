import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLampsComponent } from './add-lamps.component';

describe('AddLampsComponent', () => {
  let component: AddLampsComponent;
  let fixture: ComponentFixture<AddLampsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLampsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
