import { Data } from './data/Data';
import { Meta } from './meta/Meta';

export interface GameVersion {
  status: string
  meta: Meta,
  data: Data,
}
