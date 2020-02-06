import { Item } from './item/Item';
import { Collection } from './collection/Collection';

export interface DataCollection {
  collection: Map<string, Collection>,
  item: Map<string, Item>,
}
