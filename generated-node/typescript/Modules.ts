export interface Modules {
  status: string;
  meta: Meta;
  data: Record<string, Data>;
}

export interface Meta {
  count: number;
  pageTotal: number;
  total: number;
  limit: number;
  page: number;
}

export interface Data {
  profile: Profile;
  name: string;
  image: string;
  tag: string;
  moduleIdStr: string;
  moduleId: number;
  type: string;
  priceCredit: number;
}

export interface Profile {
  torpedoes: Torpedoes;
}

export interface Torpedoes {
  torpedoSpeed: number;
  shotSpeed: number;
  maxDamage: number;
  distance: number;
}
