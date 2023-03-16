import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDesignation } from '../shared/models/designation';
import { DesignationParams } from '../shared/models/designationParams';

@Injectable({
  providedIn: 'root',
})
export class DesignationService {
  designationParams = new DesignationParams();
  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getDesignations() {
    let params = new HttpParams();
    if (this.designationParams.search) {
      params.append('Search', this.designationParams.search);
    }
    params = params.append('Sort', this.designationParams.sort);
    params = params.append('PageIndex', this.designationParams.pageIndex);
    params = params.append('PageSize', this.designationParams.pageSize);
    return this.httpClient
      .get(this.baseUrl + 'designations', { observe: 'response', params })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  setDesignationParams(params: DesignationParams) {
    this.designationParams = params;
  }
  addUpdateDesignation(designation: IDesignation) {
    let req: any;
    const formData: FormData = new FormData();
    formData.append('Id', designation.id.toString());
    formData.append('name', designation.name);
    formData.append('description', designation.description);
    formData.append(
      'basic',
      designation.basic ? designation.basic.toString() : '0'
    );
    formData.append(
      'taPercentage',
      designation.taPercentage ? designation.taPercentage.toString() : '0'
    );
    formData.append(
      'daPercentage',
      designation.daPercentage ? designation.daPercentage.toString() : '0'
    );
    formData.append(
      'hraPercentage',
      designation.hraPercentage ? designation.hraPercentage.toString() : '0'
    );

    //Update
    if (designation.id > 0) {
      req = new HttpRequest('PUT', this.baseUrl + 'designations', formData, {
        reportProgress: false,
      });
    } else {
      //Add
      req = new HttpRequest('POST', this.baseUrl + 'designations', formData, {
        reportProgress: false,
      });
    }
    return this.httpClient.request<IDesignation>(req).pipe(
      map((response: any) => {
        return response.body;
      })
    );
  }
  deleteDesignation(designation: IDesignation) {
    const options = {
      body: {
        id: designation.id,
        name: designation.name,
        description: designation.description,
        taPercentage: designation.taPercentage,
        daPercentage: designation.daPercentage,
        hraPercentage: designation.hraPercentage,
      },
    };
    return this.httpClient.delete(this.baseUrl + 'designations', options);
  }
}
