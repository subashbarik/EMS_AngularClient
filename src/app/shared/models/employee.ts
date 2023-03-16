import { zip } from 'rxjs';
import { command } from './command';
import { IDepartment } from './department';
import { IDesignation } from './designation';
import { IEmployeeType } from './employeetype';

export interface IEmployeeFormData {
  employee: IEmployee;
  command: command;
}
export class EmployeeFormData implements IEmployeeFormData {
  constructor(public employee: IEmployee, public command: command) {}
}
export interface IEmployeeFormPageModel {
  departments: IDepartment[];
  designations: IDesignation[];
  employeeTypes: IEmployeeType[];
  defaultImageUrl: string;
}
// export class EmployeeFormPageModel implements IEmployeeFormPageModel {
//   departments: IDepartment[];
//   designations: IDesignation[];
//   defaultImageUrl: string;
//   constructor(
//     departments: IDepartment[],
//     designations: IDesignation[],
//     defaultImageUrl: string
//   ) {
//     this.departments = departments;
//     this.designations = designations;
//     this.defaultImageUrl = defaultImageUrl;
//   }
// }
export interface IEmployee {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  dob: string;
  hireDate: string;
  sex: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  contactNo: string;
  country: string;
  basic: number;
  taPercentage: number;
  daPercentage: number;
  hraPercentage: number;
  salary: number;
  imageUrl: string;
  description: string;
  imageFile: File;
  departmentId: number;
  designationId: number;
  employeeTypeId: number;
  departmentName?: string;
  designationName?: string;
  employeeTypeName?: string;
  removeImage?: boolean;
}
export class Employee implements IEmployee {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
  dob: string;
  hireDate: string;
  sex: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  contactNo: string;
  zipCode: string;
  country: string;
  basic: number;
  taPercentage: number;
  daPercentage: number;
  hraPercentage: number;
  salary: number;
  imageUrl: string;
  description: string;
  imageFile: File;
  departmentId: number;
  designationId: number;
  employeeTypeId: number;
  departmentName?: string;
  designationName?: string;
  employeeTypeName?: string;
  removeImage?: boolean;
  constructor(
    id: number,
    firstname: string,
    middleName: string,
    lastname: string,
    age: number,
    dob: string,
    hireDate: string,
    sex: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zipCode: string,
    country: string,
    contactNo: string,
    basic: number,
    taPrcentage: number,
    daPercentage: number,
    hraPercentage: number,
    salary: number,
    imageUrl: string,
    imageFile: File,
    description: string,
    departmentId: number,
    designationId: number,
    employeeTypeId: number,
    departmentName?: string,
    designationName?: string,
    employeeTypeName?: string,
    removeImage?: boolean
  ) {
    this.id = id;
    this.firstName = firstname;
    this.middleName = middleName;
    this.lastName = lastname;
    this.age = age;
    this.dob = dob;
    this.hireDate = hireDate;
    this.sex = sex;
    this.address1 = address1;
    this.address2 = address2;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.country = country;
    this.contactNo = contactNo;
    this.basic = basic;
    this.taPercentage = taPrcentage;
    this.daPercentage = daPercentage;
    this.hraPercentage = hraPercentage;
    this.salary = salary;
    this.imageUrl = imageUrl;
    this.imageFile = imageFile;
    this.description = description;
    this.departmentId = departmentId;
    this.designationId = designationId;
    this.employeeTypeId = employeeTypeId;
    this.departmentName = departmentName;
    this.designationName = designationName;
    this.employeeTypeName = employeeTypeName;
    this.removeImage = removeImage;
  }
}
