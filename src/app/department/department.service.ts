import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDepartment } from '../shared/models/department';
import { DepartmentParams } from '../shared/models/departmentParams';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private httpClient: HttpClient) {}
  departmentParams = new DepartmentParams();
  baseUrl = environment.apiUrl;
  getDepartments() {
    let params = new HttpParams();
    if (this.departmentParams.search) {
      params.append('Search', this.departmentParams.search);
    }
    params = params.append('Sort', this.departmentParams.sort);
    params = params.append('PageIndex', this.departmentParams.pageIndex);
    params = params.append('PageSize', this.departmentParams.pageSize);
    return this.httpClient
      .get(this.baseUrl + 'departments', { observe: 'response', params })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }
  setDepartmentParams(params: DepartmentParams) {
    this.departmentParams = params;
  }
  addUpdateDepartment(department: IDepartment) {
    let req: any;
    const formData: FormData = new FormData();

    formData.append('Id', department.id.toString());
    formData.append('name', department.name);
    formData.append('description', department.description);
    formData.append('companyid', department.companyId.toString());

    //Update
    if (department.id > 0) {
      req = new HttpRequest('PUT', this.baseUrl + 'departments', formData, {
        reportProgress: false,
      });
    } else {
      //Add
      req = new HttpRequest('POST', this.baseUrl + 'departments', formData, {
        reportProgress: false,
      });
    }
    return this.httpClient.request<IDepartment>(req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
  deleteDepartment(department: IDepartment) {
    const options = {
      body: {
        id: department.id,
        name: department.name,
        description: department.description,
        companyid: department.companyId,
      },
    };
    return this.httpClient.delete(this.baseUrl + 'departments', options);
  }
}
