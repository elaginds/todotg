import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiService} from '../../../services/api.service';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import {Tags} from '../../../models/Tags';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  faCheckSquare = faCheckSquare;
  inputText = '';
  showInput = false;
  tagsCtrl = new FormControl();
  tags: Tags[] = [];
  // tslint:disable-next-line:variable-name
  _todoTags: number[] = [];

  @Input() set type(type: string) {
    this.showInput = type === 'edit';
  }

  @Input() set todoTags(tags: number[]) {
    this._todoTags = tags;
  }

  @Output() emitTags = new EventEmitter();

  ngOnInit(): void {
    this.getTags();
  }

  constructor(private api: ApiService) {
    this.tagsCtrl.valueChanges.subscribe(tags => {
      this.emitTags.emit(tags);
    });
  }

  public addTag(): void {
    if (!this.inputText) {
      return;
    }

    this.api.addTag(this.inputText).subscribe(data => {
      this.tags = data;

      const newTagId = this.getTagIdByValue(this.inputText);

      if (newTagId) {
        this.tagsCtrl.value.push(this.getTagIdByValue(this.inputText));
      }

      this.inputText = '';
    });
  }

  private getTagIdByValue(value: string): number {
    let result = null;

    this.tags.forEach((item: Tags) => {
      if (item.value === value) {
        result = item.id;
      }
    });

    return result;
  }

  private getTags(): void {
    this.api.getTags().subscribe(tags => {
      this.tags = tags;
      this.tagsCtrl.setValue(this._todoTags);
    }, error => {
      console.warn(error);
    });
  }

}
