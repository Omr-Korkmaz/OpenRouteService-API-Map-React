import React from "react";
import { Popup } from "react-leaflet";

const MarkerPopup = ({ data }) => {
  return (
    <Popup>
      <div>{data}</div>
    </Popup>
  );
};

export default MarkerPopup;