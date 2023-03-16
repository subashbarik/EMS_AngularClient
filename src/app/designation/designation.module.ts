import { NgModule } from '@angular/core';
import { DesignationListComponent } from './designation-list.component';
import { DesignationRoutingModule } from './designation-routing.module';
import { DesignationFormComponent } from './designation-form/designation-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [DesignationListComponent, DesignationFormComponent],
  imports: [SharedModule, DesignationRoutingModule],
})
export class DesignationModule {}
