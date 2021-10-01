import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';
import {User} from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'todotg';
  user = null;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.api.getUser().subscribe(user => {
      console.log(user);
      this.user = new User(user);
    }, error => {
      console.warn(error);
    });
  }
}
