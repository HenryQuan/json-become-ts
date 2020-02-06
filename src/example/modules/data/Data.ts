import { Profile } from './profile/Profile';

export interface Data {
  profile: Profile,
  name: string
  image: string
  tag: string
  moduleIdStr: string
  moduleId: number
  type: string
  priceCredit: number
}
