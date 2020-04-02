/// This is the `Output` class
class Output {
  String id;
  int index;
  String guid;
  bool isActive;
  String balance;
  String picture;
  int age;
  String eyeColor;
  String name;
  String gender;
  String company;
  String email;
  String phone;
  String addres;
  String about;
  String registered;
  double latitude;
  double longitude;
  List<String> tag;
  List<Friend> friend;
  String greeting;
  String favoriteFruit;

  Output.fromJson(Map<String, dynamic> json) {
    this.id = json["_id"];
    this.index = json["index"];
    this.guid = json["guid"];
    this.isActive = json["isActive"];
    this.balance = json["balance"];
    this.picture = json["picture"];
    this.age = json["age"];
    this.eyeColor = json["eyeColor"];
    this.name = json["name"];
    this.gender = json["gender"];
    this.company = json["company"];
    this.email = json["email"];
    this.phone = json["phone"];
    this.addres = json["address"];
    this.about = json["about"];
    this.registered = json["registered"];
    this.latitude = json["latitude"];
    this.longitude = json["longitude"];
    this.tag = json["tags"];
    this.friend = json["friends"];
    this.greeting = json["greeting"];
    this.favoriteFruit = json["favoriteFruit"];
  }

  Map<String, dynamic> toJson() {
    return {
      "_id": this.id,
      "index": this.index,
      "guid": this.guid,
      "isActive": this.isActive,
      "balance": this.balance,
      "picture": this.picture,
      "age": this.age,
      "eyeColor": this.eyeColor,
      "name": this.name,
      "gender": this.gender,
      "company": this.company,
      "email": this.email,
      "phone": this.phone,
      "address": this.addres,
      "about": this.about,
      "registered": this.registered,
      "latitude": this.latitude,
      "longitude": this.longitude,
      "tags": this.tag,
      "friends": this.friend,
      "greeting": this.greeting,
      "favoriteFruit": this.favoriteFruit,
    };
  }
}

/// This is the `Friend` class
class Friend {
  int id;
  String name;

  Friend.fromJson(Map<String, dynamic> json) {
    this.id = json["id"];
    this.name = json["name"];
  }

  Map<String, dynamic> toJson() {
    return {
      "id": this.id,
      "name": this.name,
    };
  }
}
