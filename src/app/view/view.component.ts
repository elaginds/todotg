import {Component, Input} from '@angular/core';
import {faBatteryEmpty, faBatteryFull, faBatteryHalf, faEdit, faStar, faStarHalf, faTrash, faTrashRestore} from '@fortawesome/free-solid-svg-icons';
import {ApiService} from '../services/api.service';
import {User} from '../models/User';
import {ToDo} from '../models/ToDo';

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

  @Input() set user(user: User | null) {
    if (user && user.userid) {
      setTimeout(() => {
        this.getTodos(user.userid);
      }, 1000);
    }
  }

  constructor(private api: ApiService) {
  }

  public setSortedTodos(todos: ToDo[]): void {
    this.sortedTodoList = todos;
  }

  public setFilteredTodos(todos: ToDo[]): void {
    setTimeout(() => {
      this.sortedTodoList = todos;
    }, 13);

  }

  public addToDo(newToDo): void {
    const todo = new ToDo(newToDo);
    delete todo.isEdit;

    this.api.postToDo(todo).subscribe(data => {
      this.todoList = data.map(item => {
        return new ToDo(item);
      });

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
    delete todo.isEdit;
    this.api.editToDo(todo).subscribe(data => {
      this.todoList = data.map(item => {
        return new ToDo(item);
      });

      this.newToDo = new ToDo();
    }, err => {
      console.warn(err);
      this.newToDo = new ToDo();
    });
  }

  private getTodos(userid): void {
    this.api.getTodos(userid).subscribe(data => {
        this.todoList = data.map(item => {
          return new ToDo(item);
        });

        /*this.sortedTodoList = data.map(item => {
          return new ToDo(item);
        });*/
      },
      error => {
        console.warn(error);
      });
  }

}
