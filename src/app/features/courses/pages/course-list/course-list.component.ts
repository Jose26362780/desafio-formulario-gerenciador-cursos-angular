import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { EmptySearchResultComponent } from '../../components/empty-search-result/empty-search-result.component';
import { Observable, of } from 'rxjs';
import { CourseModel } from '../../../../shared/models/course-model';
import { CourseCardFilterComponent } from '../../components/course-card-filter/course-card-filter.component';
import { CourseService } from '../../../../core/services/course.service';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    CourseCardFilterComponent,
    CourseCardComponent,
    EmptySearchResultComponent,
  ],
  templateUrl: './course-list.component.html',
})
export class CourseListComponent implements OnInit {
  public currentView: 'grid' | 'list' = 'grid'; // 'grid' como padrão
  private courseService = inject(CourseService);

  // ==================================================
  // ============== CONTROLES MANUAIS =================
  // ==================================================
  /** Mude para 'true' para simular uma lista totalmente vazia (nenhum curso cadastrado) */
  forceEmptyState = false;
  /** Mude para 'true' para simular um resultado de busca vazio */
  forceNoResultsState = false;
  // ==================================================

  // Lista de cursos mocada para teste
  private mockCourses: CourseModel[] = [
    {
      id: '1',
      name: 'Reactive Forms com Angular',
      category: 'Frontend',
      description:
        'Aprenda a criar formulários reativos com Angular utilizando FormGroup, FormArray e validators na prática.',
      modules: [
        {
          id: 'm1',
          name: 'Introdução',
          lessons: [
            { id: 'l1', name: 'Aula 1' },
            { id: 'l2', name: 'Aula 2' },
          ],
        },
        {
          id: 'm2',
          name: 'Conceitos Avançados',
          lessons: [
            { id: 'l3', name: 'Aula 3' },
            { id: 'l4', name: 'Aula 4' },
            { id: 'l5', name: 'Aula 5' },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'API REST com Spring Boot',
      category: 'Backend',
      description:
        'Construa APIs robustas com Java, Spring Boot, JPA e boas práticas de arquitetura.',
      modules: [
        { id: 'm3', name: 'Setup', lessons: [{ id: 'l6', name: 'Aula 1' }] },
        {
          id: 'm4',
          name: 'Endpoints',
          lessons: [
            { id: 'l7', name: 'Aula 2' },
            { id: 'l8', name: 'Aula 3' },
            { id: 'l9', name: 'Aula 4' },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'API REST com Spring Boot',
      category: 'Backend',
      description:
        'Construa APIs robustas com Java, Spring Boot, JPA e boas práticas de arquitetura.',
      modules: [
        { id: 'm3', name: 'Setup', lessons: [{ id: 'l6', name: 'Aula 1' }] },
        {
          id: 'm4',
          name: 'Endpoints',
          lessons: [
            { id: 'l7', name: 'Aula 2' },
            { id: 'l8', name: 'Aula 3' },
            { id: 'l9', name: 'Aula 4' },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'API REST com Spring Boot',
      category: 'Backend',
      description:
        'Construa APIs robustas com Java, Spring Boot, JPA e boas práticas de arquitetura.',
      modules: [
        { id: 'm3', name: 'Setup', lessons: [{ id: 'l6', name: 'Aula 1' }] },
        {
          id: 'm4',
          name: 'Endpoints',
          lessons: [
            { id: 'l7', name: 'Aula 2' },
            { id: 'l8', name: 'Aula 3' },
            { id: 'l9', name: 'Aula 4' },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'API REST com Spring Boot',
      category: 'Backend',
      description:
        'Construa APIs robustas com Java, Spring Boot, JPA e boas práticas de arquitetura.',
      modules: [
        { id: 'm3', name: 'Setup', lessons: [{ id: 'l6', name: 'Aula 1' }] },
        {
          id: 'm4',
          name: 'Endpoints',
          lessons: [
            { id: 'l7', name: 'Aula 2' },
            { id: 'l8', name: 'Aula 3' },
            { id: 'l9', name: 'Aula 4' },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'API REST com Spring Boot',
      category: 'Backend',
      description:
        'Construa APIs robustas com Java, Spring Boot, JPA e boas práticas de arquitetura.',
      modules: [
        { id: 'm3', name: 'Setup', lessons: [{ id: 'l6', name: 'Aula 1' }] },
        {
          id: 'm4',
          name: 'Endpoints',
          lessons: [
            { id: 'l7', name: 'Aula 2' },
            { id: 'l8', name: 'Aula 3' },
            { id: 'l9', name: 'Aula 4' },
          ],
        },
      ],
    },
    {
      id: '2',
      name: 'API REST com Spring Boot',
      category: 'Backend',
      description:
        'Construa APIs robustas com Java, Spring Boot, JPA e boas práticas de arquitetura.',
      modules: [
        { id: 'm3', name: 'Setup', lessons: [{ id: 'l6', name: 'Aula 1' }] },
        {
          id: 'm4',
          name: 'Endpoints',
          lessons: [
            { id: 'l7', name: 'Aula 2' },
            { id: 'l8', name: 'Aula 3' },
            { id: 'l9', name: 'Aula 4' },
          ],
        },
      ],
    },
  ];

  allCourses: CourseModel[] = [];
  courses$!: Observable<CourseModel[]>;
  isSearching = false;

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe((courses) => {
      this.allCourses = courses;
      this.onSearchChanged('');
    });
  }

  onDeleteCourse(courseId: string): void {
    this.courseService.delete(courseId).subscribe(() => {
      this.loadCourses();
    });
  }

  onSearchChanged(searchTerm: string): void {
    this.isSearching = searchTerm.length > 0;

    // Se forçamos o estado de "sem resultados", a busca sempre retorna um array vazio
    if (this.forceNoResultsState) {
      this.courses$ = of([]);
      this.isSearching = true; // Simula que estamos em modo de busca
      return;
    }

    if (!this.isSearching) {
      this.courses$ = of(this.allCourses);
    } else {
      const filtered = this.allCourses.filter((course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      this.courses$ = of(filtered);
    }
  }

  onViewChanged(view: 'grid' | 'list'): void {
    this.currentView = view;
  }

  navigateToCreateCourse(): void {
    console.log('Navegando para a página de criação...');
  }
}
