export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: Currency[];
  languages: Language[];
  translations: Translations;
  flag: string;
  regionalBlocs: RegionalBloc[];
  cioc: string;
}

interface RegionalBloc {
  acronym: string;
  name: string;
  otherAcronyms: any[];
  otherNames: any[];
}

interface Translations {
  de: string;
  es: string;
  fr: string;
  ja: string;
  it: string;
  br: string;
  pt: string;
  nl: string;
  hr: string;
  fa: string;
}

interface Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface GameCountry {
  flag?: string;
  name?: string;
  capital?: string;
}

export interface MyPlace {
  id?: string;
  lat?: number;
  lng?: number;
  title?: string;
  desc?: string;
  note?: number;
  date?: Date;
  images?: MyImage[];
}

export interface MyImage {
  name?: string;
  filepath?: string;
  size?: number;
}

export interface User {
  _id?: string;
  name?: string;
  lastName?: string;
  userName?: string;
  password?: string;
  country?: string;
  img?: string;
}