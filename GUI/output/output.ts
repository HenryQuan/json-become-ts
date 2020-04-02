/** This is the `Output` class */
class Output {
  id: string;
  index: number;
  guid: string;
  isActive: boolean;
  balance: string;
  picture: string;
  age: number;
  eyeColor: string;
  name: string;
  gender: string;
  company: string;
  email: string;
  phone: string;
  addres: string;
  about: string;
  registered: string;
  latitude: number;
  longitude: number;
  tag: string[];
  friend: Friend[];
  greeting: string;
  favoriteFruit: string;

  constructor(json) {
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
}

/** This is the `Friend` class */
class Friend {
  id: number;
  name: string;

  constructor(json) {
    this.id = json["id"];
    this.name = json["name"];
  }
}
