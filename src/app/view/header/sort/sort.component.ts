import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToDo} from '../../../models/ToDo';
import {FormControl} from '@angular/forms';

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
  sortCtrl = new FormControl();

  @Output() emitSort = new EventEmitter();

  constructor() {
    this.sortCtrl.valueChanges.subscribe((type: number) => {
      this.emitSort.emit(this.sortTypes[type]);
    });

    setTimeout(() => {
      this.sortCtrl.setValue(this.defaultSort);
    }, 13);

  }
}
