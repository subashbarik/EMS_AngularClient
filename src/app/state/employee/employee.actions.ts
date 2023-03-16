import { createAction, props } from '@ngrx/store';
import {
  IEmployee,
  IEmployeeFormPageModel,
} from 'src/app/shared/models/employee';
import { IEmployeeParams } from 'src/app/shared/models/employeeParams';

export const setEmployeeParams = createAction(
  '[employee] set params',
  props<{ params: IEmployeeParams }>()
);
export const resetEmployeeParams = createAction('[employee] reset params');

export const addEmployee = createAction(
  '[employee form] Add',
  props<{ employee: IEmployee }>()
);
export const addEmployeeSuccess = createAction(
  '[employee form] Add Success',
  props<{ employee: IEmployee }>()
);
export const updateEmployee = createAction(
  '[employee form] Update',
  props<{ employee: IEmployee }>()
);
export const updateEmployeeSuccess = createAction(
  '[employee form] Update Success',
  props<{ employee: IEmployee }>()
);

export const deleteEmployee = createAction(
  '[employee list] Delete',
  props<{ employee: IEmployee }>()
);
export const deleteEmployeeSuccess = createAction(
  '[employee list] Delete Success',
  props<{ response: any }>()
);
export const loadEmployees = createAction('[employee list] Load');
export const loadEmployeesSuccess = createAction(
  '[employee list API] Load Success',
  props<{ employees: IEmployee[]; count: number }>()
);
export const loadEmployeesFailure = createAction(
  '[employee list API] Load Failure',
  props<{ error: string }>()
);
export const loadEmployeeFormPage = createAction('[employee form] Load');
export const loadEmployeeFormPageSuccess = createAction(
  '[employee form API] Load Success',
  props<{ employeeFormPageData: IEmployeeFormPageModel }>()
);
