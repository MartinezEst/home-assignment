import { Category } from './Category.interface';
import { Competitor } from './Competitor.interface';
import { Market } from './Market.interface';

export interface SportEvent {
  id: string;
  category: Category;
  competitors: Array<Competitor>;
  markets: Array<Market>;
  startTime: Date;
  updatedAt: Date;
}
