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