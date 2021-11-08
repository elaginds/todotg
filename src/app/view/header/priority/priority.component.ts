import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IconsShared} from '../../../shared/icons.shared';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss']
})
export class PriorityComponent implements OnInit {
  public is = new IconsShared();
  public priority = {
    full: true,
    half: true,
    empty: true
  };
  public showRemoved = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.emitPriority.emit(this.createPriorityArr());
      this.emitPriorityLabel.emit(this.createPriorityLabel());
      this.emitRemoved.emit(this.showRemoved);
    }, 13);
  }

  @Output() emitPriority = new EventEmitter();
  @Output() emitPriorityLabel = new EventEmitter();
  @Output() emitRemoved = new EventEmitter();

  public changePriority(name: number): void {
    this.priority[name] = !this.priority[name];

    /*if (!this.priority.full && !this.priority.half && !this.priority.empty) {
      this.priority.full = true;
      this.priority.half = true;
      this.priority.empty = true;
    }*/

    this.emitPriority.emit(this.createPriorityArr());
    this.emitPriorityLabel.emit(this.createPriorityLabel());
  }

  public changeRemoved(): void {
    this.showRemoved = !this.showRemoved;

    this.emitRemoved.emit(this.showRemoved);
  }

  private createPriorityArr(): number[] {
    let result = [];

    if (this.priority.full) {
      result.push(1);
    }

    if (this.priority.half) {
      result.push(2);
    }

    if (this.priority.empty) {
      result.push(3);
    }

    if (!result.length) {
      result = [1, 2, 3];
    }

    return result;
  }

  private createPriorityLabel(): string {
    const result = [];

    if (this.priority.full) {
      result.push('Высокая');
    }

    if (this.priority.half) {
      result.push('Средняя');
    }

    if (this.priority.empty) {
      result.push('Низкая');
    }

    return result && result.length ? result.join(', ') : '';
  }
}
