import {Component, Input} from '@angular/core';
import {faBatteryEmpty, faBatteryFull, faBatteryHalf, faEdit, faStar, faStarHalf, faTrash, faTrashRestore} from '@fortawesome/free-solid-svg-icons';
import {ApiService} from '../services/api.service';
import {ToDo} from '../models/ToDo';
import {ModalComponent} from './modal/modal.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  public faIcons = {
    faBatteryFull,
    faBatteryHalf,
    faBatteryEmpty,
    faEdit,
    faStar,
    faStarHalf,
    faTrash,
    faTrashRestore
  };
  public todoList: ToDo[] = null;
  public sortedTodoList: ToDo[];
  public filteredTodoList: ToDo[];
  public newToDo = new ToDo();
  public selectPriority = [
    {
    value: 1,
    name: 'Важно'
  }, {
    value: 2,
    name: 'Средне'
  }, {
    value: 3,
    name: 'Не важно'
  }];
  public currentUser = null;


  @Input() user;

  constructor(private api: ApiService,
              public dialog: MatDialog) {

    /*setTimeout(() => {
      this.openDialog(null);
    }, 100);*/
  }

  public setTodoList(todoList: ToDo[]): void {
    this.sortedTodoList = todoList;
  }

  public addToDo(newToDo): void {
    const todo = new ToDo(newToDo);

    this.api.postToDo(todo).subscribe(data => {
      this.todoList = data;
      /*this.todoList = data.map(item => {
        return new ToDo(item);
      });*/

      this.newToDo = new ToDo();
    }, err => {
      console.warn(err);
      this.newToDo = new ToDo();
    });
  }

  public remove(todo): void {
    if (!todo.removeDate) {
      todo.removeDate = new Date();
    } else {
      todo.removeDate = null;
    }

    this.edit(todo);
  }

  public edit(todo): void {
    todo.editDate = new Date();

    this.api.editToDo(todo).subscribe(data => {
      this.todoList = data;
      /*this.todoList = data.map(item => {
        return new ToDo(item);
      });*/

      this.newToDo = new ToDo();
    }, err => {
      console.warn(err);
      this.newToDo = new ToDo();
    });
  }

  public openDialog(todo: ToDo | null): void {
    const isNew = Boolean(!todo);

    if (!todo) {
      todo = new ToDo();
    }

    const dialogRef = this.dialog.open(ModalComponent, {
      data: todo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

      if (!result) {
        return;
      }

      if (isNew) {
        this.addToDo(result);
      } else {
        this.edit(result);
      }
    });
  }

}
