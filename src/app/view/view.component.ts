import {Component} from '@angular/core';
import {ApiService} from '../services/api.service';
import {ToDo} from '../models/ToDo';
import {ModalComponent} from './modal/modal.component';
import {MatDialog} from '@angular/material/dialog';
import {IconsShared} from '../shared/icons.shared';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarComponent} from './snack-bar/snack-bar.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent {
  public is = new IconsShared();
  public todoList: ToDo[] = null;
  public sortedTodoList: ToDo[];
  public filteredTodoList: ToDo[];
  public dividedTodoList: {
    original: ToDo[],
    done: ToDo[],
    removed: ToDo[]
  } = {
    original: [],
    done: [],
    removed: []
  };
  public newToDo = new ToDo();
  public selectPriority = [
    {
    value: 1,
    name: 'Высокая'
  }, {
    value: 2,
    name: 'Средняя'
  }, {
    value: 3,
    name: 'Низкая'
  }];
  public currentUser = null;

  public get originalLabel(): string {
    return `Текущие (${this.dividedTodoList.original.length})`;
  }

  public get doneLabel(): string {
    return `Завершенные (${this.dividedTodoList.done.length})`;
  }

  public get removedLabel(): string {
    return `Удаленные (${this.dividedTodoList.removed.length})`;
  }


  constructor(private api: ApiService,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {}

  public setTodoList(todoList: ToDo[]): void {
    // this.sortedTodoList = todoList;

    this.dividedTodoList = this.divideTodoList(todoList);
  }

  private divideTodoList(todoList: ToDo[]): any {
    const result = {
      original: [],
      done: [],
      removed: []
    };

    if (todoList && todoList.forEach) {
      todoList.forEach((item: ToDo) => {
        if (item.removeDate) {
          result.removed.push(item);
        } else if (item.doneDate) {
          result.done.push(item);
        } else {
          result.original.push(item);
        }
      });
    }

    return result;
  }

  public addToDo(newToDo): void {
    const todo = new ToDo(newToDo);

    this.api.postToDo(todo).subscribe(data => {
      this.todoList = data;

      this.newToDo = new ToDo();

      this.openSnackBar(todo.text, 'add');
    }, err => {
      console.warn(err);
      this.newToDo = new ToDo();
    });
  }

  public editToDo({todo, type}): void {
    this.api.editToDo(todo).subscribe(data => {
      this.todoList = data;

      this.newToDo = new ToDo();

      this.openSnackBar(todo.text, type);
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
      console.log('The dialog was closed', isNew, result);

      if (!result) {
        return;
      }

      if (isNew) {
        this.addToDo(result);
      } else {
        todo.editDate = new Date();

        this.editToDo({
          todo: result,
          type: 'edit'
        });
      }
    });
  }

  public openSnackBar(text: string, type: string): void {
    this.snackBar.openFromComponent(SnackBarComponent,  {
      duration: 100000,
      panelClass: `snack-bar-${type}`,
      data: {
        text,
        type
      }
    });

    /*this.snackBar.open(message);
    setTimeout(() => {
      this.snackBar.dismiss();
    }, 1500);*/
  }
}
