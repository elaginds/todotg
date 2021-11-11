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
  public sortTypes: SortOptions[] = [
    {
      value: 0,
      name: 'priority',
      label: 'Важность ↓',
      isAsc: true
    }, {
      value: 1,
      name: 'priority',
      label: 'Важность ↑',
      isAsc: false
    }, {
      value: 2,
      name: 'text',
      label: 'По алфавиту ↓',
      isAsc: true
    }, {
      value: 3,
      name: 'text',
      label: 'По алфавиту ↑',
      isAsc: false
    }, {
      value: 4,
      name: 'date',
      label: 'По дате создания ↓',
      isAsc: true
    }, {
      value: 5,
      name: 'date',
      label: 'По дате создания ↑',
      isAsc: false
    }
  ];
  sortCtrl = new FormControl();

  @Output() emitSort = new EventEmitter();

  constructor() {
    this.sortCtrl.valueChanges.subscribe((type: any) => {
      this.emitSort.emit(this.sortTypes[type]);
    });

    setTimeout(() => {
      this.sortCtrl.setValue(this.defaultSort);
    }, 13);

  }
}
