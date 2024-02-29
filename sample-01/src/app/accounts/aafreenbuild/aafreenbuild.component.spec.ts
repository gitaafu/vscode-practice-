import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AafreenbuildComponent } from './aafreenbuild.component';

describe('AafreenbuildComponent', () => {
  let component: AafreenbuildComponent;
  let fixture: ComponentFixture<AafreenbuildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AafreenbuildComponent]
    });
    fixture = TestBed.createComponent(AafreenbuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
