"use client";

import { useMemo, useState } from "react";
import { vessels } from "@/data/mockVessels";
import { Vessel } from "@/types/vessel";
import { calculateDistanceToPortburyNm } from "@/lib/distance";
import SingleVesselMap from "@/components/map/SingleVesselMap";
import {
  addVesselToWatchlist,
  getWatchlistIds,
} from "@/lib/watchlist";


export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);

  const filteredVessels = useMemo(() => {
    if (!query.trim()) {
      return [];
    }

    const searchTerm = query.toLowerCase();

    return vessels.filter((vessel) => {
      return (
        vessel.name.toLowerCase().includes(searchTerm) ||
        vessel.imo.includes(searchTerm) ||
        vessel.mmsi.includes(searchTerm)
      );
    });
  }, [query]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">Vessel Search</h1>

      <p className="text-gray-600 mb-6">
        Search by vessel name, IMO, or MMSI.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SIDE */}
        <section className="lg:col-span-1">

          <input
            className="w-full border rounded-lg px-4 py-3 mb-4"
            placeholder="Search vessel..."

            value={query}

            onChange={(event) => {
  const value = event.target.value;

  setQuery(value);

  if (!value.trim()) {
    setSelectedVessel(null);
  }
}}




          />

          <div className="space-y-3">

            {query.trim() && filteredVessels.length === 0 && (
              <div className="border rounded-lg p-4 text-gray-500">
                No vessels found.
              </div>
            )}

            {filteredVessels.map((vessel) => (
              <button
                key={vessel.id}
                onClick={() => setSelectedVessel(vessel)}
                className={`w-full text-left border rounded-lg p-4 hover:bg-gray-50 ${
                  selectedVessel?.id === vessel.id
                    ? "border-blue-500 bg-blue-50"
                    : ""
                }`}
              >
                <div className="font-semibold">
                  {vessel.name}
                </div>

                <div className="text-sm text-gray-600">
                  {vessel.vesselType}
                </div>

                <div className="text-sm text-gray-600">
                  Destination: {vessel.destination}
                </div>

              </button>
            ))}

          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="lg:col-span-2">

          {selectedVessel && (
  <VesselDetails vessel={selectedVessel} />
)}

        </section>

      </div>
    </main>
  );
}

function VesselDetails({ vessel }: { vessel: Vessel }) {

    
  const [isInWatchlist, setIsInWatchlist] = useState(() => {
  if (typeof window === "undefined") return false;
  return getWatchlistIds().includes(vessel.id);
});
  
  
  
  const distance = calculateDistanceToPortburyNm(
    vessel.lat,
    vessel.lon
  );
  

function handleAddToWatchlist() {
  addVesselToWatchlist(vessel.id);
  setIsInWatchlist(true);
}


  return (
    <div className="border rounded-lg p-6">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          {vessel.name}
        </h2>

        <p className="text-gray-600">
          {vessel.vesselType}        </p>
 
     </div>

<button
  onClick={handleAddToWatchlist}
  disabled={isInWatchlist}
  className={`mb-6 rounded-lg px-4 py-2 text-white ${
    isInWatchlist
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {isInWatchlist ? "Already in Portbury Watch" : "Add to Portbury Watch"}
</button>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Detail label="IMO" value={vessel.imo} />

        <Detail label="MMSI" value={vessel.mmsi} />

        <Detail label="Flag" value={vessel.flag} />

        <Detail
          label="Destination"
          value={vessel.destination}
        />

        <Detail
          label="ETA"
          value={formatDate(vessel.eta)}
        />

        <Detail
          label="Speed"
          value={`${vessel.speed} knots`}
        />

        <Detail
          label="Course"
          value={`${vessel.course}°`}
        />

        <Detail
          label="Heading"
          value={`${vessel.heading}°`}
        />

        <Detail
          label="Latitude"
          value={vessel.lat.toString()}
        />

        <Detail
          label="Longitude"
          value={vessel.lon.toString()}
        />

        <Detail
          label="Distance to Portbury"
          value={`${distance} nm`}
        />

        <Detail
          label="Last Updated"
          value={formatDate(vessel.updatedAt)}
        />

      </div>

<SingleVesselMap vessel={vessel} />

    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">

      <div className="text-sm text-gray-500">
        {label}
      </div>

      <div className="font-medium">
        {value}
      </div>

    </div>
  );
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
