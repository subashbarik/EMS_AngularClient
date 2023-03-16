import { AccountService } from '../account.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Store, MemoizedSelector } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IUser } from '../../shared/models/user';
import { environment } from 'src/environments/environment';
import * as accountStore from 'src/app/state/account/account.reducer';
import * as accountSelector from 'src/app/state/account/account.selectors';
import {
  getValidUserLoginData,
  getValidUserLoginResponseData,
  getInvalidUserLoginData,
  getInvalidUserLoginResponseData,
} from 'src/app/account/test/account.test-setup-data';
import { HttpErrorResponse } from '@angular/common/http';

// Account service test suite
describe('Account Service', () => {
  let accountService: AccountService;
  let httpTestingController: HttpTestingController;
  let mockStore: MockStore<accountStore.IAccountState>;

  const initialState = {
    accState: {
      user: null,
      status: '',
      error: '',
      apiErrorResponse: null,
    },
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService, provideMockStore({ initialState })],
    });
    accountService = TestBed.inject(AccountService);
    // helps in providing the test data for a mock call to an api
    // via HttpClientTestingModule
    httpTestingController = TestBed.inject(HttpTestingController);

    // Mock for Ng-Rx Store and Selector
    mockStore = TestBed.get(Store);
    let mockAccountTokenSelector: MemoizedSelector<
      accountStore.IAccountState,
      string
    >;
    mockAccountTokenSelector = mockStore.overrideSelector(
      accountSelector.accountTokenSelector,
      'AA'
    );

    //Local storage mock
    let mockLocalstore = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return mockLocalstore[key] || null;
    });
    spyOn(localStorage, 'setItem').and.callFake(
      (key: string, value: string): string => {
        return (mockLocalstore[key] = <string>value);
      }
    );
    spyOn(localStorage, 'removeItem').and.callFake((key: string): void => {
      delete mockLocalstore[key];
    });
  });

  it('Should pass login with valid user details', () => {
    accountService
      .login(getValidUserLoginData())
      .subscribe((response: IUser) => {
        expect(response).toBeTruthy();
        //Additional error context to the test , incase it fails
        expect(response).withContext('Invalid User');
        expect(response.email).toBe('subash.barik@gmail.com');
        expect(response.isAdmin).toBe(true);
        expect(response.apiErrorResponse).toBe(null);
      });
    //expect that the api call should be for account/login
    const req = httpTestingController.expectOne(
      environment.apiUrl + 'account/login'
    );
    // Checks the request type
    expect(req.request.method).toEqual('POST');
    // When flush is called then only suscribe part of the API
    // call will receive data, this is because of the mock implementation
    // of actual service by HttpTestingController
    req.flush(getValidUserLoginResponseData());
    // Verifies that only one http call is made and no other
    // unnecessary http calls are made
    httpTestingController.verify();
  });
  it('Should give error if login api fails', () => {
    accountService.login(getValidUserLoginData()).subscribe({
      next: () => {
        fail('The login operation should have failed');
      },
      error: (error: HttpErrorResponse) => {
        expect(error.status).toBe(500);
      },
    });
    //expect that the api call should be for account/login
    const req = httpTestingController.expectOne(
      environment.apiUrl + 'account/login'
    );
    // Checks the request type
    expect(req.request.method).toEqual('POST');
    // When flush is called then only suscribe part of the API
    // call will receive data, this is because of the mock implementation
    // of actual service by HttpTestingController
    req.flush('Login failed', {
      status: 500,
      statusText: 'Internal Server Error',
    });
    // Verifies that only one http call is made and no other
    // unnecessary http calls are made
    httpTestingController.verify();
  });

  it('Should fail login with in-valid user details', () => {
    accountService
      .login(getInvalidUserLoginData())
      .subscribe((response: IUser) => {
        expect(response).toBeTruthy();
        expect(response.email).toBe(null);
        expect(response.isAdmin).toBe(null);
        expect(response.displayName).toBe(null);
        expect(response.token).toBe(null);
        expect(response.roles).toBe(null);
        expect(response.apiErrorResponse).toBeTruthy();
        expect(response.apiErrorResponse.statusCode).toBe('401');
        expect(response.apiErrorResponse.errors[0]).toBe(
          'Unable to find User.'
        );
        expect(response.apiErrorResponse.message).toBe(
          'You are not authorized'
        );
      });
    const req = httpTestingController.expectOne(
      environment.apiUrl + 'account/login'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(getInvalidUserLoginResponseData());
    // Verifies that only one http call is made and no other
    // unnecessary http calls are made
    httpTestingController.verify();
  });

  it('Should register a user with valid user details', () => {
    // will be similar to login user with valid data
    pending();
  });

  it('Should fail register with in-valid user details', () => {
    // will be similar to login user with in-valid data
    pending();
  });

  it('Should get token for user from account selector', () => {
    mockStore.refreshState();
    let token = accountService.getJwtToken();
    expect(token).toBe('AA');
  });

  it('Should get token for user from localStorage if present', () => {
    localStorage.setItem('token', 'AAA');
    mockStore.refreshState();
    let token = accountService.getJwtToken();
    expect(localStorage.getItem('token')).toBe('AAA');
  });
  it('Should clear token when user logs out', () => {
    localStorage.setItem('token', 'AAA');
    accountService.logout().subscribe(() => {
      expect(localStorage.getItem('token')).toBe(null);
    });
  });
  afterEach(() => {
    // If all the it blocks needs to verify one http call then
    // we can put this code in afterEach block.
    //httpTestingController.verify();
  });
});
