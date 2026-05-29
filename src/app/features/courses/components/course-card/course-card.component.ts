import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseModel } from '../../../../shared/models/course-model';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-course-card',
  imports: [UpperCasePipe],
  templateUrl: './course-card.component.html',
})
export class CourseCardComponent {
  // 1. Recebe o objeto completo do curso a partir do componente pai.
  // O '!' é um operador que informa ao TypeScript que 'course' será inicializado pelo Angular.
  @Input() course!: CourseModel;

  // 2. Emite o ID do curso quando o botão de editar é clicado.
  @Output() edit = new EventEmitter<string>();

  // 3. Emite o ID do curso quando o botão de excluir é clicado.
  @Output() delete = new EventEmitter<string>();

  /**
   * Calcula o número total de aulas somando as aulas de todos os módulos.
   * @returns O número total de aulas do curso.
   */
  getTotalLessons(): number {
    if (!this.course || !this.course.modules) {
      return 0;
    }
    // Usa o método 'reduce' para somar o tamanho do array 'lessons' de cada módulo.
    return this.course.modules.reduce((total, module) => total + module.lessons.length, 0);
  }

  /**
   * Chamado quando o botão de editar é clicado.
   * Emite o evento 'edit' com o ID do curso.
   */
  onEdit(): void {
    this.edit.emit(this.course.id);
  }

  /**
   * Chamado quando o botão de excluir é clicado.
   * Emite o evento 'delete' com o ID do curso.
   */
  onDelete(): void {
    // Adicionar uma confirmação antes de excluir é uma boa prática.
    if (confirm(`Tem certeza que deseja excluir o curso "${this.course.name}"?`)) {
      this.delete.emit(this.course.id);
    }
  }
}
