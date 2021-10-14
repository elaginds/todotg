import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  faBatteryEmpty,
  faBatteryFull,
  faBatteryHalf,
  faTimesCircle,
  faTrash
} from '@fortawesome/free-solid-svg-icons';
import {ToDo} from '../../models/ToDo';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  public tags: string[] | null = null;
  public showRemoved = false;
  public priority = {
    full: true,
    half: true,
    empty: true
  };
  public faIcons = {
    faTimesCircle,
    faBatteryFull,
    faBatteryHalf,
    faBatteryEmpty,
    faTrash
  };

  @Input() set todoList(todoList: ToDo[]) {
    this.todos = todoList;
    this.filter();
  }
  private todos: ToDo[];
  public text = '';

  @Output() emitFilteredTodos = new EventEmitter();

  private static filterFn(todo: ToDo, text: string, priorityArr: number[], showRemoved: boolean, tags: string[] | null): boolean {
    let result = true;

    if (text && !todo.text) {
      return false;
    }

    if (!showRemoved && todo.removeDate) {
      return false;
    }

    if (todo.text && todo.text.toLowerCase) {
      result = todo.text.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    }

    if (result && priorityArr && priorityArr.length) {
      result = priorityArr.indexOf(todo.priority) !== -1;
    }

    if (tags && tags.length) {
      if (!todo.tags || !todo.tags.length) {
        result = false;
      } else {
        tags.forEach(item => {
          if (todo.tags.indexOf(item) === -1) {
            result = false;
          }
        });

      }
    }

    return result;
  }

  public filter(str?: string): void {
    if (!str) {
      this.text = '';
    }

    if (this.todos && this.todos.filter) {
      this.emitFilteredTodos.emit(this.todos.filter(todo => {
        return FilterComponent.filterFn(todo, this.text, this.createPriorityArr(), this.showRemoved, this.tags);
      }));
    }
  }

  public changePriority(type: string): void {
    this.priority[type] = !this.priority[type];

    this.filter(this.text);
  }

  public changeRemoved(): void {
    this.showRemoved = !this.showRemoved;

    this.filter(this.text);
  }

  public setTags(tags: string[] | null): void {
    this.tags = tags;

    this.filter();
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
