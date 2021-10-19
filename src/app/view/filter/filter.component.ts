import {Component, EventEmitter, Output} from '@angular/core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  public faTimesCircle = faTimesCircle;
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
