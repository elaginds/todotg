import {Component, EventEmitter, Output} from '@angular/core';
import {IconsShared} from '../../../shared/icons.shared';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  public is = new IconsShared();
  public value = '';

  @Output() emitFilterString = new EventEmitter();

  public changeString(str: string): void {
    this.emitFilterString.emit(str);
  }

  public clearString(): void {
    this.value = '';

    this.emitFilterString.emit('');
  }
}
