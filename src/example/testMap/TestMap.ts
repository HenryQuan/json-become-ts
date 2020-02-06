import { KeyValue } from './keyValue/KeyValue';
import { Friends } from './friends/Friends';

export interface TestMap {
  latitude: number
  longitude: number
  tags: string[],
  friends: Friends[],
  greeting: string
  favoriteFruit: string
  keyValue: KeyValue,
}
