import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandeactivateGuard } from '../core/guards/candeactivate.guard';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentListComponent } from './department-list.component';

const route: Routes = [
  { path: '', component: DepartmentListComponent },
  {
    path: 'add',
    component: DepartmentFormComponent,
    canDeactivate: [CandeactivateGuard],
  },
  {
    path: 'update/:id',
    component: DepartmentFormComponent,
    canDeactivate: [CandeactivateGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class DepartmentRoutingModule {}
