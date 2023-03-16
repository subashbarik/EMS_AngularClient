import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Login } from 'src/app/shared/models/user';
import { loginUser } from 'src/app/state/account/account.actions';
import { accountStatusSelector } from 'src/app/state/account/account.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: UntypedFormGroup;
  public loginStatus$: Observable<string>;
  @ViewChild('rememberme', { static: false }) rememberMe: ElementRef;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.initializeValues();
  }
  ngOnDestroy(): void {}
  createLoginForm() {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
      ]),
      password: new UntypedFormControl('', Validators.required),
      rememberMe: new UntypedFormControl(false),
    });
  }
  initializeValues(): void {
    this.loginStatus$ = this.store.pipe(select(accountStatusSelector));
  }

  onSubmit() {
    let login = new Login(
      this.loginForm.value.email,
      this.loginForm.value.password,
      this.loginForm.value.rememberMe
    );
    this.store.dispatch(loginUser({ login: login }));
  }
}
