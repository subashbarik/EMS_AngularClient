import { NgModule } from '@angular/core';
import { DepartmentListComponent } from './department-list.component';
import { DepartmentRoutingModule } from './department-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DepartmentFormComponent } from './department-form/department-form.component';

@NgModule({
  declarations: [DepartmentListComponent, DepartmentFormComponent],
  imports: [SharedModule, DepartmentRoutingModule],
})
export class DepartmentModule {}
