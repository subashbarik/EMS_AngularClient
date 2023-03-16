import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { CandeactivateGuard } from '../core/guards/candeactivate.guard';

const route: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'details/:id', component: EmployeeDetailsComponent },
  {
    path: 'add',
    component: EmployeeFormComponent,
    canDeactivate: [CandeactivateGuard],
  },
  {
    path: 'update/:id',
    component: EmployeeFormComponent,
    canDeactivate: [CandeactivateGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
