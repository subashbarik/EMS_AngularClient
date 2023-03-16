import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ServerErrorComponent } from './components/server-error/server-error.component';
import { ToastrModule } from 'ngx-toastr';
import { UnknownErrorComponent } from './components/unknown-error/unknown-error.component';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InitialLoadComponent } from './components/initial-load/initial-load.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { UnsaveddataDialogComponent } from './components/dialogs/unsaveddata-dialog/unsaveddata-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SideMenuComponent,
    NotFoundComponent,
    ServerErrorComponent,
    UnknownErrorComponent,
    InitialLoadComponent,
    ConfirmDialogComponent,
    UnsaveddataDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ModalModule.forRoot(),
  ],
  exports: [HeaderComponent, FooterComponent, SideMenuComponent],
})
export class CoreModule {}
