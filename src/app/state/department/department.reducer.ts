import { createReducer, on } from '@ngrx/store';
import { IDepartment } from 'src/app/shared/models/department';
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

export interface IDepartmentState {
  departments: IDepartment[];
  status: string;
  error: string;
}

export const initialState: IDepartmentState = {
  departments: [],
  status: '',
  error: '',
};

export const departmentReducer = createReducer(
  initialState,
  on(loadDepartments, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadDepartmentsSuccess, (state, { departments }) => ({
    ...state,
    departments: departments,
    status: 'success',
    error: '',
  })),
  on(addDepartment, (state, { department }) => ({
    ...state,
    status: 'adding',
  })),
  on(addDepartmentSuccess, (state, { department }) => ({
    ...state,
    departments: [...state.departments, department],
    status: 'add success',
  })),
  on(updateDepartment, (state, { department }) => ({
    ...state,
    status: 'updating',
  })),
  on(updateDepartmentSuccess, (state, { department }) => ({
    ...state,
    departments: updateDepartmentData(state.departments, department),
    status: 'update success',
  })),
  on(deleteDepartment, (state, { department }) => ({
    ...state,
    status: 'deleting',
  })),
  on(deleteDepartmentSuccess, (state) => ({
    ...state,
    status: 'delete success',
  }))
);
const updateDepartmentData = (
  departments: IDepartment[],
  updatedDepartment: IDepartment
): IDepartment[] => {
  let newDepartments: IDepartment[];
  newDepartments = [...departments];
  if (updatedDepartment) {
    const index = departments.findIndex(
      (department) => department.id === updatedDepartment.id
    );
    newDepartments[index] = updatedDepartment;
  }
  return newDepartments;
};
