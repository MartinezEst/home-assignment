import { Selection } from './Selection.interface';

export interface Market {
  id: string;
  name: string;
  selections: Selection[];
}
