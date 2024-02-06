export interface ICategory {
  _id: string;
  type: string;
  name: string;
}

export interface ICategoryMutation {
  type: string;
  name: string;
}

export interface IEditCategory {
  _id: string;
  category: ICategoryMutation;
}

export interface ITransaction {
  _id: string;
  name: string;
  category: ICategory;
  amount: number;
  createdAt: string;
}

export interface ITransactionForm extends ICategory{
  amount: number;
}

export interface ITransactionMutation {
  category: string;
  amount: number;
}

export interface IEditTransaction {
  id: string;
  transaction: ITransactionMutation;
}

export interface IAlert {
  message: string;
  type: string;
}