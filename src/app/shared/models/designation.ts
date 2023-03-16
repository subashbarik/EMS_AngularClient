export interface IDesignation {
  id: number;
  name: string;
  description: string;
  basic: number;
  taPercentage: number;
  daPercentage: number;
  hraPercentage: number;
  createdDate: string;
  updatedDate: string;
}
export class Designation implements IDesignation {
  id: number;
  name: string;
  description: string;
  basic: number;
  taPercentage: number;
  daPercentage: number;
  hraPercentage: number;
  createdDate: string;
  updatedDate: string;

  constructor(
    id: number,
    name: string,
    description?: string,
    basic?: number,
    taPercentage?: number,
    daPercentage?: number,
    hraPercentage?: number,
    createdDate?: string,
    updatedDate?: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.basic = basic;
    this.taPercentage = taPercentage;
    this.daPercentage = daPercentage;
    this.hraPercentage = hraPercentage;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
  }
}
