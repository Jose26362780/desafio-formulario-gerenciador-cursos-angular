import { Component, inject } from '@angular/core';
import { CourseFormSectionOneInfoComponent } from '../../components/course-form-section-one-info/course-form-section-one-info.component';
import { CourseFormSectionTwoModulesComponent } from '../../components/course-form-section-two-modules/course-form-section-two-modules.component';
import { CourseService } from '../../../../core/services/course.service';
import { CourseFormStoreService } from '../../../../core/services/course-form-store.service';

@Component({
  selector: 'app-course-form-edit',
  standalone: true,
  imports: [CourseFormSectionOneInfoComponent, CourseFormSectionTwoModulesComponent],
  templateUrl: './course-form-edit.component.html',
})
export class CourseFormEditComponent {
  protected readonly courseFormStore = inject(CourseFormStoreService);
  private readonly _courseService = inject(CourseService);

  ngOnInit(): void {
    // Pega o ID do curso da rota
    // const courseID = this.route.snapshot.params['id'];
    // Carrega os dados do curso ( simulação - voce pegaria de uma API )
    // this.loadCourseData(courseID);
  }

  private loadCourseData(courseId: string): void {
    // Simulação - Substitua por sua chamada de API

    const courseData = {
      informations: {
        name: 'Angular Avançado',
        category: 'Frontend',
        description: 'Curso Completo de Angular',
      },
      modules: [
        {
          name: 'Modulo 1',
          lessons: [{ name: 'Aula 1.1' }, { name: 'Aula 1.2' }],
        },
        {
          name: 'Modulo 2',
          lessons: [{ name: 'Aula 2.1' }, { name: 'Aula 2.2' }],
        },
      ],
    };

    // Popula o formulario com os dados existentes
    this.courseFormStore.patchCourseData(courseData);
  }

  onSubmit(): void {
    if (this.courseFormStore.courseForm.valid) {
      const formData = this.courseFormStore.courseForm.value;
      console.log('Atualizar Curso: ', formData);

      // Aqui Voce Chamaria seu Service de API para atualizar o curso
    } else {
      this.courseFormStore.courseForm.markAllAsTouched();
    }
  }
}
