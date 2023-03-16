import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, map, Subscription } from 'rxjs';
import { CoreService } from '../core/core.service';

import { DialogService } from '../core/dialog.service';
import { IDesignation } from '../shared/models/designation';
import { IServerAppConfiguration } from '../shared/models/serverappconfiguration';
import {
  deleteDesignation,
  deleteDesignationSuccess,
  loadDesignations,
} from '../state/designation/designation.actions';
import {
  designationActionStatus,
  selectAllDesignations,
  selectDesignation,
} from '../state/designation/designation.selectors';

@Component({
  selector: 'app-designation-list',
  templateUrl: './designation-list.component.html',
  styleUrls: ['./designation-list.component.scss'],
})
export class DesignationListComponent implements OnInit, OnDestroy {
  public serverAppConfig: IServerAppConfiguration;
  public designations$ = this.store.select(selectAllDesignations);
  public designationLoadingStatus$ = this.store.select(designationActionStatus);

  public designation: IDesignation;
  public vm$ = combineLatest([
    this.designations$,
    this.designationLoadingStatus$,
  ]).pipe(
    map(([designations, loadingStatus]) => ({
      designations,
      loadingStatus,
    }))
  );

  public confirmDialogSubscription = new Subscription();
  public designationDeleteStatusSubscription = new Subscription();

  constructor(
    private store: Store,
    private dialogService: DialogService,
    private toastrService: ToastrService,
    private actions: Actions,
    private coreService: CoreService
  ) {}
  ngOnDestroy(): void {
    this.confirmDialogSubscription.unsubscribe();
    this.designationDeleteStatusSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getServerConfiguration();
    this.store.dispatch(loadDesignations());
    //subscribe to the deleteDesignationSuccess action
    // if delete is success then refresh the page
    this.designationDeleteStatusSubscription = this.actions
      .pipe(ofType(deleteDesignationSuccess))
      .subscribe({
        next: (response) => {
          //reload data after delete
          this.store.dispatch(loadDesignations());
          this.toastrService.success('Designation deleted successfully.');
        },
        error: (error) => {
          this.toastrService.error('Problem deleting designation.');
        },
      });
  }
  getServerConfiguration() {
    this.serverAppConfig = this.coreService.serverAppConfig;
  }
  delete(id: number) {
    this.dialogService.showConfirm();
    this.confirmDialogSubscription = this.dialogService.confirmClosed.subscribe(
      {
        next: (response: boolean) => {
          if (response) {
            this.store.select(selectDesignation(id)).subscribe({
              next: (response: IDesignation) => {
                this.designation = response;
              },
            });
            this.store.dispatch(
              deleteDesignation({ designation: this.designation })
            );
          }
        },
      }
    );
  }
}
