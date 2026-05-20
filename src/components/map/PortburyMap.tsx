"use client";

import dynamic from "next/dynamic";
import { Vessel } from "@/types/vessel";

const LeafletPortburyMap = dynamic(
  () => import("./LeafletPortburyMap"),
  {
    ssr: false,
  }
);

type Props = {
  vessels: Vessel[];
};

export default function PortburyMap({ vessels }: Props) {
  return <LeafletPortburyMap vessels={vessels} />;
}
