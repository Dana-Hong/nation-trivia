export type Currency = {
  [key: string]: {
    name: string;
    symbol: string;
  };
};
export type Country = {
  name: {
    common: string;
  };
  capital: string[];
  flags: Flags;
  region: string;
  subregion: string;
  currencies: Currency;
  population: number;
  continents: string[];
};

export type Flags = {
  png: string;
  svg: string;
  alt?: string;
};

export type Region = "AFRICA" | "AMERICAS" | "ASIA" | "EUROPE" | "OCEANIA";

export type Regions = Region[];
