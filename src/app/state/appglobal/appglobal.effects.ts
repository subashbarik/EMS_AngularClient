import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { CoreService } from 'src/app/core/core.service';
import { loadGlobal, loadGlobalSuccess } from './appglobal.actions';
import { IGlobal } from 'src/app/shared/models/global';

@Injectable()
export class GlobalEffects {
  constructor(private actions$: Actions, private coreService: CoreService) {}

  //run this code when loadGlobal action is dispatched
  loadGlobal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadGlobal),
      switchMap(() =>
        // Call core service as a side effect and return global data
        from(this.coreService.loadGlobalData()).pipe(
          // Take the returned value and return a new success action containing the global data
          map((response: IGlobal) => loadGlobalSuccess({ global: response }))
        )
      )
    )
  );
}
