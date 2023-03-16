import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-department-employee-report',
  templateUrl: './department-employee-report.component.html',
  styleUrls: ['./department-employee-report.component.scss'],
})
export class DepartmentEmployeeReportComponent implements OnInit {
  reportUrl: SafeResourceUrl = '';
  urlString: string = environment.reportServerUrl + 'DepartmentEmployee_Local';
  //urlString: string = 'http://localhost:63702/UserReport';
  //urlString: string =
  // 'http://laptop-vd1go2pn:81/ReportServer?/User&rc:Toolbar=false&rs:Command=Render';
  constructor(private domSanitizer: DomSanitizer) {
    this.reportUrl = domSanitizer.bypassSecurityTrustResourceUrl(
      this.urlString
    );
  }

  ngOnInit(): void {}
}
