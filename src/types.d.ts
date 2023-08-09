export interface ICategory {
  id: string;
  type: string;
  name: string;
}

export interface ICategoriesList {
  [id: string] : ICategorie;
}

export interface ICategoryMutation {
  type: string;
  name: string;
}

export interface IEditCategory {
  id: string;
  category: ICategorieMutation;
}

export interface ITransaction {
  id: string;
  category: string;
  amount: number;
  createdAt: string;
}

export interface ITransactionsList {
  [id: string] : ITransaction;
}

export interface ITransactionFullInfo {
  id: string;
  category: string;
  amount: number;
  createdAt: string;
  type: string;
}