import { createAction, props } from '@ngrx/store';

export const setColorTheme = createAction(
  '[theme] settheme',
  props<{ name: string }>()
);
export const setFontTheme = createAction(
  '[theme] font',
  props<{ name: string }>()
);
