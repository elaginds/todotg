import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {SortOptions} from '../../../models/SortOptions';

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
  private sortTypes: SortOptions[] = [
    {
      name: 'priority',
      label: 'Важность ↓',
      isAsc: true
    }, {
      name: 'priority',
      label: 'Важность ↑',
      isAsc: false
    }, {
      name: 'text',
      label: 'По алфавиту ↓',
      isAsc: true
    }, {
      name: 'text',
      label: 'По алфавиту ↑',
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
