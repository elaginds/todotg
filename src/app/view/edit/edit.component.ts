import {Component, EventEmitter, Input, Output} from '@angular/core';
import {faBatteryEmpty, faBatteryFull, faBatteryHalf, faPlusSquare, faChevronCircleDown, faChevronCircleUp} from '@fortawesome/free-solid-svg-icons';
import {ToDo} from '../../models/ToDo';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  public showOptions = false;
  public newToDo = new ToDo();
  public faIcons = {
    faBatteryFull,
    faBatteryHalf,
    faBatteryEmpty,
    faPlusSquare,
    faChevronCircleDown,
    faChevronCircleUp
  };

  @Input() set todo(todo: ToDo) {
    this.newToDo = todo;
  }

  @Output() emitTodo = new EventEmitter();

  public addToDo(): void {
    if (this.newToDo.text) {
      this.emitTodo.emit(this.newToDo);
    }
  }

  public setTags(tags: string[]): void {
    this.newToDo.tags = tags;
  }

}
