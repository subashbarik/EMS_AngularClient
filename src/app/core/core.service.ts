import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGlobal } from '../shared/models/global';
import { IServerAppConfiguration } from '../shared/models/serverappconfiguration';
import { selectGlobal } from '../state/appglobal/appglobal.selectors';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public serverAppConfig: IServerAppConfiguration;
  private formResetSubject = new Subject<void>();
  public formReset$ = this.formResetSubject.asObservable();
  public global$ = this.store.select(selectGlobal);
  baseUrl = environment.apiUrl;
  globalData: IGlobal;
  constructor(private httpClient: HttpClient, private store: Store) {}
  formReset() {
    this.formResetSubject.next();
  }
  loadGlobalData() {
    return this.httpClient.get(this.baseUrl + 'global');
    // return this.httpClient.get(this.baseUrl + 'global').pipe(
    //   map((response: any) => {
    //     console.log('service');
    //     console.log(response);
    //     return response;
    //   })
    // );
  }
  setGlobalDataFromStore() {
    this.global$.subscribe({
      next: (response) => {
        //Sets the global data in the serverAppConfig for easy access
        //from different places in the application, violates the store
        // concept in but to seems ok to save duplicate code
        this.serverAppConfig = response.serverAppConfigurations;
      },
    });
  }
}
