import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from 'src/app/employee/employee.service';
import {
  addEmployee,
  addEmployeeSuccess,
  deleteEmployee,
  deleteEmployeeSuccess,
  loadEmployeeFormPage,
  loadEmployeeFormPageSuccess,
  loadEmployees,
  loadEmployeesSuccess,
  updateEmployee,
  updateEmployeeSuccess,
} from './employee.actions';
import { from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { IEmployee } from 'src/app/shared/models/employee';

@Injectable()
export class EmployeeEffects {
  constructor(private actions$: Actions, private empService: EmployeeService) {}

  //run this code when loadEmployee action is dispatched
  loadEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployees),
      switchMap(() =>
        // Call employee service as a side effect and return employees
        from(this.empService.getEmployees()).pipe(
          // delay(1000),
          // Take the returned value and return a new success action containing the employees
          map((response: any) =>
            loadEmployeesSuccess({
              employees: response.data,
              count: response.count,
            })
          )
          // Or... if it errors return a new failure action containing the error
          //catchError((error) => of(loadEmployeeFailure({ error })))
        )
      )
    )
  );

  //run this code when addEmployee action is dispatched
  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addEmployee),
      switchMap((request) =>
        // Call employee service as a side effect and return employees
        from(this.empService.addUpdateEmployee(request.employee)).pipe(
          // delay(1000),
          // Take the returned value and return a new success action containing the employees
          map((response: IEmployee) =>
            addEmployeeSuccess({ employee: response })
          )
        )
      )
    )
  );

  //run this code when updateEmployee action is dispatched
  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateEmployee),
      switchMap((request) =>
        // Call employee service as a side effect and return updated employee
        from(this.empService.addUpdateEmployee(request.employee)).pipe(
          // Take the returned value and return a new success action containing the updated employee
          map((response: IEmployee) =>
            updateEmployeeSuccess({ employee: response })
          )
        )
      )
    )
  );

  //run this code when deleteEmployee action is dispatched
  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEmployee),
      switchMap((request) =>
        // Call employee service as a side effect and delete employee
        from(this.empService.deleteEmployee(request.employee)).pipe(
          map((response: any) => deleteEmployeeSuccess(response))
        )
      )
    )
  );

  //run this code when loadEmployeeFormPage action is dispatched
  loadEmployeeFormPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployeeFormPage),
      switchMap((request) =>
        // Call employee service as a side effect and return employeeFormPageData
        from(this.empService.loadEmployeeFormPage()).pipe(
          // Take the returned value and return a new success action containing the employees
          map((response: any) =>
            loadEmployeeFormPageSuccess({ employeeFormPageData: response })
          )
        )
      )
    )
  );
}
