import L from "leaflet";

export const VenueLocationIconStart = L.icon({
  iconUrl: require("../assets/venue_location_icon_start.svg"),
  iconRetinaUrl: require("../assets/venue_location_icon_start.svg"),
  iconAnchor: null,
  popupAnchor: [0, -15],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});

export const VenueLocationIconEnd = L.icon({
  iconUrl: require("../assets/venue_location_icon_end.svg"),
  iconRetinaUrl: require("../assets/venue_location_icon_end.svg"),
  iconAnchor: null,
  popupAnchor: [0, -15],
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});