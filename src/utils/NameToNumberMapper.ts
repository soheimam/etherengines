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
