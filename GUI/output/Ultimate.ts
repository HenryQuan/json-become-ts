/** This is the `Ultimate` class */
class Ultimate {
  woWsInfoRsIP: string
  woWsInfoLastUpdate: string
  woWsInfoGameVersion: string
  woWsInfoUserInfo: WoWsInfoUserInfo
  woWsInfoSwapButton: boolean
  woWsInfoFullscreenAd: boolean
  woWsInfoBannerAd: boolean
  woWsInfoUserData: WoWsInfoUserData
  dataEncyclopedia: DataEncyclopedia
  woWsInfoPlayerList: WoWsInfoPlayerList
  woWsInfoThemeColour: Map<string, string>
  dataLanguage: Map<string, string>
  woWsInfoCurrServer: number
  woWsInfoApiLanguage: string
  woWsInfoNoImageMode: boolean
  dataCollection: DataCollection
  woWsInfoDarkMode: boolean
  dataGameMap: DataGameMap[]
  woWsInfoUserLanguage: string
  dataWarship: Map<string, DataWarship>
  woWsInfoFirstLaunch: boolean
  dataConsumable: Map<string, DataConsumable>
  dataCommanderSkill: DataCommanderSkill[]
  woWsInfoCurrDate: string
  dataPersonalRating: Map<string, DataPersonalRating>
  woWsInfoLastLocation: string
  dataAchievement: Map<string, DataAchievement>
  woWsInfoCurrVersion: string

  constructor(json) {
    this.woWsInfoRsIP = json["@WoWs_Info:rsIP"];
    this.woWsInfoLastUpdate = json["@WoWs_Info:lastUpdate"];
    this.woWsInfoGameVersion = json["@WoWs_Info:gameVersion"];
    this.woWsInfoUserInfo = json["@WoWs_Info:userInfo"];
    this.woWsInfoSwapButton = json["@WoWs_Info:swapButton"];
    this.woWsInfoFullscreenAd = json["@WoWs_Info:fullscreen_ads"];
    this.woWsInfoBannerAd = json["@WoWs_Info:banner_ads"];
    this.woWsInfoUserData = json["@WoWs_Info:userData"];
    this.dataEncyclopedia = json["@Data:encyclopedia"];
    this.woWsInfoPlayerList = json["@WoWs_Info:playerList"];
    this.woWsInfoThemeColour = json["@WoWs_Info:themeColour"];
    this.dataLanguage = json["@Data:language"];
    this.woWsInfoCurrServer = json["@WoWs_Info:currServer"];
    this.woWsInfoApiLanguage = json["@WoWs_Info:apiLanguage"];
    this.woWsInfoNoImageMode = json["@WoWs_Info:noImageMode"];
    this.dataCollection = json["@Data:collection"];
    this.woWsInfoDarkMode = json["@WoWs_Info:darkMode"];
    this.dataGameMap = json["@Data:gameMap"];
    this.woWsInfoUserLanguage = json["@WoWs_Info:userLanguage"];
    this.dataWarship = json["@Data:warship"];
    this.woWsInfoFirstLaunch = json["@WoWs_Info:firstLaunch"];
    this.dataConsumable = json["@Data:consumable"];
    this.dataCommanderSkill = json["@Data:commander_skill"];
    this.woWsInfoCurrDate = json["@WoWs_Info:currDate"];
    this.dataPersonalRating = json["@Data:personal_rating"];
    this.woWsInfoLastLocation = json["@WoWs_Info:lastLocation"];
    this.dataAchievement = json["@Data:achievement"];
    this.woWsInfoCurrVersion = json["@WoWs_Info:currVersion"];
  }
}

/** This is the `WoWsInfoUserInfo` class */
class WoWsInfoUserInfo {
  nickname: string
  accountId: string
  server: number

  constructor(json) {
    this.nickname = json["nickname"];
    this.accountId = json["account_id"];
    this.server = json["server"];
  }
}

/** This is the `WoWsInfoUserData` class */
class WoWsInfoUserData {
  woWsInfoUserData: any

  constructor(json) {
    this.woWsInfoUserData = json["woWsInfoUserData"];
  }
}

/** This is the `DataEncyclopedia` class */
class DataEncyclopedia {
  shipModule: ShipModule
  shipType: ShipType
  shipNation: Map<string, string>

  constructor(json) {
    this.shipModule = json["ship_modules"];
    this.shipType = json["ship_types"];
    this.shipNation = json["ship_nations"];
  }
}

/** This is the `ShipModule` class */
class ShipModule {
  engine: string
  flightControl: string
  suo: string
  hull: string
  artillery: string
  torpedoe: string
  torpedoBomber: string
  diveBomber: string
  fighter: string

  constructor(json) {
    this.engine = json["Engine"];
    this.flightControl = json["FlightControl"];
    this.suo = json["Suo"];
    this.hull = json["Hull"];
    this.artillery = json["Artillery"];
    this.torpedoe = json["Torpedoes"];
    this.torpedoBomber = json["TorpedoBomber"];
    this.diveBomber = json["DiveBomber"];
    this.fighter = json["Fighter"];
  }
}

/** This is the `ShipType` class */
class ShipType {
  destroyer: string
  airCarrier: string
  battleship: string
  cruiser: string
  submarine: string

  constructor(json) {
    this.destroyer = json["Destroyer"];
    this.airCarrier = json["AirCarrier"];
    this.battleship = json["Battleship"];
    this.cruiser = json["Cruiser"];
    this.submarine = json["Submarine"];
  }
}

/** This is the `WoWsInfoPlayerList` class */
class WoWsInfoPlayerList {
  clan: Clan
  player: Player

  constructor(json) {
    this.clan = json["clan"];
    this.player = json["player"];
  }
}

/** This is the `Clan` class */
class Clan {
  k2000008934: K2000008934
  k2000010125: K2000010125

  constructor(json) {
    this.k2000008934 = json["2000008934"];
    this.k2000010125 = json["2000010125"];
  }
}

/** This is the `K2000008934` class */
class K2000008934 {
  tag: string
  clanId: string
  server: number

  constructor(json) {
    this.tag = json["tag"];
    this.clanId = json["clan_id"];
    this.server = json["server"];
  }
}

/** This is the `K2000010125` class */
class K2000010125 {
  clanId: number
  tag: string
  server: number

  constructor(json) {
    this.clanId = json["clan_id"];
    this.tag = json["tag"];
    this.server = json["server"];
  }
}

/** This is the `Player` class */
class Player {
  k2008370100: K2008370100
  k2011774448: K2011774448

  constructor(json) {
    this.k2008370100 = json["2008370100"];
    this.k2011774448 = json["2011774448"];
  }
}

/** This is the `K2008370100` class */
class K2008370100 {
  nickname: string
  accountId: number
  server: number

  constructor(json) {
    this.nickname = json["nickname"];
    this.accountId = json["account_id"];
    this.server = json["server"];
  }
}

/** This is the `K2011774448` class */
class K2011774448 {
  nickname: string
  accountId: string
  server: number

  constructor(json) {
    this.nickname = json["nickname"];
    this.accountId = json["account_id"];
    this.server = json["server"];
  }
}

/** This is the `DataCollection` class */
class DataCollection {
  collection: Map<string, Collection>
  item: Map<string, Item>

  constructor(json) {
    this.collection = json["collection"];
    this.item = json["item"];
  }
}

/** This is the `Collection` class */
class Collection {
  collectionId: number
  image: string
  name: string
  description: string

  constructor(json) {
    this.collectionId = json["collection_id"];
    this.image = json["image"];
    this.name = json["name"];
    this.description = json["description"];
  }
}

/** This is the `Item` class */
class Item {
  collectionId: number
  description: string
  cardId: number
  name: string
  image: string

  constructor(json) {
    this.collectionId = json["collection_id"];
    this.description = json["description"];
    this.cardId = json["card_id"];
    this.name = json["name"];
    this.image = json["image"];
  }
}

/** This is the `DataGameMap` class */
class DataGameMap {
  icon: string
  description: string
  name: string

  constructor(json) {
    this.icon = json["icon"];
    this.description = json["description"];
    this.name = json["name"];
  }
}

/** This is the `DataWarship` class */
class DataWarship {
  tier: number
  name: string
  shipId: number
  nation: string
  shipIdStr: string
  type: string
  icon: string
  premium: boolean
  model: string

  constructor(json) {
    this.tier = json["tier"];
    this.name = json["name"];
    this.shipId = json["ship_id"];
    this.nation = json["nation"];
    this.shipIdStr = json["ship_id_str"];
    this.type = json["type"];
    this.icon = json["icon"];
    this.premium = json["premium"];
    this.model = json["model"];
  }
}

/** This is the `DataConsumable` class */
class DataConsumable {
  profile: Map<string, Profile>
  description: string
  priceGold: number
  image: string
  consumableId: number
  priceCredit: number
  type: string
  name: string
  slot: number

  constructor(json) {
    this.profile = json["profile"];
    this.description = json["description"];
    this.priceGold = json["price_gold"];
    this.image = json["image"];
    this.consumableId = json["consumable_id"];
    this.priceCredit = json["price_credit"];
    this.type = json["type"];
    this.name = json["name"];
    this.slot = json["slot"];
  }
}

/** This is the `Profile` class */
class Profile {
  description: string

  constructor(json) {
    this.description = json["description"];
  }
}

/** This is the `DataCommanderSkill` class */
class DataCommanderSkill {
  tier: number
  perk: Perk[]
  name: string
  icon: string

  constructor(json) {
    this.tier = json["tier"];
    this.perk = json["perks"];
    this.name = json["name"];
    this.icon = json["icon"];
  }
}

/** This is the `Perk` class */
class Perk {
  description: string

  constructor(json) {
    this.description = json["description"];
  }
}

/** This is the `DataPersonalRating` class */
class DataPersonalRating {
  averageDamageDealt: number
  averageFrag: number
  winRate: number

  constructor(json) {
    this.averageDamageDealt = json["average_damage_dealt"];
    this.averageFrag = json["average_frags"];
    this.winRate = json["win_rate"];
  }
}

/** This is the `DataAchievement` class */
class DataAchievement {
  description: string
  image: string
  achievementId: string
  imageInactive: string
  hidden: number
  name: string

  constructor(json) {
    this.description = json["description"];
    this.image = json["image"];
    this.achievementId = json["achievement_id"];
    this.imageInactive = json["image_inactive"];
    this.hidden = json["hidden"];
    this.name = json["name"];
  }
}