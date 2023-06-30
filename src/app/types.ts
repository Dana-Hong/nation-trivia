export type Country = {
  name: {
    common: string;
  };
  flags: Flags;
  region: string;
  subregion: string;
};

export type Flags = {
  png: string;
  svg: string;
  alt?: string;
};

export type Region = "AFRICA" | "AMERICAS" | "ASIA" | "EUROPE" | "OCEANIA";

export type Regions = Region[];