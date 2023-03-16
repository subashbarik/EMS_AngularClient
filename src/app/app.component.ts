import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUser } from './state/account/account.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private store: Store, private router: Router) {}
  title = 'EMS Client';
  ngOnInit(): void {
    this.loadCurrentUser();
  }
  ngOnDestroy(): void {}
  loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.store.dispatch(loadUser({ token: token }));
    } else {
      this.router.navigate(['/account/login']);
    }
  }
}
