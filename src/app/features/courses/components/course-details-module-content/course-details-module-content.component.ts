import { Component } from '@angular/core';

interface Aula {
  id: number;
  numero: string;
  titulo: string;
}

interface Modulo {
  id: number;
  numero: string;
  titulo: string;
  aulas: Aula[];
}
@Component({
  selector: 'app-course-details-module-content',
  imports: [],
  templateUrl: './course-details-module-content.component.html',
})
export class CourseDetailsModuleContentComponent {
  modulos: Modulo[] = [
    {
      id: 1,
      numero: '01',
      titulo: 'Fundamentos do Angular',
      aulas: [
        { id: 1, numero: '01', titulo: 'Introdução ao Angular' },
        { id: 2, numero: '02', titulo: 'Componentes e Templates' },
      ],
    },
    {
      id: 2,
      numero: '02',
      titulo: 'Reactive Forms',
      aulas: [
        { id: 3, numero: '01', titulo: 'FormGroup e FormControl' },
        { id: 4, numero: '02', titulo: 'FormArray dinâmico' },
        { id: 5, numero: '03', titulo: 'Validators customizados' },
      ],
    },
  ];
}
