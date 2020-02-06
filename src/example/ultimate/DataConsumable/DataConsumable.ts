import { Profile } from './profile/Profile';

export interface DataConsumable {
  profile: Profile,
  description: string
  priceGold: number
  image: string
  consumableId: number
  priceCredit: number
  type: string
  name: string
}
