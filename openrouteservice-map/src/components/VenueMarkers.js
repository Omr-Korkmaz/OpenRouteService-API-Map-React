import React from "react";
import { Marker } from "react-leaflet";
import { VenueLocationIconStart } from "./VenueLocationIcon";
import { VenueLocationIconEnd } from "./VenueLocationIcon";
import MarkerPopup from "./MarkerPopup.js";

const VenueMarkers = (props) => {
  const { venues } = props;

  const locationMarkerStart = venues.startPoint
    .split(",")
    .map(Number)
    .reverse();
  const locationMarkerEnd = venues.endPoint.split(",").map(Number).reverse();

  return (
    <div>
      <Marker position={locationMarkerStart} icon={VenueLocationIconStart}>
        <MarkerPopup data={locationMarkerStart} />
      </Marker>
      <Marker position={locationMarkerEnd} icon={VenueLocationIconEnd}>
        <MarkerPopup data={locationMarkerEnd} />
      </Marker>
    </div>
  );
};

export default VenueMarkers;