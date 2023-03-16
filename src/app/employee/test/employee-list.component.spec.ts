import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Store, MemoizedSelector, Action, createAction } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';
import { EmployeeListComponent } from '../employee-list.component';
import { EmployeeModule } from '../employee.module';

import { Observable, of } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { RouterTestingModule } from '@angular/router/testing';
import { IEmployee } from 'src/app/shared/models/employee';
import {
  EmployeeParams,
  IEmployeeParams,
} from 'src/app/shared/models/employeeParams';

import * as empStore from 'src/app/state/employee/employee.reducer';
import * as empSelector from 'src/app/state/employee/employee.selectors';
import * as empTestData from 'src/app/employee/test/employee.test-setup-data';
import { EmployeeService } from '../employee.service';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { By } from '@angular/platform-browser';
describe('Employee List Component', () => {
  let empService: EmployeeService;
  let httpTestingController: HttpTestingController;
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let el: DebugElement;
  let mockStore: MockStore<empStore.IEmployeeState>;
  let actions$: Observable<Actions>;
  let empLoadAction$: Observable<Action>;
  let empLoadSuccessAction$: Observable<Action>;
  let toasterService: ToastrService;
  const initialState: empStore.IEmployeeState = {
    employees: [],
    status: '',
    error: '',
    count: 0,
    employeeParams: new EmployeeParams(),
    employeeFormPageModel: null,
  };
  let mockSelectAllEmployees: MemoizedSelector<
    empStore.IEmployeeState,
    IEmployee[]
  >;
  let mockEmployeeActionStatus: MemoizedSelector<
    empStore.IEmployeeState,
    string
  >;
  let mockSelectEmployeeParams: MemoizedSelector<
    empStore.IEmployeeState,
    IEmployeeParams
  >;
  let mockSelectEmployeeCount: MemoizedSelector<
    empStore.IEmployeeState,
    number
  >;

  beforeEach(waitForAsync(() => {
    const empServiceSpy = jasmine.createSpyObj('empService', ['getEmployees']);
    TestBed.configureTestingModule({
      declarations: [EmployeeListComponent],
      imports: [
        EmployeeModule,
        RouterTestingModule,
        HttpClientTestingModule,
        ToastrModule.forRoot({
          positionClass: 'toast-bottom-right',
          preventDuplicates: true,
        }),
        ModalModule.forRoot(),
      ],
      providers: [
        { provide: EmployeeService, useValue: empServiceSpy },
        provideMockStore({ initialState }),
        provideMockActions(() => actions$),
        provideMockActions(() => empLoadAction$),
        ToastrService,
        BsModalService,
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(EmployeeListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });

    empService = TestBed.inject(EmployeeService);
    httpTestingController = TestBed.inject(HttpTestingController);
    toasterService = TestBed.inject(ToastrService);

    // Mock for Ng-Rx Store and Selectors
    mockStore = TestBed.get(Store);
    empLoadAction$ = of({ type: '[employee list] Load' });

    mockEmployeeActionStatus = mockStore.overrideSelector(
      empSelector.employeeActionStatus,
      'load success'
    );
    mockSelectEmployeeParams = mockStore.overrideSelector(
      empSelector.selectEmployeeParams,
      new EmployeeParams()
    );
    mockSelectEmployeeCount = mockStore.overrideSelector(
      empSelector.selectEmployeeCount,
      50
    );
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should display list of employees', () => {
    mockSelectAllEmployees = mockStore.overrideSelector(
      empSelector.selectAllEmployees,
      empTestData.employees
    );
    mockStore.refreshState();
    fixture.detectChanges();
    const cards = el.queryAll(By.css('.ems-employee-card'));
    expect(cards).toBeTruthy();
    expect(cards.length).toBe(6);
    mockStore.select(mockSelectEmployeeCount).subscribe((count: number) => {
      expect(count).toBe(50);
    });
    //console.log(el.nativeElement.outerHTML);
  });
  it('should display first employee', () => {
    let firstEmployee = empTestData.employees[0];
    mockSelectAllEmployees = mockStore.overrideSelector(
      empSelector.selectAllEmployees,
      empTestData.employees
    );
    mockStore.refreshState();
    fixture.detectChanges();
    const card = el.query(By.css('.ems-employee-card:first-child'));
    const cardTitle = card.query(By.css('.card-title'));
    const cardImage = card.query(By.css('.img-fluid'));
    expect(card).toBeTruthy();
    expect(cardTitle.nativeElement.textContent.trim()).toBe(
      firstEmployee.firstName
    );
    expect(cardImage.nativeElement.src).toBe(firstEmployee.imageUrl);
  });
  it('page change should display next set of employess', () => {
    mockSelectAllEmployees = mockStore.overrideSelector(
      empSelector.selectAllEmployees,
      empTestData.secondPageEmployees()
    );
    component.onPageChanged(2);
    mockStore.refreshState();
    fixture.detectChanges();

    const cards = el.queryAll(By.css('.ems-employee-card'));
    expect(cards).toBeTruthy();
    expect(cards.length).toBe(3);
    mockStore.select(mockSelectEmployeeCount).subscribe((count: number) => {
      expect(count).toBe(50);
    });
    //console.log(el.nativeElement.outerHTML);
  });
});
