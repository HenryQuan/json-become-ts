import { ShootShift } from './shootShift/ShootShift';
import { AfterBattleRepair } from './afterBattleRepair/AfterBattleRepair';
import { VisibilityFactor } from './visibilityFactor/VisibilityFactor';
import { CreditsFactor } from './creditsFactor/CreditsFactor';
import { ExpFactor } from './expFactor/ExpFactor';

export interface Profile {
  expFactor: ExpFactor,
  creditsFactor: CreditsFactor,
  visibilityFactor: VisibilityFactor,
  afterBattleRepair: AfterBattleRepair,
  shootShift: ShootShift,
}
