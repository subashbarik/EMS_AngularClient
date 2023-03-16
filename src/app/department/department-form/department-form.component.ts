import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { ComponentCanDeactivate } from 'src/app/shared/models/candeactivate';
import { ICompany } from 'src/app/shared/models/company';
import { Department, IDepartment } from 'src/app/shared/models/department';
import { selectCompanyInfo } from 'src/app/state/appglobal/appglobal.selectors';
import {
  addDepartment,
  addDepartmentSuccess,
  updateDepartment,
  updateDepartmentSuccess,
} from 'src/app/state/department/department.actions';
import {
  departmentActionStatus,
  selectDepartment,
} from 'src/app/state/department/department.selectors';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.scss'],
})
export class DepartmentFormComponent
  implements OnInit, OnDestroy, ComponentCanDeactivate
{
  public mode = 'ADD';
  public pageTitle = 'Create Department';
  public departmentForm: UntypedFormGroup;
  public department: IDepartment;
  public companyInfo: ICompany;

  public deptAddStatus$ = this.store.select(departmentActionStatus);
  public deptUpdateStatus$ = this.store.select(departmentActionStatus);
  public department$ = this.store.select(
    selectDepartment(+this.activatedRouter.snapshot.paramMap.get('id'))
  );
  public companyInfo$ = this.store.select(selectCompanyInfo);
  private companySubscription = new Subscription();
  private deptSubscription = new Subscription();
  public deptAddStatusSubscription = new Subscription();
  public deptUpdateStatusSubscription = new Subscription();

  constructor(
    private store: Store,
    private activatedRouter: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private toastrService: ToastrService,
    private actions$: Actions,
    private router: Router
  ) {}
  canDeactivate(): boolean | Observable<boolean> {
    return !this.departmentForm.dirty;
  }

  ngOnInit(): void {
    this.companyInfo$.subscribe({
      next: (response) => {
        this.companyInfo = response;
      },
    });
    if (this.activatedRouter.snapshot.paramMap.get('id')) {
      this.mode = 'UPDATE';
      this.pageTitle = 'Update Department';
    }
    this.createDepartmentForm();
  }
  ngOnDestroy(): void {
    this.companySubscription.unsubscribe();
    this.deptSubscription.unsubscribe();
    this.deptAddStatusSubscription.unsubscribe();
    this.deptUpdateStatusSubscription.unsubscribe();
  }

  createDepartmentForm() {
    if (this.mode === 'ADD') {
      this.setDepartmentForm(null);
    } else if (this.mode === 'UPDATE') {
      this.deptSubscription = this.department$.subscribe(
        (department: IDepartment) => {
          this.department = department;
          this.setDepartmentForm(department);
        }
      );
    }
  }
  private setDepartmentForm(department: IDepartment | null) {
    this.departmentForm = this.fb.group({
      id: [department ? department.id : null],
      companyId: [this.companyInfo.id],
      name: [
        department ? department.name : null,
        [Validators.required, Validators.maxLength(30)],
      ],
      description: [
        department ? department.description : null,
        [Validators.required, Validators.maxLength(200)],
      ],
    });
  }
  onSubmit() {
    let departmentData = this.departmentForm.value;
    let deptId = 0;
    if (this.mode === 'UPDATE') {
      deptId = departmentData.id;
    }

    let department = new Department(
      deptId,
      departmentData.name,
      departmentData.description,
      departmentData.companyId
    );
    if (this.mode === 'ADD') {
      this.store.dispatch(addDepartment({ department: department }));
      this.deptAddStatusSubscription = this.actions$
        .pipe(ofType(addDepartmentSuccess))
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.toastrService.success('Department added successfully.');
              this.reset();
            }
          },
          error: (error) => {
            this.toastrService.error('Problem adding department.');
          },
        });
    } else {
      this.store.dispatch(updateDepartment({ department: department }));
      this.deptUpdateStatusSubscription = this.actions$
        .pipe(ofType(updateDepartmentSuccess))
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.toastrService.success('Department updated successfully.');
              this.router.navigate(['/main/departments/']);
            }
          },
          error: (error) => {
            this.toastrService.error('Problem updating department.');
          },
        });
    }
  }
  reset() {
    if (this.mode === 'UPDATE') {
      this.departmentForm.patchValue(this.department);
    } else {
      this.departmentForm.reset();
    }
  }
}
