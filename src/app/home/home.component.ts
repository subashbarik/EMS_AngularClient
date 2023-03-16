import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeService } from '../employee/employee.service';
import { IEmployee } from '../shared/models/employee';
import { IUser } from '../shared/models/user';
import { selectUser } from '../state/account/account.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public currentUser$: Observable<IUser>;
  reportUrl: SafeResourceUrl = '';
  urlString: string = environment.reportServerUrl + 'DashBoard_Local';
  //urlString: string = 'http://localhost:63702/UserReport';
  //urlString: string =
  //'http://laptop-vd1go2pn:81/ReportServer?/Reports/EMS/Dashboard&rc:Toolbar=false&rs:Command=Render';
  constructor(private store: Store, private domSanitizer: DomSanitizer) {
    this.reportUrl = domSanitizer.bypassSecurityTrustResourceUrl(
      this.urlString
    );
  }

  ngOnInit(): void {
    this.initializeValues();
    // Example of a Promise
    //this.invokePromise();
  }
  initializeValues(): void {
    this.currentUser$ = this.store.pipe(select(selectUser));
  }
  invokePromise(): void {
    let responseMsg = '';
    const myPromise = new Promise((resolve, reject) => {
      // setTimeout(() => {
      //   resolve('done');
      // }, 6000);
      const innerPromise = new Promise((resolveInner, rejectInner) => {
        setTimeout(() => {
          resolveInner('resolveinner');
        }, 6000);
      });
      innerPromise.then((innerResponse) => {
        responseMsg = 'outer resolver :' + innerResponse;
        resolve(responseMsg);
      });
    });

    myPromise.then((response) => {
      console.log(response);
    });
  }
}
