const TrackMap = new Map<number, any>();
TrackMap.set(1, { name: "Melbourne", country: "AU", filename: "track_1" });
TrackMap.set(2, { name: "Singapore", country: "SG", filename: "track_2" });
TrackMap.set(3, { name: "Austria", country: "XX", filename: "track_3" });
TrackMap.set(4, { name: "Miami", country: "US", filename: "track_4" });
TrackMap.set(5, { name: "Abu Dhabi", country: "XX", filename: "track_5" });
TrackMap.set(6, { name: "Canada", country: "CA", filename: "track_6" });
TrackMap.set(7, {
  name: "The Netherlands",
  country: "NL",
  filename: "track_7",
});
TrackMap.set(8, { name: "France", country: "FR", filename: "track_8" });
TrackMap.set(9, { name: "Spain", country: "ES", filename: "track_9" });
TrackMap.set(10, { name: "Silverstone", country: "GB", filename: "track_10" });
TrackMap.set(11, { name: "Azerbaijan", country: "XX", filename: "track_11" });

interface APIPayload {
  tokenId: string;
  visibility: string;
  projectId: string;
  traits: Trait[];
}

interface Trait {
  trait_type: string;
  value: string;
}

export const trackFetcher = (trackNumber: number) => {
  return TrackMap.get(trackNumber);
};

export const driverArray = () => {
  const drivers = [
    "Verstappen",
    "Checo",
    "Alsonso",
    "Hamilton",
    "Sainz",
    "Leclerc",
    "Russel",
    "Stroll",
    "Ocon",
    "Norris",
    "Gasly",
    "Hulkenberg",
    "Albon",
    "Piastri",
    "Bottas",
    "Zhou",
    "Tsunoda",
    "Magnussen",
    "Sargent",
    "Devries",
  ];

  return drivers;
};

export const teamArray = () => {
  const cars = [
    "Red Bull",
    "Ferrari",
    "Aston Martin",
    "Mercedes",
    "Alpine",
    "Mclaren",
    "Haas",
    "Williams",
    "Alfa Romeo",
    "Alpha Tauri",
  ];
  return cars;
};

export const getDriverNameFromNumber = (driverNumber: number) => {
  const drivers = driverArray();
  return drivers[driverNumber];
};

export const getTeamNameFromNumber = (teamNumber: number) => {
  const teams = teamArray();
  return teams[teamNumber];
};

export const toMetafuseUrl = (id: string) => {
  const url = `https://api.metafuse.me/assets/metafuse/${id}.png`;
  return url;
};

export const toTokenUri = (id: string | number) => {
  const url = `https://api.metafuse.me/assets/3ac14127-abd6-43ef-be99-c9fc635088cf/${id}.json`;
  return url;
};

interface MetafuseCreatePayload {
  tokenId: number;
  mainDriver: string;
  secondaryDriver: string;
  team: string;
}

export const createDigitalAsset = async (payload: APIPayload) => {
  let metafuseHeaders = new Headers({
    Authorization: "5bcd940e-a02f-4b27-a054-6f8932bdb25e" as string,
  });
  const res = await fetch(process.env.METAFUSE_ITEMS_GATEWAY as string, {
    method: "POST",
    headers: metafuseHeaders,
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  return data;
};

export const createMetafuseCreatePayload = ({
  tokenId,
  mainDriver,
  secondaryDriver,
  team,
}: MetafuseCreatePayload): APIPayload => {
  return {
    tokenId: tokenId.toString(),
    visibility: "PUBLIC",
    projectId: process.env.METAFUSE_PROJECT_ID as string,
    traits: [
      {
        trait_type: "Main Driver",
        value: mainDriver,
      },
      {
        trait_type: "Main Driver Name",
        value: mainDriver,
      },
      {
        trait_type: "Secondary Driver",
        value: secondaryDriver,
      },
      {
        trait_type: "Secondary Driver Name",
        value: secondaryDriver,
      },
      {
        trait_type: "Team",
        value: team,
      },
    ],
  };
};

import { CloudIcon, SunIcon } from "@heroicons/react/24/solid";

export const weatherArray = () => {
  const weather = ["Cloudy", "Sunny", "Cloudy", "Storm"];
  return weather;
};
