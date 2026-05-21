import { Vessel } from "@/types/vessel";

type VesselWithDistance = Vessel & {
  distanceToPortburyNm: number;
};

async function getVesselsNearPortbury() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/vessels/near-portbury`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch vessels near Portbury");
  }

  const data: { vessels: VesselWithDistance[] } = await response.json();

  return data.vessels;
}

export default async function Home() {
  const vessels = await getVesselsNearPortbury();

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold mb-4">Portbury Watch</h1>

      <p className="mb-6">Vessels loaded: {vessels.length}</p>

      <div className="space-y-3">
        {vessels.map((vessel) => (
          <div key={vessel.id} className="border rounded p-4">
            <h2 className="font-semibold">{vessel.name}</h2>

            <p>Destination: {vessel.destination}</p>

            <p>
              Distance to Portbury:{" "}
              {vessel.distanceToPortburyNm.toFixed(1)} nm
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}