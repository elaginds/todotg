import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SortComponent } from './view/header/sort/sort.component';
import { FilterComponent } from './view/header/filter/filter.component';
import { MatChipsModule } from '@angular/material/chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {TagsComponent} from './view/header/tags/tags.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { HeaderComponent } from './view/header/header.component';
import { PriorityComponent } from './view/header/priority/priority.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import { ModalComponent } from './view/modal/modal.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import { ListComponent } from './view/list/list.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackBarComponent } from './view/snack-bar/snack-bar.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    SortComponent,
    FilterComponent,
    TagsComponent,
    HeaderComponent,
    PriorityComponent,
    ModalComponent,
    ListComponent,
    SnackBarComponent,
    AuthComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatTabsModule,
    MatSnackBarModule,

    FontAwesomeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
