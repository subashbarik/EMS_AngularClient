import { createSelector } from '@ngrx/store';
import { IAppState } from '../app.state';
import { IThemeState } from './theme.reducer';

export const themeState = (state: IAppState) => state.themeState;

export const selectActiveColorTheme = createSelector(
  themeState,
  (state: IThemeState) =>
    state.colorTheme.find((t) => t.name == state.activeColorTheme)
);

export const selectActiveFontTheme = createSelector(
  themeState,
  (state: IThemeState) =>
    state.fontTheme.find((t) => t.name == state.activeFontTheme)
);
