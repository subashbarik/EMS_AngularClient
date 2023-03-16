import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, of, Subject, zip } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee, IEmployee } from '../shared/models/employee';
import { EmployeeParams } from '../shared/models/employeeParams';
import { Pagination } from '../shared/models/pagination';
import { selectEmployeeParams } from '../state/employee/employee.selectors';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  baseUrl = environment.apiUrl;
  pagination = new Pagination();
  employeeParams = new EmployeeParams();
  employees: IEmployee[] = [];
  constructor(private httpClient: HttpClient, private store: Store) {}

  getEmployees() {
    this.setEmployeeParams();
    let params = new HttpParams();
    if (this.employeeParams.departmentId !== 0) {
      params = params.append(
        'DepartmentId',
        this.employeeParams.departmentId.toString()
      );
    }
    if (this.employeeParams.designationId !== 0) {
      params = params.append(
        'DesignationId',
        this.employeeParams.designationId.toString()
      );
    }
    if (this.employeeParams.search) {
      params = params.append('search', this.employeeParams.search);
    }

    params = params.append('Sort', this.employeeParams.sort);
    params = params.append('PageIndex', this.employeeParams.pageIndex);
    params = params.append('PageSize', this.employeeParams.pageSize);

    return this.httpClient
      .get(this.baseUrl + 'employees', { observe: 'response', params })
      .pipe(
        map((response: any) => {
          this.pagination = response.body;
          return this.pagination;
        })
      );
  }

  setEmployeeParams() {
    this.store.select(selectEmployeeParams).subscribe({
      next: (response) => {
        this.employeeParams = response;
      },
    });
  }
  getEmployeeParams() {
    return this.employeeParams;
  }
  addUpdateEmployee(employee: IEmployee) {
    let req: any;

    let middleName = '';
    let address1 = '';
    let address2 = '';
    let city = '';
    let state = '';
    let country = '';
    let zipCode = '';
    let contactNo = '';
    let description = '';
    let age = 0;
    let basic = 0;
    let taPercentage = 0;
    let daPercentage = 0;
    let hraPercentage = 0;
    let salary = 0;
    let dob = '1/1/1900';
    let hireDate = '1/1/1900';

    const formData: FormData = new FormData();

    if (employee.middleName !== null) {
      middleName = employee.middleName;
    }
    if (employee.address1 !== null) {
      address1 = employee.address1;
    }
    if (employee.address2 !== null) {
      address2 = employee.address2;
    }
    if (employee.city !== null) {
      city = employee.city;
    }
    if (employee.state !== null) {
      state = employee.state;
    }
    if (employee.country !== null) {
      country = employee.country;
    }
    if (employee.zipCode !== null) {
      zipCode = employee.zipCode;
    }
    if (employee.contactNo !== null) {
      contactNo = employee.contactNo;
    }
    if (employee.description !== null) {
      description = employee.description;
    }
    if (employee.age !== null) {
      age = employee.age;
    }
    if (employee.basic !== null) {
      basic = employee.basic;
    }
    if (employee.taPercentage !== null) {
      taPercentage = employee.taPercentage;
    }
    if (employee.daPercentage !== null) {
      daPercentage = employee.daPercentage;
    }
    if (employee.hraPercentage !== null) {
      hraPercentage = employee.hraPercentage;
    }
    if (employee.dob !== null) {
      dob = employee.dob;
    }

    formData.append('Id', employee.id.toString());
    formData.append('FirstName', employee.firstName);
    formData.append('MiddleName', middleName);
    formData.append('LastName', employee.lastName);
    formData.append('Age', age.toString());
    formData.append('DOB', employee.dob);
    formData.append('HireDate', employee.hireDate);
    formData.append('Sex', employee.sex);
    formData.append('Address1', address1);
    formData.append('Address2', address2);
    formData.append('City', city);
    formData.append('State', state);
    formData.append('ZipCode', zipCode);
    formData.append('Country', country);
    formData.append('ContactNo', contactNo);
    formData.append('Basic', basic.toString());
    formData.append('TAPercentage', taPercentage.toString());
    formData.append('DAPercentage', daPercentage.toString());
    formData.append('HRAPercentage', hraPercentage.toString());
    formData.append('Salary', salary.toString());
    formData.append('ImageUrl', employee.imageUrl);
    formData.append('ImageFile', employee.imageFile);
    formData.append('Description', description);
    formData.append('DepartmentId', employee.departmentId.toString());
    formData.append('DesignationId', employee.designationId.toString());
    formData.append('EmployeeTypeId', employee.employeeTypeId.toString());

    // formData.append('DepartmentName', employee.departmentName);
    // formData.append('DesignationName', employee.designationName);
    formData.append('removeImage', employee.removeImage.toString());
    //Update
    if (employee.id > 0) {
      req = new HttpRequest('PUT', this.baseUrl + 'employees', formData, {
        reportProgress: false,
      });
    } else {
      //Add
      req = new HttpRequest('POST', this.baseUrl + 'employees', formData, {
        reportProgress: false,
      });
    }
    return this.httpClient.request<IEmployee>(req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
  deleteEmployee(employee: IEmployee) {
    const options = {
      body: {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        age: employee.age,
        basic: employee.basic,
        departmentId: employee.departmentId,
        designationId: employee.designationId,
        imageUrl: employee.imageUrl,
      },
    };
    return this.httpClient.delete(this.baseUrl + 'employees', options);
  }
  loadEmployeeFormPage() {
    return this.httpClient.get(this.baseUrl + 'employees/formpagedata');
  }
}
