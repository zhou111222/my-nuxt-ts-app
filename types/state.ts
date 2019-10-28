import { Person, Product } from "~/types";

export interface RootState {
  people: Person[];
  count: number;
  productList: Product[];
}

export interface HomeState {
  carNum: number;
}
