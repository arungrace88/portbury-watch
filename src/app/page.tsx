import { vessels } from "@/data/mockVessels";
import { calculateDistanceToPortburyNm } from "@/lib/distance";

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">Vessel Tracker MVP</h1>

      <p className="mb-6">
        Mock vessels loaded: {vessels.length}
      </p>

      <div className="space-y-3">
      {vessels.map((vessel) => (
          <div key={vessel.id} className="border rounded p-4">
            <h2 className="font-semibold">{vessel.name}</h2>
            <p>Destination: {vessel.destination}</p>
            <p>
              Distance to Portbury:{" "}
              {calculateDistanceToPortburyNm(vessel.lat, vessel.lon)} nm
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
