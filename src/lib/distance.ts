import { PORTBURY } from "./constants";

export function calculateDistanceToPortburyNm(lat: number, lon: number) {
  const earthRadiusNm = 3440.065;

  const toRadians = (degrees: number) => degrees * (Math.PI / 180);

  const dLat = toRadians(PORTBURY.lat - lat);
  const dLon = toRadians(PORTBURY.lon - lon);

  const lat1 = toRadians(lat);
  const lat2 = toRadians(PORTBURY.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(earthRadiusNm * c * 10) / 10;
}
