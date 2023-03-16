import { IAccountState } from './account/account.reducer';
import { IGlobalState } from './appglobal/appglobal.reducer';
import { IDepartmentState } from './department/department.reducer';
import { IDesignationState } from './designation/designation.reducer';
import { IEmployeeState } from './employee/employee.reducer';
import { ILogState } from './log/log.reducer';
import { IThemeState } from './theme/theme.reducer';

export interface IAppState {
  accState: IAccountState;
  empState: IEmployeeState;
  deptState: IDepartmentState;
  desigState: IDesignationState;
  logState: ILogState;
  globalState: IGlobalState;
  themeState: IThemeState;
}
