import { createAction, props } from '@ngrx/store';
import { IDepartment } from 'src/app/shared/models/department';

export const loadDepartments = createAction('[department list] Load');
export const loadDepartmentsSuccess = createAction(
  '[department list] Success',
  props<{ departments: IDepartment[] }>()
);
export const addDepartment = createAction(
  '[department form] Add',
  props<{ department: IDepartment }>()
);
export const addDepartmentSuccess = createAction(
  '[department form] Add Success',
  props<{ department: IDepartment }>()
);
export const updateDepartment = createAction(
  '[department form] Update',
  props<{ department: IDepartment }>()
);
export const updateDepartmentSuccess = createAction(
  '[department form] Update Success',
  props<{ department: IDepartment }>()
);

export const deleteDepartment = createAction(
  '[department list] Delete',
  props<{ department: IDepartment }>()
);
export const deleteDepartmentSuccess = createAction(
  '[department list] Delete Success',
  props<{ response: any }>()
);
