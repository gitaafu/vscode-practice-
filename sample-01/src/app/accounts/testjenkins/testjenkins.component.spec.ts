import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestjenkinsComponent } from './testjenkins.component';

describe('TestjenkinsComponent', () => {
  let component: TestjenkinsComponent;
  let fixture: ComponentFixture<TestjenkinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestjenkinsComponent]
    });
    fixture = TestBed.createComponent(TestjenkinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
