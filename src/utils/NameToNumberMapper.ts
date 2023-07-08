const TrackMap = new Map<number, any>();
TrackMap.set(1, { name: "Melbourne", country: "AU", filename: "track_1" });
TrackMap.set(2, { name: "Singapore", country: "SG", filename: "track_2" });
TrackMap.set(3, { name: "Austria", country: "XX", filename: "track_3" });
TrackMap.set(4, { name: "Miami", country: "US", filename: "track_4" });
TrackMap.set(5, { name: "Abu Dhabi", country: "XX", filename: "track_5" });
TrackMap.set(6, { name: "Canada", country: "CA", filename: "track_6" });
TrackMap.set(7, { name: "The Netherlands", country: "NL", filename: "track_7" });
TrackMap.set(8, { name: "France", country: "FR", filename: "track_8" });
TrackMap.set(9, { name: "Spain", country: "ES", filename: "track_9" });
TrackMap.set(10,{ name:  "Silverstone", country: "GB", filename: "track_10" });
TrackMap.set(11,{ name:  "Azerbaijan", country: "XX", filename: "track_11" });

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
