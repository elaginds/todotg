import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToDo} from '../../models/ToDo';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {
  public defaultSort = 0;
  public selectSort = [
    {
    value: 0,
    name: 'Важность ↓'
  }, {
    value: 1,
    name: 'Важность ↑'
  }, {
    value: 2,
    name: 'По алфавиту ↓'
  }, {
    value: 3,
    name: 'По алфавиту ↑'
  }];
  private sortTypes = [
    {
      name: 'priority',
      isAsc: true
    }, {
      name: 'priority',
      isAsc: false
    }, {
      name: 'text',
      isAsc: true
    }, {
      name: 'text',
      isAsc: false
    },
  ];
  private todos: ToDo[];

  @Input() set todoList(todoList: ToDo[]) {
    this.todos = todoList;
    this.onSelectChange();
  }

  @Output() emitSortedTodos = new EventEmitter();

  public onSelectChange(target?): void {
    let type = 0;

    if (target && target.value !== undefined) {
      type = target.value;
    }

    if (this.todos && this.todos.sort) {
      this.emitSortedTodos.emit(this.sort(type));
    }
  }

  private sort(type: number): ToDo[] {
    const name = this.sortTypes[type].name;
    const isAsc = this.sortTypes[type].isAsc;

    return this.todos.sort((a: ToDo, b: ToDo) => {
      if (a[name] > b[name]) {
        return isAsc ? 1 : -1;
      } else if (a[name] < b[name]) {
        return isAsc ? -1 : 1;
      } else {
        return 0;
      }
    });
  }

}
