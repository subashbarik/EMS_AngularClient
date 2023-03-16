import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { AgeValidator } from 'src/app/shared/custom-validators/age-validator';
import { SalaryValidator } from 'src/app/shared/custom-validators/salary-validator';
import { ComponentCanDeactivate } from 'src/app/shared/models/candeactivate';
import {
  IEmployee,
  IEmployeeFormData,
  Employee,
  IEmployeeFormPageModel,
} from 'src/app/shared/models/employee';
import { IServerAppConfiguration } from 'src/app/shared/models/serverappconfiguration';
import { selectGlobal } from 'src/app/state/appglobal/appglobal.selectors';

import {
  addEmployee,
  addEmployeeSuccess,
  loadEmployeeFormPage,
  loadEmployeeFormPageSuccess,
  updateEmployee,
  updateEmployeeSuccess,
} from 'src/app/state/employee/employee.actions';
import {
  employeeActionStatus,
  selectEmployee,
  selectEmployeeFormPageData,
} from 'src/app/state/employee/employee.selectors';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss'],
})
export class EmployeeFormComponent
  implements OnInit, OnDestroy, ComponentCanDeactivate
{
  public mode = 'ADD';
  public pageTitle = 'Create Employee';
  public employeeForm: FormGroup;
  public imageFile: File;
  public employee: IEmployee;
  public localImagePath: any;
  public removeImage = false;
  public employeeFormPageData: IEmployeeFormPageModel;
  public serverAppConfig: IServerAppConfiguration;
  public fileError: string;

  public empFormPageData$ = this.store.select(selectEmployeeFormPageData);
  public empFormPageStatus$ = this.store.select(employeeActionStatus);
  public vm$ = combineLatest([
    this.empFormPageData$,
    this.empFormPageStatus$,
  ]).pipe(
    map(([empFormPageData, loadingStatus]) => ({
      empFormPageData,
      loadingStatus,
    }))
  );
  public empAddStatus$ = this.store.select(employeeActionStatus);
  public empUpdateStatus$ = this.store.select(employeeActionStatus);
  public employee$ = this.store.select(
    selectEmployee(+this.activatedRouter.snapshot.paramMap.get('id'))
  );
  public global$ = this.store.select(selectGlobal);

  public empFormPageLoadSuccessSubscription = new Subscription();
  public empAddStatusSubscription = new Subscription();
  public empUpdateStatusSubscription = new Subscription();
  public empSubscription = new Subscription();
  public globalSubscription = new Subscription();

  @Output() formSubmit: EventEmitter<IEmployeeFormData> =
    new EventEmitter<IEmployeeFormData>();

  @ViewChild('tabset') tabset: TabsetComponent;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private actions$: Actions
  ) {}
  canDeactivate(): boolean | Observable<boolean> {
    return !this.employeeForm.dirty;
  }

  ngOnInit(): void {
    this.globalSubscription = this.global$.subscribe({
      next: (response) => {
        this.serverAppConfig = response.serverAppConfigurations;
      },
    });

    if (this.activatedRouter.snapshot.paramMap.get('id')) {
      this.mode = 'UPDATE';
      this.pageTitle = 'Update Employee';
    }
    this.store.dispatch(loadEmployeeFormPage());
    this.empFormPageLoadSuccessSubscription = this.actions$
      .pipe(ofType(loadEmployeeFormPageSuccess))
      .subscribe((response) => {
        this.employeeFormPageData = response.employeeFormPageData;
      });
    this.createEmployeeForm();
  }
  ngOnDestroy(): void {
    this.empFormPageLoadSuccessSubscription.unsubscribe();
    this.empAddStatusSubscription.unsubscribe();
    this.empUpdateStatusSubscription.unsubscribe();
    this.empSubscription.unsubscribe();
    this.globalSubscription.unsubscribe();
  }
  createEmployeeForm() {
    if (this.mode === 'ADD') {
      this.setEmployeeForm(null);
    } else if (this.mode === 'UPDATE') {
      this.empSubscription = this.employee$.subscribe((employee: IEmployee) => {
        this.employee = employee;
        console.log(employee);
        this.setEmployeeForm(employee);
      });
    }
  }
  private setEmployeeForm(employee: IEmployee | null) {
    this.employeeForm = this.fb.group({
      id: [employee ? employee.id : null],
      firstName: [
        employee ? employee.firstName : null,
        [Validators.required, Validators.maxLength(20)],
      ],
      middleName: [
        employee ? employee.middleName : null,
        [Validators.maxLength(20)],
      ],
      lastName: [
        employee ? employee.lastName : null,
        [Validators.required, Validators.maxLength(20)],
      ],
      age: [
        employee ? employee.age : null,
        [Validators.required, AgeValidator],
      ],
      dob: [employee ? employee.dob : null, [Validators.required]],

      hireDate: [employee ? employee.hireDate : null, [Validators.required]],
      sex: [employee ? employee.sex : null],
      address1: [employee ? employee.address1 : null],
      address2: [employee ? employee.address2 : null],
      city: [employee ? employee.city : null],
      state: [employee ? employee.state : null],
      zipCode: [employee ? employee.zipCode : null],
      country: [employee ? employee.country : null],
      contactNo: [employee ? employee.contactNo : null],
      // basic: [
      //   employee ? employee.basic : null,
      //   [Validators.required, Validators.maxLength(6), SalaryValidator],
      // ],
      basic: [employee ? employee.basic : null],
      taPercentage: [employee ? employee.taPercentage : null, []],
      daPercentage: [employee ? employee.daPercentage : null, []],
      hraPercentage: [employee ? employee.hraPercentage : null, []],
      salary: [employee ? employee.salary : null, []],
      description: [employee ? employee.description : null, []],
      departmentId: [
        employee ? employee.departmentId : null,
        [Validators.required],
      ],
      designationId: [
        employee ? employee.designationId : null,
        [Validators.required],
      ],
      employeeTypeId: [
        employee ? employee.employeeTypeId : null,
        [Validators.required],
      ],
      imageUrl: [null],
    });
  }
  onSubmit() {
    let employeeData = this.employeeForm.value;
    let empId = 0;
    let imageUrl = '';
    if (this.mode === 'UPDATE') {
      empId = employeeData.id;
      imageUrl = employeeData.imageUrl;
    }

    let employee = new Employee(
      empId,
      employeeData.firstName,
      employeeData.middleName,
      employeeData.lastName,
      employeeData.age,
      employeeData.dob,
      employeeData.hireDate,
      employeeData.sex,
      employeeData.address1,
      employeeData.address2,
      employeeData.city,
      employeeData.state,
      employeeData.zipCode,
      employeeData.country,
      employeeData.contactNo,
      employeeData.basic,
      employeeData.taPercentage,
      employeeData.daPercentage,
      employeeData.hraPercentage,
      employeeData.salary,
      imageUrl,
      this.imageFile,
      employeeData.description,
      employeeData.departmentId,
      employeeData.designationId,
      employeeData.employeeTypeId,
      '',
      '',
      '',
      this.removeImage
    );
    if (this.mode === 'ADD') {
      this.store.dispatch(addEmployee({ employee: employee }));
      this.empAddStatusSubscription = this.actions$
        .pipe(ofType(addEmployeeSuccess))
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.toastrService.success('Employee added successfully.');
              this.reset();
              this.employeeForm.controls['departmentId'].setValue(null);
              this.employeeForm.controls['designationId'].setValue(null);
            }
          },
          error: (error) => {
            this.toastrService.error('Problem adding employee.');
          },
        });
    } else {
      this.store.dispatch(updateEmployee({ employee: employee }));
      this.empUpdateStatusSubscription = this.actions$
        .pipe(ofType(updateEmployeeSuccess))
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.router.navigate(['/main/employees/details/' + empId]);
            }
          },
          error: (error) => {
            this.toastrService.error('Problem updating employee.');
          },
        });

      // below code does not wait for the http call to be completed may check later why
      // this.empUpdateStatusSubscription = this.empUpdateStatus$.subscribe(
      //   (response) => {
      //     console.log(response);
      //     if (response === 'update success') {
      //       //this.toastrService.success('Employee updated successfully.');
      //       //this.router.navigate(['/employees/details/' + empId]);
      //     }
      //   },
      //   (error) => {
      //     this.toastrService.error('Problem updating employee.');
      //   }
      // );
    }
  }

  selectFile(event: any) {
    const files = event.target.files;
    if (!files.item(0).type.match('image.*')) {
      this.fileError = 'Invalid image format.';

      event.target.value = '';
      this.imageFile = null;
      this.localImagePath = this.employee.imageUrl;
    } else {
      this.imageFile = files.item(0);

      if (this.imageFile.size <= this.serverAppConfig.maxImageSizeInKB * 1024) {
        this.localImagePath = URL.createObjectURL(files.item(0));
        this.fileError = null;
        this.showLocalImage();
      } else {
        this.fileError =
          'Image size limit exceeded. Your image size ' +
          Math.round(this.imageFile.size / 1024) +
          'KB';
        event.target.value = '';
        this.imageFile = null;
        this.localImagePath = this.employee.imageUrl;
      }
    }
  }
  // Previews a selected image.
  showLocalImage() {
    const reader = new FileReader();
    reader.onload = (e) => (this.localImagePath = reader.result);
    reader.readAsDataURL(this.imageFile);
  }
  reset() {
    this.localImagePath = null;
    if (this.mode === 'UPDATE') {
      this.employeeForm.patchValue(this.employee);
    } else {
      this.employeeForm.reset();
    }
  }
  clearImage() {
    this.localImagePath =
      this.serverAppConfig.apiUrl + this.serverAppConfig.noImageEmployeePath;
    this.removeImage = true;
    this.employeeForm.controls['imageUrl'].setValue('');
  }
}
