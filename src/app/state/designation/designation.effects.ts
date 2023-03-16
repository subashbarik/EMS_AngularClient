import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, map, switchMap } from 'rxjs';
import { DesignationService } from 'src/app/designation/designation.service';
import {
  addDesignation,
  addDesignationSuccess,
  deleteDesignation,
  deleteDesignationSuccess,
  loadDesignations,
  loadDesignationsSuccess,
  updateDesignation,
  updateDesignationSuccess,
} from './designation.actions';

@Injectable()
export class DesignationEffect {
  constructor(
    private actions$: Actions,
    private designationService: DesignationService
  ) {}

  //run this code when loadDesignations action is dispatched
  loadDesignations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDesignations),
      switchMap(() =>
        // Call ddsignation service as a side effect and return designations
        from(this.designationService.getDesignations()).pipe(
          // Take the returned value and return a new success action containing the designations
          map((response: any) =>
            loadDesignationsSuccess({ designations: response.data })
          )
        )
      )
    )
  );
  //run this code when addDesignation action is dispatched
  addDesignation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDesignation),
      switchMap((request) =>
        // Call Designation service as a side effect and return Designation
        from(
          this.designationService.addUpdateDesignation(request.designation)
        ).pipe(
          // delay(1000),
          // Take the returned value and return a new success action containing the Designation
          map((response: any) =>
            addDesignationSuccess({ designation: response })
          )
        )
      )
    )
  );

  //run this code when updateDesignation action is dispatched
  updateDesignation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateDesignation),
      switchMap((request) =>
        // Call Designation service as a side effect and return updated Designation
        from(
          this.designationService.addUpdateDesignation(request.designation)
        ).pipe(
          // Take the returned value and return a new success action containing the updated Designation
          map((response: any) =>
            updateDesignationSuccess({ designation: response })
          )
        )
      )
    )
  );

  //run this code when deleteDesignation action is dispatched
  deleteDesignation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteDesignation),
      switchMap((request) =>
        // Call Designation service as a side effect and delete Designation
        from(
          this.designationService.deleteDesignation(request.designation)
        ).pipe(map((response: any) => deleteDesignationSuccess(response)))
      )
    )
  );
}
