import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { IEmployeeState } from './employee.reducer';

//select the employee state from the app state
export const employeeState = (state: IAppState) => state.empState;

// selector for employee params
export const selectEmployeeParams = createSelector(
  employeeState,
  (state: IEmployeeState) => state.employeeParams
);

// selector for employee count
export const selectEmployeeCount = createSelector(
  employeeState,
  (state: IEmployeeState) => state.count
);

//selector for all employee
export const selectAllEmployees = createSelector(
  employeeState,
  (state: IEmployeeState) => state.employees
);

//selector for a single employee by id
export const selectEmployee = (id: number) =>
  createSelector(selectAllEmployees, (employees) =>
    employees.find((employee) => employee.id === id)
  );

//selector for employee form page data
export const selectEmployeeFormPageData = createSelector(
  employeeState,
  (state: IEmployeeState) => state.employeeFormPageModel
);

//Get the count of employee
export const employeeCount = createSelector(
  employeeState,
  (state: IEmployeeState) => state.employees.length
);

//status selector
export const employeeActionStatus = createSelector(
  employeeState,
  (state: IEmployeeState) => state.status
);
