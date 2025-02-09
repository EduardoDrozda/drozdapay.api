import { BaseEntity } from './base.entity';

export class CategoryBillEntity extends BaseEntity {
  name: string;
  description: string;
  color: string;
  icon: string;

  constructor(name: string, description: string, color: string, icon: string) {
    super();
    this.name = name;
    this.description = description;
    this.color = color;
    this.icon = icon;
  }
}

export interface ICategoryBillCreateInput {
  name: string;
  description: string;
  color: string;
  icon: string;
}