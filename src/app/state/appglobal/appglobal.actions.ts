import { createAction, props } from '@ngrx/store';
import { IGlobal } from 'src/app/shared/models/global';

export const loadGlobal = createAction('[global list] Load');
export const loadGlobalSuccess = createAction(
  '[global list] Success',
  props<{ global: IGlobal }>()
);
