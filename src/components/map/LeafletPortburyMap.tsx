"use client";

import L from "leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
} from "react-leaflet";

import { useEffect, useRef } from "react";





import { Vessel } from "@/types/vessel";
import { PORTBURY } from "@/lib/constants";
import { calculateDistanceToPortburyNm } from "@/lib/distance";

const greenPortIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const vesselIcons = [
  new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),

  new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),

  new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),

  new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  }),
];

type Props = {
  vessels: Vessel[];
};

export default function LeafletPortburyMap({ vessels }: Props) {
 
 const portburyMarkerRef = useRef<L.Marker>(null);
 
   useEffect(() => {
    if (portburyMarkerRef.current) {
      portburyMarkerRef.current.openPopup();
    }
  }, []);
 
  return (
    <div className="rounded-lg overflow-hidden border">
      <MapContainer
        center={[PORTBURY.lat, PORTBURY.lon]}
        zoom={7}
        scrollWheelZoom={true}
        style={{
          height: "600px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


<Marker
  position={[PORTBURY.lat, PORTBURY.lon]}
  icon={greenPortIcon}
  ref={portburyMarkerRef}
>



  <Popup autoClose={false} closeOnClick={false}>
    <div>
      <div className="font-semibold">
        Portbury Port
      </div>
    </div>
  </Popup>
</Marker>      
        
        

        {vessels.map((vessel, index) => {
          const distance = calculateDistanceToPortburyNm(
            vessel.lat,
            vessel.lon
          );

          return (
            <div key={vessel.id}>             
              <Marker
  position={[vessel.lat, vessel.lon]}
  icon={vesselIcons[index % vesselIcons.length]}
>
              
              
              
                <Popup>
                  <div>
                    <div className="font-semibold">{vessel.name}</div>
                    <div>Destination: {vessel.destination}</div>
                    <div>ETA: {new Date(vessel.eta).toLocaleString("en-GB")}</div>
                    <div>Distance: {distance} nm</div>
                  </div>
                </Popup>
              </Marker>

            </div>
          );
        })}
      </MapContainer>
    </div>
  );
}
