const TrackMap = new Map<number, string>();
TrackMap.set(1, "Melbourne");
TrackMap.set(2, "Singapore");
TrackMap.set(3, "Austria");
TrackMap.set(4, "Miami");
TrackMap.set(5, "Abu Dhabi");
TrackMap.set(6, "Canada");
TrackMap.set(7, "The Netherlands");
TrackMap.set(8, "France");
TrackMap.set(9, "Spain");
TrackMap.set(10, "Silverstone");
TrackMap.set(11, "Azerbaijan");

export const trackFetcher = (trackNumber: number) => {
  return TrackMap.get(trackNumber);
};

export const driverArray = () => {
  const drivers = [
    "Verstappen",
    "Checo",
    "Hamilton",
    "Russel",
    "Leclerc",
    "Sainz",
    "Alsonso",
    "Stroll",
    "Tsunoda",
    "Devries",
    "Sargent",
    "Albon",
    "Bottas",
    "Zhou",
    "Piastri",
    "Norris",
    "Gasly",
    "Ocon",
    "Hulkenberg",
    "Magnussen",
  ];

  return drivers;
};

export const teamArray = () => {
  const cars = [
    "Red Bull",
    "Mercades",
    "Mclaren",
    "Ferrari",
    "Williams",
    "Alpha Tauri",
    "Alfa Romeo",
    "Aston Martin",
    "Alpine",
    "Haas",
  ];
  return cars;
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

export const createDigitalAsset = async (payload: MetafuseCreatePayload) => {
  let metafuseHeaders = new Headers({
    Authorization: process.env.METAFUSE_API_KEY as string,
  });
  const res = await fetch(process.env.METAFUSE_ITEMS_GATEWAY as string, {
    method: "POST",
    headers: metafuseHeaders,
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  console.log(data);
  return data;
};

export const createMetafuseCreatePayload = ({
  tokenId,
  mainDriver,
  secondaryDriver,
  team,
}: MetafuseCreatePayload) => {
  return {
    tokenId: tokenId,
    visibility: "PUBLIC",
    projectId: process.env.METAFUSE_PROJECT_ID,
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
