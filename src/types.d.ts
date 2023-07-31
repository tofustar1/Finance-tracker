export interface ICategorie {
  id: string;
  type: string;
  name: string;
}

export interface ICategoriesList {
  [id: string] : ICategorie;
}