import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestjenkinsbuildComponent } from './testjenkinsbuild.component';

describe('TestjenkinsbuildComponent', () => {
  let component: TestjenkinsbuildComponent;
  let fixture: ComponentFixture<TestjenkinsbuildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestjenkinsbuildComponent]
    });
    fixture = TestBed.createComponent(TestjenkinsbuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
