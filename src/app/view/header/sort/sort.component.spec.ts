import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortComponent } from './sort.component';
import {ToDo} from '../../../models/ToDo';

describe('SortComponent', () => {
  let component: SortComponent;
  let fixture: ComponentFixture<SortComponent>;
  const testTodos = [
    new ToDo({
      id: 1,
      userid: 1,
      type: 1,
      text: 'bsecond',
      tags: null,
      note: '',
      priority: 2,
      done: false,
      createDate: new Date(),
      editDate: null,
      removeDate: null
    }),
    new ToDo({
      id: 3,
      userid: 1,
      type: 1,
      text: 'afirst',
      tags: null,
      note: '',
      priority: 3,
      done: false,
      createDate: new Date(),
      editDate: null,
      removeDate: null
    }),
    new ToDo({
      id: 2,
      userid: 1,
      type: 1,
      text: 'ctree',
      tags: null,
      note: '',
      priority: 1,
      done: false,
      createDate: new Date(),
      editDate: null,
      removeDate: null
    })];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*it('should sort PRIORITY ASC', () => {
    component.todoList = testTodos;

    const sorted = component['sort'](0);

    let sortedResult = true;
    let sortedValue = null;

    sorted.forEach(item => {
      if (item.priority < sortedValue) {
        sortedResult = false;
      }

      sortedValue = item.priority;
    });

    expect(sortedResult).toBeTruthy();
  });*/

  /*it('should sort PRIORITY DESC', () => {
    component.todoList = testTodos;

    const sorted = component['sort'](1);

    let sortedResult = true;
    let sortedValue = 1000;

    sorted.forEach(item => {
      if (item.priority > sortedValue) {
        sortedResult = false;
      }

      sortedValue = item.priority;
    });

    expect(sortedResult).toBeTruthy();
  });*/

  /*it('should sort TEXT ASC', () => {
    component.todoList = testTodos;

    const sorted = component['sort'](2);

    let sortedResult = true;
    let sortedValue = '';

    sorted.forEach(item => {
      if (item.text.toLowerCase() < sortedValue.toLowerCase()) {
        sortedResult = false;
      }

      sortedValue = item.text;
    });

    expect(sortedResult).toBeTruthy();
  });*/

  /*it('should sort TEXT DESC', () => {
    component.todoList = testTodos;

    const sorted = component['sort'](3);

    let sortedResult = true;
    let sortedValue = 'ZZZZZZZZZ';

    sorted.forEach(item => {
      if (item.text.toLowerCase() > sortedValue.toLowerCase()) {
        sortedResult = false;
      }

      sortedValue = item.text;
    });

    expect(sortedResult).toBeTruthy();
  });*/
});
