import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeyInputComponent } from './input';

describe('Input', () => {
  let component: SkeyInputComponent;
  let fixture: ComponentFixture<SkeyInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeyInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkeyInputComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
