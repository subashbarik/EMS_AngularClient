import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { SalaryValidator } from 'src/app/shared/custom-validators/salary-validator';
import { PercentageValidator } from 'src/app/shared/custom-validators/percentage-validator';
import { ICompany } from 'src/app/shared/models/company';
import { Designation, IDesignation } from 'src/app/shared/models/designation';
import { StringmaxlengthPipe } from 'src/app/shared/pipes/stringmaxlength.pipe';

import {
  addDesignation,
  addDesignationSuccess,
  updateDesignation,
  updateDesignationSuccess,
} from 'src/app/state/designation/designation.actions';
import {
  designationActionStatus,
  selectDesignation,
} from 'src/app/state/designation/designation.selectors';
import { ComponentCanDeactivate } from 'src/app/shared/models/candeactivate';

@Component({
  selector: 'app-designation-form',
  templateUrl: './designation-form.component.html',
  styleUrls: ['./designation-form.component.scss'],
})
export class DesignationFormComponent
  implements OnInit, OnDestroy, ComponentCanDeactivate
{
  public mode = 'ADD';
  public pageTitle = 'Create Designation';
  public designationForm: FormGroup;
  public designation: IDesignation;
  public companyInfo: ICompany;

  public desigAddStatus$ = this.store.select(designationActionStatus);
  public desigUpdateStatus$ = this.store.select(designationActionStatus);
  public designation$ = this.store.select(
    selectDesignation(+this.activatedRouter.snapshot.paramMap.get('id'))
  );
  private desigSubscription = new Subscription();
  public desigAddStatusSubscription = new Subscription();
  public desigUpdateStatusSubscription = new Subscription();
  constructor(
    private store: Store,
    private activatedRouter: ActivatedRoute,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private actions$: Actions,
    private router: Router
  ) {}
  canDeactivate(): boolean | Observable<boolean> {
    return !this.designationForm.dirty;
  }

  ngOnInit(): void {
    if (this.activatedRouter.snapshot.paramMap.get('id')) {
      this.mode = 'UPDATE';
      this.pageTitle = 'Update Designation';
    }
    this.createDesignationForm();
  }
  ngOnDestroy(): void {
    this.desigSubscription.unsubscribe();
    this.desigAddStatusSubscription.unsubscribe();
    this.desigUpdateStatusSubscription.unsubscribe();
  }

  createDesignationForm() {
    if (this.mode === 'ADD') {
      this.setDesignationForm(null);
    } else if (this.mode === 'UPDATE') {
      this.desigSubscription = this.designation$.subscribe(
        (designation: IDesignation) => {
          this.designation = designation;
          this.setDesignationForm(designation);
        }
      );
    }
  }
  private setDesignationForm(designation: IDesignation | null) {
    this.designationForm = this.fb.group({
      id: [designation ? designation.id : null],
      name: [
        designation ? designation.name : null,
        [Validators.required, Validators.maxLength(30)],
      ],
      description: [
        designation ? designation.description : null,
        [Validators.required, Validators.maxLength(100)],
      ],
      basic: [
        designation ? designation.basic : null,
        [Validators.maxLength(6), SalaryValidator],
      ],
      taPercentage: [
        designation ? designation.taPercentage : null,
        [Validators.maxLength(3), PercentageValidator],
      ],
      daPercentage: [
        designation ? designation.daPercentage : null,
        [Validators.maxLength(3), PercentageValidator],
      ],
      hraPercentage: [
        designation ? designation.hraPercentage : null,
        [Validators.maxLength(3), PercentageValidator],
      ],
    });
  }
  onSubmit() {
    let designationData = this.designationForm.value;
    let desigId = 0;
    if (this.mode === 'UPDATE') {
      desigId = designationData.id;
    }
    let designation = new Designation(
      desigId,
      designationData.name,
      designationData.description,
      designationData.basic,
      designationData.taPercentage,
      designationData.daPercentage,
      designationData.hraPercentage
    );
    if (this.mode === 'ADD') {
      this.store.dispatch(addDesignation({ designation: designation }));
      this.desigAddStatusSubscription = this.actions$
        .pipe(ofType(addDesignationSuccess))
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.toastrService.success('Designation added successfully.');
              this.reset();
            }
          },
          error: (error) => {
            this.toastrService.error('Problem adding designation.');
          },
        });
    } else {
      this.store.dispatch(updateDesignation({ designation: designation }));
      this.desigUpdateStatusSubscription = this.actions$
        .pipe(ofType(updateDesignationSuccess))
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.toastrService.success('Designation updated successfully.');
              this.router.navigate(['/main/designations/']);
            }
          },
          error: (error) => {
            this.toastrService.error('Problem updating designation.');
          },
        });
    }
  }
  reset() {
    if (this.mode === 'UPDATE') {
      this.designationForm.patchValue(this.designation);
    } else {
      this.designationForm.reset();
    }
  }
}
