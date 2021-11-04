import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {
  public messageBegin = 'Задача';
  public messageEnd = {
    done: 'завершена',
    undone: 'не завершена',
    remove: 'удалена',
    restore: 'восстановлена',
    add: 'добавлена',
    edit: 'изменена'
  };

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }

}
