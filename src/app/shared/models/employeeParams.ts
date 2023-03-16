export interface IEmployeeParams {
  departmentId: number;
  designationId: number;
  sort: string;
  pageIndex: number;
  pageSize: number;
  search: string;
}
export class EmployeeParams implements IEmployeeParams {
  departmentId = 0;
  designationId = 0;
  sort = 'firstName';
  pageIndex = 1;
  pageSize = 9;
  search: string;
}
