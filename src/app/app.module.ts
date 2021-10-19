import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewComponent } from './view/view.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SortComponent } from './view/header/sort/sort.component';
import { FilterComponent } from './view/header/filter/filter.component';
import { EditComponent } from './view/edit/edit.component';
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

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    SortComponent,
    FilterComponent,
    EditComponent,
    TagsComponent,
    HeaderComponent,
    PriorityComponent
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

        FontAwesomeModule,
        MatButtonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
