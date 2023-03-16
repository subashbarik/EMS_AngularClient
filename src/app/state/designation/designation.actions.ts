import { createAction, props } from '@ngrx/store';
import { IDesignation } from 'src/app/shared/models/designation';

export const loadDesignations = createAction('[designation list] Load');
export const loadDesignationsSuccess = createAction(
  '[designation list] Success',
  props<{ designations: IDesignation[] }>()
);
export const addDesignation = createAction(
  '[designation form] Add',
  props<{ designation: IDesignation }>()
);
export const addDesignationSuccess = createAction(
  '[designation form] Add Success',
  props<{ designation: IDesignation }>()
);
export const updateDesignation = createAction(
  '[designation form] Update',
  props<{ designation: IDesignation }>()
);
export const updateDesignationSuccess = createAction(
  '[designation form] Update Success',
  props<{ designation: IDesignation }>()
);

export const deleteDesignation = createAction(
  '[designation list] Delete',
  props<{ designation: IDesignation }>()
);
export const deleteDesignationSuccess = createAction(
  '[designation list] Delete Success',
  props<{ response: any }>()
);
