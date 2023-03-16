import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentEmployeeReportComponent } from './department-employee-report.component';

const route: Routes = [
  { path: '', component: DepartmentEmployeeReportComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
