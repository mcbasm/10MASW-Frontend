import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAttentionComponent } from './client-attention.component';

describe('ClientAttentionComponent', () => {
  let component: ClientAttentionComponent;
  let fixture: ComponentFixture<ClientAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAttentionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
