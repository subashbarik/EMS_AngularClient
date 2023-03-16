export interface IDepartment {
  id: number;
  name: string;
  description: string;
  companyId: number;
  createdDate: string;
  updatedDate: string;
}
export class Department implements IDepartment {
  id: number;
  name: string;
  description: string;
  companyId: number;
  createdDate: string;
  updatedDate: string;
  constructor(
    id: number,
    name: string,
    description: string,
    companyId: number,
    createdDate?: string,
    updatedDate?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.companyId = companyId;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}
