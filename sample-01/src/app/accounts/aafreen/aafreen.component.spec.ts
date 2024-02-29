import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AafreenComponent } from './aafreen.component';

describe('AafreenComponent', () => {
  let component: AafreenComponent;
  let fixture: ComponentFixture<AafreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AafreenComponent]
    });
    fixture = TestBed.createComponent(AafreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
