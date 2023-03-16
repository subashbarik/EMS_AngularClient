import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { IServerAppConfiguration } from 'src/app/shared/models/serverappconfiguration';
import { IUser } from 'src/app/shared/models/user';
import {
  logOutUser,
  logOutUserSuccess,
} from 'src/app/state/account/account.actions';
import { selectUser } from 'src/app/state/account/account.selectors';
import { selectAppConfiguration } from 'src/app/state/appglobal/appglobal.selectors';
import { setColorTheme, setFontTheme } from 'src/app/state/theme/theme.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit, OnDestroy {
  public currentUser$: Observable<IUser>;
  public serverConfig$: Observable<IServerAppConfiguration>;
  public logoutUserSuccessSubscription = new Subscription();
  public selectedColorTheme = 'grey';
  public selectedFontTheme = 'normal';
  constructor(
    private store: Store,
    private router: Router,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.setupSubscriptions();
  }
  ngOnDestroy(): void {
    this.logoutUserSuccessSubscription.unsubscribe();
  }
  logout(): void {
    this.store.dispatch(logOutUser());
  }
  initializeValues(): void {
    this.currentUser$ = this.store.select(selectUser);
    this.serverConfig$ = this.store.select(selectAppConfiguration);
  }
  setupSubscriptions(): void {
    this.logoutUserSuccessSubscription = this.actions$
      .pipe(ofType(logOutUserSuccess))
      .subscribe({
        next: (response) => {
          if (response) {
            this.router.navigate(['/account/login']);
          }
        },
        error: (error) => {},
      });
  }
  setTheme(themeName: string): void {
    this.selectedColorTheme = themeName;
    this.store.dispatch(setColorTheme({ name: themeName }));
  }
  setFontTheme(themeName: string): void {
    this.selectedFontTheme = themeName;
    this.store.dispatch(setFontTheme({ name: themeName }));
  }
}
