import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from './theme.directive';
import { FontthemeDirective } from './fonttheme.directive';

@NgModule({
  declarations: [ThemeDirective, FontthemeDirective],
  imports: [CommonModule],
  exports: [ThemeDirective, FontthemeDirective],
})
export class ThemeModule {}
