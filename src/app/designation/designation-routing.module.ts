import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandeactivateGuard } from '../core/guards/candeactivate.guard';
import { DesignationFormComponent } from './designation-form/designation-form.component';
import { DesignationListComponent } from './designation-list.component';

const route: Routes = [
  { path: '', component: DesignationListComponent },
  {
    path: 'add',
    component: DesignationFormComponent,
    canDeactivate: [CandeactivateGuard],
  },
  {
    path: 'update/:id',
    component: DesignationFormComponent,
    canDeactivate: [CandeactivateGuard],
  },
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class DesignationRoutingModule {}
