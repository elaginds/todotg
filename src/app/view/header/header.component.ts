import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ToDo} from '../../models/ToDo';
import {ApiService} from '../../services/api.service';
import {FilterService} from '../../services/filter.service';
import {SortService} from '../../services/sort.service';
import {FilterOptions} from '../../models/FilterOptions';
import {SortOptions} from '../../models/SortOptions';
import {IconsShared} from '../../shared/icons.shared';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public is = new IconsShared();
  private originalTodoList: ToDo[] | null = null;
  private filteredTodoList: ToDo[] | null = null;
  private sortedTodoList: ToDo[] | null = null;
  public filterOptions: FilterOptions = {
    str: '',
    tags: null,
    priority: [],
    showRemoved: false,
    tagsLabel: '',
    priorityLabel: ''
  };
  public sortOptions: SortOptions = {
    name: 'priority',
    label: 'Важность ↓',
    isAsc: true
  };

  @Input() set todoList(todoList: ToDo[] | null) {
    if (!todoList || !todoList.map) {
      return;
    }

    this.originalTodoList = todoList.map(item => {
      return new ToDo(item);
    });

    this.runFilter();
  }

  @Output() emitTodoList = new EventEmitter();

  constructor(private api: ApiService,
              private filterService: FilterService,
              private sortService: SortService) {
    setTimeout(() => {
      this.getTodos();
    }, 13);
  }

  public onChangeSort($event): void {
    this.sortOptions = $event;

    this.runSort();
  }

  public onChangeFilterString($event): void {
    this.filterOptions.str = $event;
    this.runFilter();
  }

  public onChangeTags($event): void {
    this.filterOptions.tags = $event;
    this.runFilter();
  }

  public onEmitTagsLabel($event): void {
    this.filterOptions.tagsLabel = $event;
  }

  public onChangePriority($event): void {
    this.filterOptions.priority = $event;
    this.runFilter();
  }

  public onChangePriorityLabel($event): void {
    this.filterOptions.priorityLabel = $event;
  }

  public onChangeRemoved($event): void {
    this.filterOptions.showRemoved = $event;
    this.runFilter();
  }

  private runFilter(): void {
    this.filteredTodoList = this.filterService.filter(this.originalTodoList, this.filterOptions);

    this.runSort();
  }

  private runSort(): void {
    this.sortedTodoList = this.sortService.sort(this.filteredTodoList, this.sortOptions);

    this.emitTodoList.emit(this.sortedTodoList);
  }

  private getTodos(): void {
    this.api.getTodos().subscribe(data => {
        this.originalTodoList = data.map(item => {
          return new ToDo(item);
        });

        this.runFilter();
      },
      error => {
        console.warn(error);
      });
  }

}


