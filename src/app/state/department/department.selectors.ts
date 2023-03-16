import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { IDepartmentState } from './department.reducer';

//select the department state from the app state
export const departmentState = (state: IAppState) => state.deptState;

//selector for all departments
export const selectAllDepartments = createSelector(
  departmentState,
  (state: IDepartmentState) => state.departments
);
//status selector
export const departmentActionStatus = createSelector(
  departmentState,
  (state: IDepartmentState) => state.status
);
// selector for a single department by id
export const selectDepartment = (id: number) =>
  createSelector(selectAllDepartments, (departments) =>
    departments.find((department) => department.id === id)
  );
