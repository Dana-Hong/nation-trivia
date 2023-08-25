import {
  searchCountryByName,
  sortCountries,
  sortCountriesAlphabetic,
  filterCountriesByContinent,
} from "@/app/utils";
import { Country } from "@/app/types";

const mockCountries = [
  {
    name: {
      common: "Zimbabwe",
    },
    continents: ["Africa"],
  },
  {
    name: {
      common: "Canada",
    },
    continents: ["North America"],
  },
  {
    name: {
      common: "Argentina",
    },
    continents: ["South America"],
  },
];

describe("sortCountries", () => {
  it("sorts countries based on provided state (e.g nameAsc)", () => {
    expect(sortCountries(mockCountries as Country[], "nameAsc")).toStrictEqual([
      {
        name: {
          common: "Argentina",
        },
        continents: ["South America"],
      },
      {
        name: {
          common: "Canada",
        },
        continents: ["North America"],
      },
      {
        name: {
          common: "Zimbabwe",
        },
        continents: ["Africa"],
      },
    ]);
  });

  it("sorts countries based on provided state (e.g. nameDesc)", () => {
    expect(sortCountries(mockCountries as Country[], "nameDesc")).toStrictEqual([
      {
        name: {
          common: "Zimbabwe",
        },
        continents: ["Africa"],
      },
      {
        name: {
          common: "Canada",
        },
        continents: ["North America"],
      },
      {
        name: {
          common: "Argentina",
        },
        continents: ["South America"],
      },
    ]);
  });
});

describe("search country by name", () => {
  it("returns a list of countries that match the input", () => {
    expect(searchCountryByName(mockCountries as Country[], "Zimba")).toStrictEqual([
      {
        name: {
          common: "Zimbabwe",
        },
        continents: ["Africa"],
      },
    ]);
  });
});

describe("sortCountriesAlphabetic", () => {
  it("sorts countries alphabetically (ascending)", () => {
    expect(sortCountriesAlphabetic(mockCountries as Country[], true)).toStrictEqual([
      {
        name: {
          common: "Argentina",
        },
        continents: ["South America"],
      },
      {
        name: {
          common: "Canada",
        },
        continents: ["North America"],
      },
      {
        name: {
          common: "Zimbabwe",
        },
        continents: ["Africa"],
      },
    ]);
  });

  it("sorts countries alphabetically (descending)", () => {
    expect(sortCountriesAlphabetic(mockCountries as Country[], false)).toStrictEqual([
      {
        name: {
          common: "Zimbabwe",
        },
        continents: ["Africa"],
      },
      {
        name: {
          common: "Canada",
        },
        continents: ["North America"],
      },
      {
        name: {
          common: "Argentina",
        },
        continents: ["South America"],
      },
    ]);
  });
});

const mockContinentsAll = {
  all: true,
  Antarctica: false,
  Africa: false,
  Asia: false,
  Europe: false,
  "North America": false,
  Oceania: false,
  "South America": false,
};

const mockContinents = {
  all: false,
  Antarctica: false,
  Africa: true,
  Asia: false,
  Europe: false,
  "North America": true,
  Oceania: false,
  "South America": false,
};

describe("filterCountriesByContinent", () => {
  it("displays all countries if all is selected", () => {
    expect(filterCountriesByContinent(mockCountries as Country[], mockContinentsAll)).toStrictEqual(
      [
        {
          name: {
            common: "Zimbabwe",
          },
          continents: ["Africa"],
        },
        {
          name: {
            common: "Canada",
          },
          continents: ["North America"],
        },
        {
          name: {
            common: "Argentina",
          },
          continents: ["South America"],
        },
      ]
    );
  });
  it("filters out countries not belonging to the selected continents", () => {
    expect(filterCountriesByContinent(mockCountries as Country[], mockContinents)).toStrictEqual([
      {
        name: {
          common: "Zimbabwe",
        },
        continents: ["Africa"],
      },
      {
        name: {
          common: "Canada",
        },
        continents: ["North America"],
      },
    ]);
  });
});
