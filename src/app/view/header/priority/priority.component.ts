import {Component, EventEmitter, Output} from '@angular/core';
import {faBatteryEmpty, faBatteryFull, faBatteryHalf, faTimesCircle, faTrash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss']
})
export class PriorityComponent {
  public faIcons = {
    faTimesCircle,
    faBatteryFull,
    faBatteryHalf,
    faBatteryEmpty,
    faTrash
  };
  public priority = {
    full: true,
    half: true,
    empty: true
  };
  public showRemoved = false;

  @Output() emitPriority = new EventEmitter();
  @Output() emitRemoved = new EventEmitter();

  public changePriority(name: number): void {
    this.priority[name] = !this.priority[name];

    this.emitPriority.emit(this.createPriorityArr());
  }

  public changeRemoved(): void {
    this.showRemoved = !this.showRemoved;

    this.emitRemoved.emit(this.showRemoved);
  }

  private createPriorityArr(): number[] {
    const result = [];

    if (this.priority.full) {
      result.push(1);
    }

    if (this.priority.half) {
      result.push(2);
    }

    if (this.priority.empty) {
      result.push(3);
    }

    return result;
  }
}
