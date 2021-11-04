import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToDo} from '../../models/ToDo';
import {IconsShared} from '../../shared/icons.shared';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public is = new IconsShared();

  @Input() todoList: ToDo[] = null;

  @Output() emitToDo = new EventEmitter();
  @Output() emitToDoEdit = new EventEmitter();

  public done(todo): void {
    if (!todo.doneDate) {
      todo.doneDate = new Date();
    } else {
      todo.doneDate = null;
    }

    this.emitToDo.emit({
      todo,
      type: todo.doneDate ? 'done' : 'undone'
    });
  }

  public remove(todo): void {
    if (!todo.removeDate) {
      todo.removeDate = new Date();
    } else {
      todo.removeDate = null;
    }

    this.emitToDo.emit({
      todo,
      type: todo.removeDate ? 'remove' : 'restore'
    });
  }

  public edit(todo): void {
    this.emitToDoEdit.emit(todo);
  }
}
