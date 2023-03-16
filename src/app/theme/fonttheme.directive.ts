import { Directive, ElementRef, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ITheme } from '../shared/models/theme';
import { selectActiveFontTheme } from '../state/theme/theme.selectors';

@Directive({
  selector: '[appFonttheme]',
})
export class FontthemeDirective implements OnInit {
  private activeFontTheme: ITheme;
  constructor(private _elementRef: ElementRef, private store: Store) {}
  ngOnInit(): void {
    this.initializeValues();
  }
  initializeValues(): void {
    this.store.pipe(select(selectActiveFontTheme)).subscribe({
      next: (response) => {
        this.activeFontTheme = response;
        this.applyFontTheme(this.activeFontTheme);
      },
    });
  }
  applyFontTheme(theme: ITheme): void {
    const element = this.getElement();
    // project properties onto the element
    for (const key in theme.properties) {
      element.style.setProperty(key, theme.properties[key]);
    }
  }
  getElement(): any {
    return this._elementRef.nativeElement;
  }
}
