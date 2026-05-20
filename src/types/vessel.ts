export type Vessel = {
  id: string;
  name: string;
  imo: string;
  mmsi: string;
  vesselType: string;
  flag: string;
  lat: number;
  lon: number;
  destination: string;
  eta: string;
  speed: number;
  course: number;
  heading: number;
  updatedAt: string;
};
