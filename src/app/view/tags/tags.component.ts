import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import {Tags} from '../../models/Tags';

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
  _todoTags: Tags[] = [];

  @Input() set type(type: string) {
    this.showInput = type === 'edit';
  }

  @Input() set todoTags(tags: Tags[]) {
    console.log(tags);

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
    });


    this.inputText = '';
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
