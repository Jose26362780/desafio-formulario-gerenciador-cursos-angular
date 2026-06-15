import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFormSectionOneInfoComponent } from './course-form-section-one-info.component';

describe('CourseFormSectionOneInfoComponent', () => {
  let component: CourseFormSectionOneInfoComponent;
  let fixture: ComponentFixture<CourseFormSectionOneInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseFormSectionOneInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseFormSectionOneInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
