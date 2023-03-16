import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';
import { CoreModule } from '../core/core.module';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';

@NgModule({
  declarations: [MainComponent, HomeComponent, AboutComponent],
  imports: [CommonModule, CoreModule, SharedModule, MainRoutingModule],
})
export class MainModule {}
