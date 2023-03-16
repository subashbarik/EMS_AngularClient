import { createReducer, on } from '@ngrx/store';
import { ITheme, ThemeType } from 'src/app/shared/models/theme';
import * as themeOptions from 'src/app/theme/themes';
import { setColorTheme, setFontTheme } from './theme.actions';

export interface IThemeState {
  colorTheme: ITheme[];
  fontTheme: ITheme[];
  activeColorTheme: string;
  activeFontTheme: string;
}
export const initialState: IThemeState = {
  colorTheme: themeOptions.colorThemes,
  fontTheme: themeOptions.fontTheme,
  activeColorTheme: themeOptions.activeColorTheme,
  activeFontTheme: themeOptions.activeFontTheme,
};
export const themeReducer = createReducer(
  initialState,
  on(
    setColorTheme,
    (state, action): IThemeState => ({
      ...state,
      activeColorTheme: action.name,
    })
  ),
  on(
    setFontTheme,
    (state, action): IThemeState => ({
      ...state,
      activeFontTheme: action.name,
    })
  )
);
