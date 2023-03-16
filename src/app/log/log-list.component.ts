import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  logActionStatus,
  selectAllLogs,
  selectLogCount,
  selectLogParams,
} from '../state/log/log.selectors';
import { Store } from '@ngrx/store';
import { combineLatest, map, Subscription } from 'rxjs';
import { ILog } from '../shared/models/log';
import {
  loadLogs,
  resetLogParams,
  setLogParams,
} from '../state/log/log.actions';
import { LogParams } from '../shared/models/logParams';
import { IServerAppConfiguration } from '../shared/models/serverappconfiguration';
import { CoreService } from '../core/core.service';
import { TableService } from '../shared/components/table/table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss'],
})
export class LogListComponent implements OnInit, OnDestroy {
  public serverAppConfig: IServerAppConfiguration;
  public logCount: number;
  public log: ILog;
  public logs$ = this.store.select(selectAllLogs);
  public logLoadingStatus$ = this.store.select(logActionStatus);
  public logParams$ = this.store.select(selectLogParams);
  public logCount$ = this.store.select(selectLogCount);
  public vm$ = combineLatest([
    this.logs$,
    this.logLoadingStatus$,
    this.logParams$,
    this.logCount$,
  ]).pipe(
    map(([logs, loadingStatus, logParams, count]) => ({
      logs,
      loadingStatus,
      logParams,
      count,
    }))
  );
  public tableDoubleClickSubscription = new Subscription();
  constructor(
    private store: Store,
    private coreService: CoreService,
    private tableService: TableService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.store.dispatch(resetLogParams());
    this.tableDoubleClickSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getServerConfiguration();
    this.store.dispatch(loadLogs());
    this.tableDoubleClickSubscription =
      this.tableService.rowDblClicked$.subscribe({
        next: (response: number) => {
          this.router.navigate(['/main/logs/details/' + response]);
        },
      });
  }
  onPageChanged(pageNumer: number) {
    let logParams = new LogParams();
    logParams.pageIndex = pageNumer;
    this.store.dispatch(setLogParams({ params: logParams }));
    this.store.dispatch(loadLogs());
  }
  getServerConfiguration() {
    this.serverAppConfig = this.coreService.serverAppConfig;
  }
}
