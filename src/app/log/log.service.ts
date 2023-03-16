import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogParams } from '../shared/models/logParams';
import { selectLogParams } from '../state/log/log.selectors';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  constructor(private httpClient: HttpClient, private store: Store) {}
  logParams = new LogParams();
  baseUrl = environment.apiUrl;

  getLogs() {
    this.setLogParams();
    let params = new HttpParams();
    // if (this.designationParams.search) {
    //   params.append('Search', this.designationParams.search);
    // }

    params = params.append('PageIndex', this.logParams.pageIndex);
    params = params.append('PageSize', this.logParams.pageSize);
    params = params.append('Level', this.logParams.level);
    return this.httpClient
      .get(this.baseUrl + 'logs', { observe: 'response', params })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }
  setLogParams() {
    this.store.select(selectLogParams).subscribe({
      next: (response) => {
        this.logParams = response;
      },
    });
  }
  getLogParams() {
    return this.logParams;
  }
}
