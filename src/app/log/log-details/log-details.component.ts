import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CoreService } from 'src/app/core/core.service';
import { IServerAppConfiguration } from 'src/app/shared/models/serverappconfiguration';
import { selectLog } from 'src/app/state/log/log.selectors';

@Component({
  selector: 'app-log-details',
  templateUrl: './log-details.component.html',
  styleUrls: ['./log-details.component.scss'],
})
export class LogDetailsComponent implements OnInit {
  public serverAppConfig: IServerAppConfiguration;
  public log$ = this.store.select(
    selectLog(+this.router.snapshot.paramMap.get('id'))
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
