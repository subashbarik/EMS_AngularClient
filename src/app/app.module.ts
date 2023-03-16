import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { employeeReducer } from './state/employee/employee.reducer';
import { EmployeeEffects } from './state/employee/employee.effects';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { departmentReducer } from './state/department/department.reducer';
import { DepartmentEffects } from './state/department/department.effects';
import { designationReducer } from './state/designation/designation.reducer';
import { DesignationEffect } from './state/designation/designation.effects';
import { globalReducer } from './state/appglobal/appglobal.reducer';
import { GlobalEffects } from './state/appglobal/appglobal.effects';
import { accountReducer } from './state/account/account.reducer';
import { AccountEffects } from './state/account/account.effects';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { logReducer } from './state/log/log.reducer';
import { LogEffect } from './state/log/log.effects';
import { themeReducer } from './state/theme/theme.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    StoreModule.forRoot({
      accState: accountReducer,
      empState: employeeReducer,
      deptState: departmentReducer,
      desigState: designationReducer,
      logState: logReducer,
      globalState: globalReducer,
      themeState: themeReducer,
    }),
    EffectsModule.forRoot([
      AccountEffects,
      EmployeeEffects,
      DepartmentEffects,
      DesignationEffect,
      LogEffect,
      GlobalEffects,
    ]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
