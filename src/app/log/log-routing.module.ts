import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogDetailsComponent } from './log-details/log-details.component';
import { LogListComponent } from './log-list.component';

const route: Routes = [
  { path: '', component: LogListComponent },
  { path: 'details/:id', component: LogDetailsComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class LogRoutingModule {}
