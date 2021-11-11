import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IconsShared} from '../../../shared/icons.shared';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss']
})
export class PriorityComponent implements OnInit {
  public formGroup: FormGroup;
  public is = new IconsShared();

  @Output() emitPriority = new EventEmitter();

  ngOnInit(): void {
    setTimeout(() => {
      this.emitPriority.emit(this.createPriorityArr());
    }, 13);
  }

  constructor(private fb: FormBuilder) {
    this.formGroup = fb.group({
      full: true,
      half: true,
      empty: true
    });

    this.formGroup.valueChanges.subscribe(() => {
      this.emitPriority.emit(this.createPriorityArr());
    });
  }

  private createPriorityArr(): number[] {
    let result = [];

    const values = this.formGroup.value;

    if (values.full) {
      result.push(1);
    }

    if (values.half) {
      result.push(2);
    }

    if (values.empty) {
      result.push(3);
    }

    if (!result.length) {
      result = [1, 2, 3];
    }

    return result;
  }
}
