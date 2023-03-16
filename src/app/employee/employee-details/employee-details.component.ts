import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CoreService } from 'src/app/core/core.service';
import { IServerAppConfiguration } from 'src/app/shared/models/serverappconfiguration';
import { selectEmployee } from 'src/app/state/employee/employee.selectors';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  public serverAppConfig: IServerAppConfiguration;
  public employee$ = this.store.select(
    selectEmployee(+this.router.snapshot.paramMap.get('id'))
  );
  constructor(
    private store: Store,
    private router: ActivatedRoute,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getServerConfiguration();
  }
  getServerConfiguration() {
    this.serverAppConfig = this.coreService.serverAppConfig;
  }
}
