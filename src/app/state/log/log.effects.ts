import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, switchMap } from 'rxjs';
import { LogService } from 'src/app/log/log.service';
import { loadLogs, loadLogsSuccess } from './log.actions';

@Injectable()
export class LogEffect {
  constructor(private actions$: Actions, private logService: LogService) {}

  //run this code when loadLogs action is dispatched
  loadLogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadLogs),
      switchMap(() =>
        // Call ddsignation service as a side effect and return logs
        from(this.logService.getLogs()).pipe(
          // Take the returned value and return a new success action containing the logs
          map((response: any) =>
            loadLogsSuccess({ logs: response.data, count: response.count })
          )
        )
      )
    )
  );
}
