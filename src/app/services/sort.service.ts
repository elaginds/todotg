import { Injectable } from '@angular/core';
import {ToDo} from '../models/ToDo';
import {SortOptions} from '../models/SortOptions';

@Injectable({
  providedIn: 'root'
})
export class SortService {
  private static sortFn(a: ToDo, b: ToDo, name: string, isAsc: boolean): number {
    let A: string | number;
    let B: string | number;

    if (typeof a[name] === 'string' && typeof b[name] === 'string') {
      // @ts-ignore
      A = a[name].toLowerCase();
      // @ts-ignore
      B = b[name].toLowerCase();
    } else {
      A = a[name];
      B = b[name];
    }

    if (A > B) {
      return isAsc ? 1 : -1;
    } else if (A < B) {
      return isAsc ? -1 : 1;
    } else {
      return 0;
    }
  }

  public sort(todoList: ToDo[], options: SortOptions): ToDo[] {
    if (!todoList || !todoList.length || !todoList.sort || !options) {
      return todoList;
    }

    return todoList.sort((a: ToDo, b: ToDo) => {
      return SortService.sortFn(a, b, options.name, options.isAsc);
    });
  }
}
