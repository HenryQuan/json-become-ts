import { ShipTypes } from './shipTypes/ShipTypes';
import { ShipModules } from './shipModules/ShipModules';

export interface DataEncyclopedia {
  shipModules: ShipModules,
  shipTypes: ShipTypes,
  shipNations: Map<string, string>,
}
