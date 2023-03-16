import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { from } from 'rxjs';
import { DepartmentService } from 'src/app/department/department.service';
import {
  addDepartment,
  addDepartmentSuccess,
  deleteDepartment,
  deleteDepartmentSuccess,
  loadDepartments,
  loadDepartmentsSuccess,
  updateDepartment,
  updateDepartmentSuccess,
} from './department.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class DepartmentEffects {
  constructor(
    private actions$: Actions,
    private deptService: DepartmentService
  ) {}

  //run this code when loadDepartments action is dispatched
  loadDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDepartments),
      switchMap(() =>
        // Call department service as a side effect and return departments
        from(this.deptService.getDepartments()).pipe(
          // Take the returned value and return a new success action containing the departments
          map((response: any) =>
            loadDepartmentsSuccess({ departments: response.data })
          )
        )
      )
    )
  );
  //run this code when addDepartment action is dispatched
  addDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDepartment),
      switchMap((request) =>
        // Call Department service as a side effect and return Department
        from(this.deptService.addUpdateDepartment(request.department)).pipe(
          // delay(1000),
          // Take the returned value and return a new success action containing the Department
          map((response: any) => addDepartmentSuccess({ department: response }))
        )
      )
    )
  );

  //run this code when updateDepartment action is dispatched
  updateDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateDepartment),
      switchMap((request) =>
        // Call Department service as a side effect and return updated Department
        from(this.deptService.addUpdateDepartment(request.department)).pipe(
          // Take the returned value and return a new success action containing the updated Department
          map((response: any) =>
            updateDepartmentSuccess({ department: response })
          )
        )
      )
    )
  );

  //run this code when deleteDepartment action is dispatched
  deleteDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteDepartment),
      switchMap((request) =>
        // Call Department service as a side effect and delete Department
        from(this.deptService.deleteDepartment(request.department)).pipe(
          map((response: any) => deleteDepartmentSuccess(response))
        )
      )
    )
  );
}
