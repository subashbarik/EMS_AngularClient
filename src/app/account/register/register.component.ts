import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Register } from 'src/app/shared/models/user';
import { registerUser } from 'src/app/state/account/account.actions';
import {
  accountStatusSelector,
  accountErrorSelector,
} from 'src/app/state/account/account.selectors';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  public registerForm: FormGroup;
  public errors: string[];
  public registerStatus$: Observable<string>;
  public registerError$: Observable<any>;
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createRegisterForm();
    this.initializeValues();
  }
  initializeValues(): void {
    this.registerStatus$ = this.store.pipe(select(accountStatusSelector));
    this.registerError$ = this.store.pipe(select(accountErrorSelector));
  }
  createRegisterForm(): void {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'),
        ],
      ],
      password: [null, Validators.required],
    });
  }

  ngOnDestroy(): void {}
  onSubmit() {
    let register = new Register(
      this.registerForm.value.displayName,
      this.registerForm.value.email,
      this.registerForm.value.password
    );
    this.store.dispatch(registerUser({ register: register }));
  }
}
