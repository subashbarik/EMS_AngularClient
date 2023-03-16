import { createReducer, on } from '@ngrx/store';
import {
  IEmployee,
  IEmployeeFormPageModel,
} from 'src/app/shared/models/employee';
import {
  EmployeeParams,
  IEmployeeParams,
} from 'src/app/shared/models/employeeParams';
import {
  addEmployee,
  updateEmployee,
  deleteEmployee,
  loadEmployees,
  loadEmployeesFailure,
  loadEmployeesSuccess,
  addEmployeeSuccess,
  loadEmployeeFormPage,
  loadEmployeeFormPageSuccess,
  updateEmployeeSuccess,
  deleteEmployeeSuccess,
  setEmployeeParams,
  resetEmployeeParams,
} from './employee.actions';

export interface IEmployeeState {
  employees: IEmployee[];
  status: string;
  error: string;
  count: number;
  employeeParams: IEmployeeParams;
  employeeFormPageModel: IEmployeeFormPageModel;
}

export const initialState: IEmployeeState = {
  employees: [],
  status: '',
  error: '',
  count: 0,
  employeeParams: new EmployeeParams(),
  employeeFormPageModel: null,
};

export const employeeReducer = createReducer(
  initialState,
  on(setEmployeeParams, (state, { params }) => ({
    ...state,
    employeeParams: params,
  })),
  on(resetEmployeeParams, (state) => ({
    ...state,
    employeeParams: new EmployeeParams(),
  })),
  on(addEmployee, (state, { employee }) => ({
    ...state,
    status: 'adding',
  })),

  on(addEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: [...state.employees, employee],
    status: 'add success',
  })),

  on(updateEmployee, (state, { employee }) => ({
    ...state,
    status: 'updating',
  })),
  on(updateEmployeeSuccess, (state, { employee }) => ({
    ...state,
    employees: updateEmployeeData(state.employees, employee),
    status: 'update success',
  })),
  on(deleteEmployee, (state, { employee }) => ({
    ...state,
    status: 'deleting',
  })),
  on(deleteEmployeeSuccess, (state) => ({
    ...state,
    status: 'delete success',
  })),
  on(loadEmployees, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadEmployeesSuccess, (state, { employees, count }) => ({
    ...state,
    employees: employees,
    count: count,
    status: 'load success',
    error: '',
  })),
  // on(loadEmployeesFailure, (state, { error }) => ({
  //   ...state,
  //   error: error,
  //   status: 'load error',
  // })),
  on(loadEmployeeFormPage, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadEmployeeFormPageSuccess, (state, { employeeFormPageData }) => ({
    ...state,
    employeeFormPageModel: employeeFormPageData,
    status: 'load success',
  }))
);

const updateEmployeeData = (
  employees: IEmployee[],
  updatedEmployee: IEmployee
): IEmployee[] => {
  let newEmployees: IEmployee[];
  newEmployees = [...employees];
  if (updatedEmployee) {
    const index = employees.findIndex(
      (employee) => employee.id === updatedEmployee.id
    );
    newEmployees[index] = updatedEmployee;
  }
  return newEmployees;
};
