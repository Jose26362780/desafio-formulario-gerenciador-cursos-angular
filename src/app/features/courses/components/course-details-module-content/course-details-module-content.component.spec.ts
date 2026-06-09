import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseDetailsModuleContentComponent } from './course-details-module-content.component';

describe('CourseDetailsModuleContentComponent', () => {
  let component: CourseDetailsModuleContentComponent;
  let fixture: ComponentFixture<CourseDetailsModuleContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailsModuleContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseDetailsModuleContentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
