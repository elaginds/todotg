import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ApiService} from '../../../services/api.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  selectable = true;
  removable = true;
  showInput = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagsCtrl = new FormControl();
  filteredTags: Observable<any>;
  tags: string[] = ['India'];
  allTags: string[] = [];

  @Input() set todoTags(tags: string[]) {
    this.tags = tags || [];
  }

  @Input() set type(type: string) {
    this.showInput = type === 'edit';
  }

  @Output() emitTags = new EventEmitter();

  @ViewChild('tagInput') tagInput: ElementRef;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  ngOnInit(): void {
    this.getTags();
  }

  constructor(private api: ApiService) {
    this.filteredTags = this.tagsCtrl.valueChanges.pipe(
      startWith(null),
      map(() => {
        if (!this.showInput) {
          this.trimTags();
        }
      }),
      map(() => {
        return this.createFilteredTags();
        // return country ? this._filter(country) : this.allCountries.slice();
      }));
  }

  private trimTags(): void {
    if (!this.tags || !this.tags.length) {
      return;
    }

    const lastTag = this.tags[this.tags.length - 1];

    if (this.allTags.indexOf(lastTag) === -1) {
      this.tags.pop();
    }
  }

  private getTags(): void {
    this.api.getTags().subscribe(tags => {
      this.allTags = tags;
      this.tagsCtrl.setValue(null);
    }, error => {
      console.warn(error);
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our country
    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.tagsCtrl.setValue(null);

    this.emitTags.emit(this.tags);
  }

  remove(country: string): void {
    const index = this.tags.indexOf(country);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    this.emitTags.emit(this.tags);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagsCtrl.setValue(null);
    this.emitTags.emit(this.tags);
  }

  /*private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCountries.filter(country => country.toLowerCase().indexOf(filterValue) === -1);
  }*/

  private createFilteredTags(): string[] {
    return this.allTags.filter(country => {
      if (this.tags && this.tags.indexOf) {
        return this.tags.indexOf(country) === -1;
      } else {
        return true;
      }
    });
  }

}
