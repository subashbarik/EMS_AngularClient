import { NgModule } from '@angular/core';
import { LogListComponent } from './log-list.component';
import { SharedModule } from '../shared/shared.module';
import { LogRoutingModule } from './log-routing.module';
import { LogDetailsComponent } from './log-details/log-details.component';
@NgModule({
  declarations: [LogListComponent, LogDetailsComponent],
  imports: [SharedModule, LogRoutingModule],
})
export class LogModule {}
