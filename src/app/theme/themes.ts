import { ITheme } from '../shared/models/theme';
export const activeColorTheme = 'grey';
export const activeFontTheme = 'normal';
export const colorThemes: ITheme[] = [
  {
    name: 'grey',
    properties: {
      'background-color': '#D9E0E6',
    },
  },
  {
    name: 'blue',
    properties: {
      'background-color': '#baccdc',
    },
  },
];

export const fontTheme: ITheme[] = [
  {
    name: 'normal',
    properties: {
      'font-size': '16px',
    },
  },
  {
    name: 'bigger',
    properties: {
      'font-size': '20px',
    },
  },
];
