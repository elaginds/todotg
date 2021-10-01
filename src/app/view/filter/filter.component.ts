import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {ToDo} from '../../models/ToDo';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  faTimesCircle = faTimesCircle;

  @Input() set todoList(todoList: ToDo[]) {
    this.todos = todoList;
    this.onFilterStringChange();
  }
  private todos: ToDo[];
  public text = '';

  @Output() emitFilteredTodos = new EventEmitter();

  private static filterFn(todo: ToDo, text: string): boolean {
    if (!text) {
      return true;
    }

    if (!todo.text || !todo.text.toLowerCase) {
      return false;
    }

    return todo.text.toLowerCase().indexOf(text.toLowerCase()) !== -1;
  }

  public onFilterStringChange(str?: string): void {
    if (!str) {
      this.text = '';
    }

    if (this.todos && this.todos.filter) {
      this.emitFilteredTodos.emit(this.todos.filter(todo => {
        return FilterComponent.filterFn(todo, this.text);
      }));
    }
  }
}
