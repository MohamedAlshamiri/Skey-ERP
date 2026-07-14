import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeyButtonComponent } from './button';

describe('Button', () => {
  let component: SkeyButtonComponent;
  let fixture: ComponentFixture<SkeyButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeyButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeyButtonComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
