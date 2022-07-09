import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusPickerComponent } from './status-picker.component';

describe('StatusPickerComponent', () => {
  let component: StatusPickerComponent;
  let fixture: ComponentFixture<StatusPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
