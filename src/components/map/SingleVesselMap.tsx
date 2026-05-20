"use client";

import dynamic from "next/dynamic";
import { Vessel } from "@/types/vessel";

const LeafletSingleVesselMap = dynamic(
  () => import("./LeafletSingleVesselMap"),
  {
    ssr: false,
  }
);

type Props = {
  vessel: Vessel;
};

export default function SingleVesselMap({ vessel }: Props) {
  return <LeafletSingleVesselMap vessel={vessel} />;
}
