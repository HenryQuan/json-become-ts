import { Perks } from './perks/Perks';

export interface DataCommanderSkill {
  tier: number
  perks: Perks[],
  name: string
  icon: string
}
