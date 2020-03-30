/// This is the `Ultimate` class
class Ultimate {
  String woWsInfoRsIP;
  String woWsInfoLastUpdate;
  String woWsInfoGameVersion;
  WoWsInfoUserInfo woWsInfoUserInfo;
  bool woWsInfoSwapButton;
  bool woWsInfoFullscreenAd;
  bool woWsInfoBannerAd;
  dynamic woWsInfoUserData;
  DataEncyclopedia dataEncyclopedia;
  WoWsInfoPlayerList woWsInfoPlayerList;
  Map<String, String> woWsInfoThemeColour;
  Map<String, String> dataLanguage;
  int woWsInfoCurrServer;
  String woWsInfoApiLanguage;
  bool woWsInfoNoImageMode;
  DataCollection dataCollection;
  bool woWsInfoDarkMode;
  List<DataGameMap> dataGameMap;
  String woWsInfoUserLanguage;
  Map<String, DataWarship> dataWarship;
  bool woWsInfoFirstLaunch;
  Map<String, DataConsumable> dataConsumable;
  List<DataCommanderSkill> dataCommanderSkill;
  String woWsInfoCurrDate;
  Map<String, DataPersonalRating> dataPersonalRating;
  String woWsInfoLastLocation;
  Map<String, DataAchievement> dataAchievement;
  String woWsInfoCurrVersion;

  Ultimate(json) {
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

/// This is the `WoWsInfoUserInfo` class
class WoWsInfoUserInfo {
  String nickname;
  String accountId;
  int server;

  WoWsInfoUserInfo(json) {
    this.nickname = json["nickname"];
    this.accountId = json["account_id"];
    this.server = json["server"];
  }
}

/// This is the `DataEncyclopedia` class
class DataEncyclopedia {
  ShipModule shipModule;
  ShipType shipType;
  Map<String, String> shipNation;

  DataEncyclopedia(json) {
    this.shipModule = json["ship_modules"];
    this.shipType = json["ship_types"];
    this.shipNation = json["ship_nations"];
  }
}

/// This is the `ShipModule` class
class ShipModule {
  String engine;
  String flightControl;
  String suo;
  String hull;
  String artillery;
  String torpedoe;
  String torpedoBomber;
  String diveBomber;
  String fighter;

  ShipModule(json) {
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

/// This is the `ShipType` class
class ShipType {
  String destroyer;
  String airCarrier;
  String battleship;
  String cruiser;
  String submarine;

  ShipType(json) {
    this.destroyer = json["Destroyer"];
    this.airCarrier = json["AirCarrier"];
    this.battleship = json["Battleship"];
    this.cruiser = json["Cruiser"];
    this.submarine = json["Submarine"];
  }
}

/// This is the `WoWsInfoPlayerList` class
class WoWsInfoPlayerList {
  Clan clan;
  Player player;

  WoWsInfoPlayerList(json) {
    this.clan = json["clan"];
    this.player = json["player"];
  }
}

/// This is the `Clan` class
class Clan {
  K2000008934 k2000008934;
  K2000010125 k2000010125;

  Clan(json) {
    this.k2000008934 = json["2000008934"];
    this.k2000010125 = json["2000010125"];
  }
}

/// This is the `K2000008934` class
class K2000008934 {
  String tag;
  String clanId;
  int server;

  K2000008934(json) {
    this.tag = json["tag"];
    this.clanId = json["clan_id"];
    this.server = json["server"];
  }
}

/// This is the `K2000010125` class
class K2000010125 {
  int clanId;
  String tag;
  int server;

  K2000010125(json) {
    this.clanId = json["clan_id"];
    this.tag = json["tag"];
    this.server = json["server"];
  }
}

/// This is the `Player` class
class Player {
  K2008370100 k2008370100;
  K2011774448 k2011774448;

  Player(json) {
    this.k2008370100 = json["2008370100"];
    this.k2011774448 = json["2011774448"];
  }
}

/// This is the `K2008370100` class
class K2008370100 {
  String nickname;
  int accountId;
  int server;

  K2008370100(json) {
    this.nickname = json["nickname"];
    this.accountId = json["account_id"];
    this.server = json["server"];
  }
}

/// This is the `K2011774448` class
class K2011774448 {
  String nickname;
  String accountId;
  int server;

  K2011774448(json) {
    this.nickname = json["nickname"];
    this.accountId = json["account_id"];
    this.server = json["server"];
  }
}

/// This is the `DataCollection` class
class DataCollection {
  Map<String, Collection> collection;
  Map<String, Item> item;

  DataCollection(json) {
    this.collection = json["collection"];
    this.item = json["item"];
  }
}

/// This is the `Collection` class
class Collection {
  int collectionId;
  String image;
  String name;
  String description;

  Collection(json) {
    this.collectionId = json["collection_id"];
    this.image = json["image"];
    this.name = json["name"];
    this.description = json["description"];
  }
}

/// This is the `Item` class
class Item {
  int collectionId;
  String description;
  int cardId;
  String name;
  String image;

  Item(json) {
    this.collectionId = json["collection_id"];
    this.description = json["description"];
    this.cardId = json["card_id"];
    this.name = json["name"];
    this.image = json["image"];
  }
}

/// This is the `DataGameMap` class
class DataGameMap {
  String icon;
  String description;
  String name;

  DataGameMap(json) {
    this.icon = json["icon"];
    this.description = json["description"];
    this.name = json["name"];
  }
}

/// This is the `DataWarship` class
class DataWarship {
  int tier;
  String name;
  int shipId;
  String nation;
  String shipIdStr;
  String type;
  String icon;
  bool premium;
  String model;

  DataWarship(json) {
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

/// This is the `DataConsumable` class
class DataConsumable {
  Profile profile;
  String description;
  int priceGold;
  String image;
  int consumableId;
  int priceCredit;
  String type;
  String name;

  DataConsumable(json) {
    this.profile = json["profile"];
    this.description = json["description"];
    this.priceGold = json["price_gold"];
    this.image = json["image"];
    this.consumableId = json["consumable_id"];
    this.priceCredit = json["price_credit"];
    this.type = json["type"];
    this.name = json["name"];
  }
}

/// This is the `Profile` class
class Profile {
  ExpFactor expFactor;
  CreditsFactor creditsFactor;
  VisibilityFactor visibilityFactor;
  AfterBattleRepair afterBattleRepair;
  ShootShift shootShift;

  Profile(json) {
    this.expFactor = json["expFactor"];
    this.creditsFactor = json["creditsFactor"];
    this.visibilityFactor = json["visibilityFactor"];
    this.afterBattleRepair = json["afterBattleRepair"];
    this.shootShift = json["shootShift"];
  }
}

/// This is the `ExpFactor` class
class ExpFactor {
  String description;

  ExpFactor(json) {
    this.description = json["description"];
  }
}

/// This is the `CreditsFactor` class
class CreditsFactor {
  String description;

  CreditsFactor(json) {
    this.description = json["description"];
  }
}

/// This is the `VisibilityFactor` class
class VisibilityFactor {
  String description;

  VisibilityFactor(json) {
    this.description = json["description"];
  }
}

/// This is the `AfterBattleRepair` class
class AfterBattleRepair {
  String description;

  AfterBattleRepair(json) {
    this.description = json["description"];
  }
}

/// This is the `ShootShift` class
class ShootShift {
  String description;

  ShootShift(json) {
    this.description = json["description"];
  }
}

/// This is the `DataCommanderSkill` class
class DataCommanderSkill {
  int tier;
  List<Perk> perk;
  String name;
  String icon;

  DataCommanderSkill(json) {
    this.tier = json["tier"];
    this.perk = json["perks"];
    this.name = json["name"];
    this.icon = json["icon"];
  }
}

/// This is the `Perk` class
class Perk {
  String description;

  Perk(json) {
    this.description = json["description"];
  }
}

/// This is the `DataPersonalRating` class
class DataPersonalRating {
  double averageDamageDealt;
  double averageFrag;
  double winRate;

  DataPersonalRating(json) {
    this.averageDamageDealt = json["average_damage_dealt"];
    this.averageFrag = json["average_frags"];
    this.winRate = json["win_rate"];
  }
}

/// This is the `DataAchievement` class
class DataAchievement {
  String description;
  String image;
  String achievementId;
  String imageInactive;
  int hidden;
  String name;

  DataAchievement(json) {
    this.description = json["description"];
    this.image = json["image"];
    this.achievementId = json["achievement_id"];
    this.imageInactive = json["image_inactive"];
    this.hidden = json["hidden"];
    this.name = json["name"];
  }
}