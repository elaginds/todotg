import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToDo} from '../../models/ToDo';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  public form: FormGroup;
  public priorityOptions = [
    {
    value: 1,
    name: 'Высокая'
  }, {
    value: 2,
    name: 'Средняя'
  }, {
    value: 3,
    name: 'Низкая'
  }];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ToDo) {
    console.log(data);
    this.form = this.fb.group({
      id: [this.data && this.data.id ? this.data.id : null],
      userid: [this.data && this.data.userid ? this.data.userid : null],
      type: [this.data && this.data.type ? this.data.type : null],
      text: [this.data && this.data.text ? this.data.text : '', Validators.required],
      tags: [this.data && this.data.tags ? this.data.tags : null],
      note: [this.data && this.data.note ? this.data.note : ''],
      priority: [this.data && this.data.priority ? this.data.priority : 1],
      done: [this.data && this.data.done ? this.data.done : false],
      createDate: [this.data && this.data.createDate ? this.data.createDate : new Date()],
      editDate: [this.data && this.data.editDate ? this.data.editDate : null],
      removeDate: [this.data && this.data.removeDate ? this.data.removeDate : null]
    });
  }

  public onEmitTags($event): void {
    this.form.get('tags').setValue($event);
  }

  onNoClick(): void {
    this.dialogRef.close(this.form.value);
  }

}
