import { createReducer, on } from '@ngrx/store';
import { IDesignation } from 'src/app/shared/models/designation';
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

export interface IDesignationState {
  designations: IDesignation[];
  status: string;
  error: string;
}

export const initialState: IDesignationState = {
  designations: [],
  status: '',
  error: '',
};

export const designationReducer = createReducer(
  initialState,
  on(loadDesignations, (state) => ({
    ...state,
    status: 'loading',
  })),
  on(loadDesignationsSuccess, (state, { designations }) => ({
    ...state,
    designations: designations,
    status: 'success',
    error: '',
  })),
  on(addDesignation, (state, { designation }) => ({
    ...state,
    status: 'adding',
  })),
  on(addDesignationSuccess, (state, { designation }) => ({
    ...state,
    designations: [...state.designations, designation],
    status: 'add success',
  })),
  on(updateDesignation, (state, { designation }) => ({
    ...state,
    status: 'updating',
  })),
  on(updateDesignationSuccess, (state, { designation }) => ({
    ...state,
    designations: updateDesignationData(state.designations, designation),
    status: 'update success',
  })),
  on(deleteDesignation, (state, { designation }) => ({
    ...state,
    status: 'deleting',
  })),
  on(deleteDesignationSuccess, (state) => ({
    ...state,
    status: 'delete success',
  }))
);
const updateDesignationData = (
  designations: IDesignation[],
  updatedDesignation: IDesignation
): IDesignation[] => {
  let newDesignations: IDesignation[];
  newDesignations = [...designations];
  if (updatedDesignation) {
    const index = designations.findIndex(
      (designation) => designation.id === updatedDesignation.id
    );
    newDesignations[index] = updatedDesignation;
  }
  return newDesignations;
};
