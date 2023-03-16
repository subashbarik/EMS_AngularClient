import { IEmployee } from './employee';

export interface IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IEmployee[];
}
export class Pagination implements IPagination {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: IEmployee[] = [];
}
// export interface ICheckList {
//   id: string;
//   title: string;
// }
// export type AddCheckList = Pick<ICheckList, 'title'>;
