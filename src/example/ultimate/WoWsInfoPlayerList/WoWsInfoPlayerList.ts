import { Player } from './player/Player';
import { Clan } from './clan/Clan';

export interface WoWsInfoPlayerList {
  clan: Clan,
  player: Player,
}
