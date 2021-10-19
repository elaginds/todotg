import { Injectable } from '@angular/core';
import {ToDo} from '../models/ToDo';
import { FilterOptions} from '../models/FilterOptions';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private static filterFn(todo: ToDo, options: FilterOptions): boolean {
    let result = true;

    /* ПРОВЕРКА, ЧТО СТРОКА ПОИСКА ЕСТЬ, А В ЗАДАЧЕ ОНА ОТСУТСТВУЕТ */
    if (options.str && !todo.text) {
      return false;
    }

    /* ПРОВЕРКА, ПОКАЗЫВАТЬ ЛИ УДАЛЕННЫЕ ЗАПИСИ */
    if (!options.showRemoved && todo.removeDate) {
      return false;
    }

    /* ПРОВЕРКА, ПОДХОДЯТ ЛИ ТЭГИ */
    if (options.tags && options.tags.length) {
      if (!todo.tags || !todo.tags.length) {
        result = false;
      } else {
        options.tags.forEach(item => {
          if (todo.tags.indexOf(item) === -1) {
            result = false;
          }
        });

      }
    }

    /* ПРОВЕРКА, ПОДХОДИТ ЛИ СТРОКА ПОИСКА */
    if (options.str && options.str.toLowerCase && todo.text && todo.text.toLowerCase) {
      result = todo.text.toLowerCase().indexOf(options.str.toLowerCase()) !== -1;
    }

    /* ПРОВЕРКА, ПОДХОДИТ ЛИ ЗАПИСЬ ПО ПРИОРИТЕТУ */
    if (result && options.priority && options.priority.length) {
      result = options.priority.indexOf(todo.priority) !== -1;
    }

    return result;
  }

  public filter(originalTodoList: ToDo[], options: FilterOptions): ToDo[] {
    if (originalTodoList && originalTodoList.filter) {
      return originalTodoList.filter(todo => {
        return FilterService.filterFn(todo, options);
      });
    }
  }
}
