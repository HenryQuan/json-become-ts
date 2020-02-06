import { DataAchievement } from './DataAchievement/DataAchievement';
import { DataPersonalRating } from './DataPersonalRating/DataPersonalRating';
import { DataCommanderSkill } from './DataCommanderSkill/DataCommanderSkill';
import { DataConsumable } from './DataConsumable/DataConsumable';
import { DataWarship } from './DataWarship/DataWarship';
import { DataGameMap } from './DataGameMap/DataGameMap';
import { DataCollection } from './DataCollection/DataCollection';
import { WoWsInfoPlayerList } from './WoWsInfoPlayerList/WoWsInfoPlayerList';
import { DataEncyclopedia } from './DataEncyclopedia/DataEncyclopedia';
import { WoWsInfoUserData } from './WoWsInfoUserData/WoWsInfoUserData';
import { WoWsInfoUserInfo } from './WoWsInfoUserInfo/WoWsInfoUserInfo';

export interface Ultimate {
  WoWsInfoRsIP: string
  WoWsInfoLastUpdate: string
  WoWsInfoGameVersion: string
  WoWsInfoUserInfo: WoWsInfoUserInfo,
  WoWsInfoSwapButton: boolean
  WoWsInfoFullscreenAds: boolean
  WoWsInfoBannerAds: boolean
  WoWsInfoUserData: WoWsInfoUserData,
  DataEncyclopedia: DataEncyclopedia,
  WoWsInfoPlayerList: WoWsInfoPlayerList,
  WoWsInfoThemeColour: Map<string, string>,
  DataLanguage: Map<string, string>,
  WoWsInfoCurrServer: number
  WoWsInfoApiLanguage: string
  WoWsInfoNoImageMode: boolean
  DataCollection: DataCollection,
  WoWsInfoDarkMode: boolean
  DataGameMap: DataGameMap[],
  WoWsInfoUserLanguage: string
  DataWarship: Map<string, DataWarship>,
  WoWsInfoFirstLaunch: boolean
  DataConsumable: Map<string, DataConsumable>,
  DataCommanderSkill: DataCommanderSkill[],
  WoWsInfoCurrDate: string
  DataPersonalRating: Map<string, DataPersonalRating>,
  WoWsInfoLastLocation: string
  DataAchievement: Map<string, DataAchievement>,
  WoWsInfoCurrVersion: string
}
