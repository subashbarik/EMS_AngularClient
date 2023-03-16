import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITheme } from '../shared/models/theme';
import { selectActiveColorTheme } from '../state/theme/theme.selectors';

@Directive({
  selector: '[appTheme]',
})
export class ThemeDirective implements OnInit {
  public activeTheme: ITheme;

  constructor(
    private _elementRef: ElementRef,
    @Inject(DOCUMENT) private _document: any,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initializeValues();
  }
  initializeValues(): void {
    this.store.pipe(select(selectActiveColorTheme)).subscribe({
      next: (response) => {
        this.activeTheme = response;
        this.applyColorTheme(this.activeTheme);
      },
    });
  }
  applyColorTheme(theme: ITheme): void {
    const element = this.getElement();
    // project properties onto the element
    for (const key in theme.properties) {
      element.style.setProperty(key, theme.properties[key]);
    }

    // remove old theme
    // console.log(this.activeTheme);
    // console.log(this.prevActiveThemeName);
    // if (this.prevActiveThemeName != '') {
    //   element.classList.remove(`${this.prevActiveThemeName}-theme`);
    // }

    // // alias element with theme name
    // element.classList.add(`${theme.name}-theme`);
  }
  getElement(): any {
    return this._elementRef.nativeElement;
  }
}
