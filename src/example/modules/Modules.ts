import { Data } from './data/Data';
import { Meta } from './meta/Meta';

export interface Modules {
  status: string
  meta: Meta,
  data: Map<string, Data>,
}
