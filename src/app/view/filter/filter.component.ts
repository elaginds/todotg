import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  faBatteryEmpty,
  faBatteryFull,
  faBatteryHalf,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import {ToDo} from '../../models/ToDo';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  public priority = {
    full: true,
    half: true,
    empty: true
  };
  public faIcons = {
    faTimesCircle,
    faBatteryFull,
    faBatteryHalf,
    faBatteryEmpty
  };

  @Input() set todoList(todoList: ToDo[]) {
    this.todos = todoList;
    this.filter();
  }
  private todos: ToDo[];
  public text = '';

  @Output() emitFilteredTodos = new EventEmitter();

  private static filterFn(todo: ToDo, text: string, priorityArr: number[]): boolean {
    let result = true;

    if (text && !todo.text) {
      return false;
    }

    if (todo.text && todo.text.toLowerCase) {
      result = todo.text.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    }

    if (result && priorityArr && priorityArr.length) {
      result = priorityArr.indexOf(todo.priority) !== -1;
    }

    return result;
  }

  public filter(str?: string): void {
    if (!str) {
      this.text = '';
    }

    if (this.todos && this.todos.filter) {
      this.emitFilteredTodos.emit(this.todos.filter(todo => {
        return FilterComponent.filterFn(todo, this.text, this.createPriorityArr());
      }));
    }
  }

  public changePriority(type: string): void {
    this.priority[type] = !this.priority[type];

    this.filter(this.text);
  }

  private createPriorityArr(): number[] {
    const result = [];

    if (this.priority.full) {
      result.push(1);
    }

    if (this.priority.half) {
      result.push(2);
    }

    if (this.priority.empty) {
      result.push(3);
    }

    return result;
  }
}
