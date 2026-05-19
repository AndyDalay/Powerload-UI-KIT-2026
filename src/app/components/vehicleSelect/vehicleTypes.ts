// ─── Vehicle/SVG — asset paths + human-readable labels (Powerload UI Kit) ───

import trailerCoilWell from "@/assets/vehicles/trailer-coil-well.svg";
import trailerCurtainSide from "@/assets/vehicles/trailer-curtain-side.svg";
import trailerDoubleDeck from "@/assets/vehicles/trailer-double-deck.svg";
import trailerDryVan from "@/assets/vehicles/trailer-dry-van.svg";
import trailerFlatbed from "@/assets/vehicles/trailer-flatbed.svg";
import trailerMegaCurtainSide from "@/assets/vehicles/trailer-mega-curtain-side.svg";
import trailerPaperTransport from "@/assets/vehicles/trailer-paper-transport.svg";
import trailerRefrigeratedReefer from "@/assets/vehicles/trailer-refrigerated-reefer.svg";
import truckCarTransporter from "@/assets/vehicles/truck-car-transporter.svg";
import truckHeadAdjustableFifthWheel from "@/assets/vehicles/truck-head-adjustable-fifth-wheel.svg";
import truckHeadMega from "@/assets/vehicles/truck-head-mega.svg";
import truckHeadStandard from "@/assets/vehicles/truck-head-standard.svg";
import truckHeadThreeAxle from "@/assets/vehicles/truck-head-three-axle.svg";
import truckRigidBody from "@/assets/vehicles/truck-rigid-body.svg";
import truckRoadTrainJumbo from "@/assets/vehicles/truck-road-train-jumbo.svg";
import truckTanker from "@/assets/vehicles/truck-tanker.svg";
import vanDelivery from "@/assets/vehicles/van-delivery.svg";

export type VehicleTypeId = (typeof VEHICLE_OPTIONS)[number]["id"];

export interface VehicleOption {
  id: VehicleTypeId;
  label: string;
  src: string;
}

/** Ordered catalog for Input/VehicleSelect (matches asset filenames). */
export const VEHICLE_OPTIONS: readonly VehicleOption[] = [
  { id: "trailer-coil-well", label: "Remolque porta-bobinas", src: trailerCoilWell },
  { id: "trailer-curtain-side", label: "Remolque de lona (Sider)", src: trailerCurtainSide },
  { id: "trailer-double-deck", label: "Remolque de doble piso", src: trailerDoubleDeck },
  { id: "trailer-dry-van", label: "Remolque furgón seco", src: trailerDryVan },
  { id: "trailer-flatbed", label: "Remolque plataforma", src: trailerFlatbed },
  { id: "trailer-mega-curtain-side", label: "Remolque mega de lona", src: trailerMegaCurtainSide },
  { id: "trailer-paper-transport", label: "Remolque porta-papel", src: trailerPaperTransport },
  { id: "trailer-refrigerated-reefer", label: "Remolque frigorífico (Reefer)", src: trailerRefrigeratedReefer },
  { id: "truck-car-transporter", label: "Camión portavehículos", src: truckCarTransporter },
  {
    id: "truck-head-adjustable-fifth-wheel",
    label: "Cabeza tractora (Quinta rueda ajustable)",
    src: truckHeadAdjustableFifthWheel,
  },
  { id: "truck-head-mega", label: "Cabeza tractora mega", src: truckHeadMega },
  { id: "truck-head-standard", label: "Cabeza tractora estándar", src: truckHeadStandard },
  { id: "truck-head-three-axle", label: "Cabeza tractora de tres ejes", src: truckHeadThreeAxle },
  { id: "truck-rigid-body", label: "Camión rígido", src: truckRigidBody },
  { id: "truck-road-train-jumbo", label: "Tren de carretera jumbo", src: truckRoadTrainJumbo },
  { id: "truck-tanker", label: "Camión cisterna", src: truckTanker },
  { id: "van-delivery", label: "Furgoneta de reparto", src: vanDelivery },
] as const;

export function getVehicleById(id: VehicleTypeId | string | undefined): VehicleOption | undefined {
  return VEHICLE_OPTIONS.find((v) => v.id === id);
}
