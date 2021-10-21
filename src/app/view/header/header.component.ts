import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../models/User';
import {ToDo} from '../../models/ToDo';
import {ApiService} from '../../services/api.service';
import {FilterService} from '../../services/filter.service';
import {SortService} from '../../services/sort.service';
import {FilterOptions} from '../../models/FilterOptions';
import {SortOptions} from '../../models/SortOptions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private originalTodoList: ToDo[] | null = null;
  private filteredTodoList: ToDo[] | null = null;
  private sortedTodoList: ToDo[] | null = null;
  private filterOptions: FilterOptions = {
    str: '',
    tags: null,
    priority: [],
    showRemoved: false
  };
  private sortOptions: SortOptions = {
    name: 'priority',
    isAsc: true
  };

  @Input() set user(user: User | null) {
    if (user && user.userid) {
      setTimeout(() => {
        this.getTodos(user.userid);
      }, 13);
    }
  }

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
              private sortService: SortService) { }

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

  public onChangePriority($event): void {
    this.filterOptions.priority = $event;
    this.runFilter();
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

  private getTodos(userid): void {
    this.api.getTodos(userid).subscribe(data => {
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


