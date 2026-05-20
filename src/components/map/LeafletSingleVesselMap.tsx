"use client";

import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Vessel } from "@/types/vessel";


delete (
  L.Icon.Default.prototype as L.Icon.Default & {
    _getIconUrl?: unknown;
  }
)._getIconUrl;


L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Props = {
  vessel: Vessel;
};

export default function LeafletSingleVesselMap({ vessel }: Props) {
  return (
    <div className="mt-6 rounded-lg overflow-hidden border">
      <MapContainer
        center={[vessel.lat, vessel.lon]}
        zoom={7}
        scrollWheelZoom={true}
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[vessel.lat, vessel.lon]}>
          <Popup>
            <div>
              <div className="font-semibold">{vessel.name}</div>
              <div>Destination: {vessel.destination}</div>
              <div>Speed: {vessel.speed} knots</div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
