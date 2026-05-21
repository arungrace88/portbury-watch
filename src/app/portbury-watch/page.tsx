"use client";

import { useEffect, useState } from "react";
import { Vessel } from "@/types/vessel";

import {
  getWatchlistIds,
  removeVesselFromWatchlist,
  clearWatchlist,
} from "@/lib/watchlist";

import { calculateDistanceToPortburyNm } from "@/lib/distance";
import PortburyMap from "@/components/map/PortburyMap";

const vesselTextColors = [
  "text-blue-600",
  "text-red-600",
  "text-orange-600",
  "text-violet-600",
];

export default function PortburyWatchPage() {
  const [watchlistIds, setWatchlistIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    return getWatchlistIds();
  });

  const [allVessels, setAllVessels] = useState<Vessel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sortBy, setSortBy] = useState<"distance" | "eta" | "name">(
    "distance"
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadVessels() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/vessels", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load vessels");
        }

        const data: { vessels: Vessel[] } = await response.json();

        setAllVessels(data.vessels);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setError("Unable to load your Portbury Watch vessels.");
      } finally {
        setIsLoading(false);
      }
    }

    loadVessels();

    return () => {
      controller.abort();
    };
  }, []);

  const watchlistVessels = allVessels.filter((vessel) =>
    watchlistIds.includes(vessel.id)
  );

  function handleRemove(vesselId: string) {
    removeVesselFromWatchlist(vesselId);

    setWatchlistIds((current) =>
      current.filter((id) => id !== vesselId)
    );
  }

  function handleClearWatchlist() {
    clearWatchlist();
    setWatchlistIds([]);
  }

  const sortedVessels = [...watchlistVessels].sort((a, b) => {
    if (sortBy === "distance") {
      return (
        calculateDistanceToPortburyNm(a.lat, a.lon) -
        calculateDistanceToPortburyNm(b.lat, b.lon)
      );
    }

    if (sortBy === "eta") {
      return new Date(a.eta).getTime() - new Date(b.eta).getTime();
    }

    return a.name.localeCompare(b.name);
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">Portbury Watch</h1>

      <p className="text-gray-600 mb-6">
        Your selected vessels shown relative to Portbury.
      </p>

      {isLoading && (
        <div className="rounded-lg border p-6 text-gray-600">
          Loading Portbury Watch...
        </div>
      )}

      {error && !isLoading && (
        <div className="rounded-lg border p-6 text-red-600">
          {error}
        </div>
      )}

      {!isLoading && !error && watchlistVessels.length > 0 && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-gray-600">
            {watchlistVessels.length} vessel
            {watchlistVessels.length === 1 ? "" : "s"} in watchlist
          </div>

          <button
            onClick={handleClearWatchlist}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Clear Watchlist
          </button>
        </div>
      )}

      {!isLoading && !error && watchlistVessels.length > 0 && (
        <div className="mb-6 flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">
            Sort by:
          </label>

          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as "distance" | "eta" | "name")
            }
            className="rounded-lg border px-3 py-2"
          >
            <option value="distance">Distance to Portbury</option>
            <option value="eta">ETA</option>
            <option value="name">Vessel name</option>
          </select>
        </div>
      )}

      {!isLoading && !error && watchlistVessels.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-lg font-semibold mb-2">
            No vessels in Portbury Watch yet
          </h2>

          <p className="text-gray-600 mb-4">
            Search for vessels and add them here to compare their location
            relative to Portbury.
          </p>

          <a
            href="/search"
            className="inline-flex rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Go to Vessel Search
          </a>
        </div>
      )}

      {!isLoading && !error && watchlistVessels.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-1 space-y-3">
            {sortedVessels.map((vessel, index) => {
              const distance = calculateDistanceToPortburyNm(
                vessel.lat,
                vessel.lon
              );

              return (
                <div key={vessel.id} className="border rounded-lg p-4">
                  <div
                    className={`font-semibold ${
                      vesselTextColors[index % vesselTextColors.length]
                    }`}
                  >
                    {vessel.name}
                  </div>

                  <div className="text-sm text-gray-600">
                    Destination: {vessel.destination}
                  </div>

                  <div className="text-sm text-gray-600">
                    ETA:{" "}
                    {new Date(vessel.eta).toLocaleString("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>

                  <div className="text-sm text-gray-600">
                    Distance to Portbury: {distance} nm
                  </div>

                  <button
                    onClick={() => handleRemove(vessel.id)}
                    className="mt-3 rounded-lg border px-3 py-2 hover:bg-gray-50"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </section>

          <section className="lg:col-span-2">
            <PortburyMap vessels={sortedVessels} />
          </section>
        </div>
      )}
    </main>
  );
}