import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TextInputComponent } from './components/text-input/text-input.component';
import { TableComponent } from './components/table/table.component';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { PagerComponent } from './components/pager/pager.component';
import { StringmaxlengthPipe } from './pipes/stringmaxlength.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { ThemeModule } from '../theme/theme.module';

@NgModule({
  declarations: [
    TextInputComponent,
    TableComponent,
    SelectInputComponent,
    PagerComponent,
    StringmaxlengthPipe,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    ThemeModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
    TextInputComponent,
    TableComponent,
    SelectInputComponent,
    PagerComponent,
    LoadingComponent,
    StringmaxlengthPipe,
  ],
})
export class SharedModule {}
