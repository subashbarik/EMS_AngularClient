import { NgModule } from '@angular/core';
import { DepartmentEmployeeReportComponent } from './department-employee-report.component';
import { SharedModule } from '../shared/shared.module';
import { ReportRoutingModule } from './report-routing.module';

@NgModule({
  declarations: [DepartmentEmployeeReportComponent],
  imports: [SharedModule, ReportRoutingModule],
})
export class ReportModule {}
