import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ServerErrorComponent } from '../core/components/server-error/server-error.component';
import { NotFoundComponent } from '../core/components/not-found/not-found.component';
import { UnknownErrorComponent } from '../core/components/unknown-error/unknown-error.component';
import { InitialLoadComponent } from '../core/components/initial-load/initial-load.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'server-error', component: ServerErrorComponent },
      { path: 'not-found', component: NotFoundComponent },
      { path: 'unknown-error', component: UnknownErrorComponent },
      { path: 'loadingapp', component: InitialLoadComponent },
      {
        path: 'employees',
        loadChildren: () =>
          import('../employee/employee.module').then(
            (mod) => mod.EmployeeModule
          ),
      },
      {
        path: 'departments',
        loadChildren: () =>
          import('../department/department.module').then(
            (mod) => mod.DepartmentModule
          ),
      },
      {
        path: 'designations',
        loadChildren: () =>
          import('../designation/designation.module').then(
            (mod) => mod.DesignationModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('../report/report.module').then((mod) => mod.ReportModule),
      },
      {
        path: 'logs',
        loadChildren: () =>
          import('../log/log.module').then((mod) => mod.LogModule),
      },
      // {
      //   path: '**',
      //   redirectTo: '/home',
      // },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
