import React, { useRef, useState, useEffect } from "react";
import { Map, Polyline, TileLayer } from "react-leaflet";
import data from "../../assets/data.json";
import Markers from "../VenueMarkers";
import FormRouteSearch from "../formRouteSearch/FormRouteSearch";
import axios from "axios";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  const [state, setState] = useState({
    currentLocation: { lat: 59.334591, lng: 18.06324 },
    zoom: 13,
    data,
  });

  const [route, setRoute] = useState({
    startPoint: "18.063240,59.334591", // [59.334591, 18.063240] Stockholm
    endPoint: "11.974560,57.708870", // [57.708870, 11.974560 ]// Gothenburg
  });

  const [input, setInput] = useState({
    cityFrom: "",
    cityTo: "",
    profile: "driving-car",
  });

  const [coordinates, setCoordinates] = useState([]);

  const [submit, setSubmit] = useState(0);

  const mapRef = useRef();

  useEffect(() => {
    const { current = {} } = mapRef;
    const { leafletElement: map } = current;

    setTimeout(() => {
      map.flyTo([state.currentLocation.lat, state.currentLocation.lng], 10, {
        duration: 2,
      });
    }, 1000);
  }, [mapRef]);

  useEffect(() => {
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      try {
        const cityFromPromise = axios.get(
          `https://api.openrouteservice.org/geocode/search?api_key=${process.env.REACT_APP_OPENSERVICEROUTE_API_KEY}&text=${input.cityFrom}`
        );

        const cityToPromise = axios.get(
          `https://api.openrouteservice.org/geocode/search?api_key=${process.env.REACT_APP_OPENSERVICEROUTE_API_KEY}&text=${input.cityTo}`
        );

        Promise.all([cityFromPromise, cityToPromise]).then(
          ([result1, result2]) => {
            if (isApiSubscribed) {
              setRoute({
                startPoint:
                  result1.data.features[0].geometry.coordinates.toString(),

                endPoint:
                  result2.data.features[0].geometry.coordinates.toString(),
              });
            }
          }
        );
      } catch (error) {
        if (isApiSubscribed) {
          return error;
        }
      }
    }

    return () => {
      // cancel the subscription
      isApiSubscribed = false;
    };
  }, [submit]);

  useEffect(() => {
    let isApiSubscribed = true;
    axios
      .get(
        `https://api.openrouteservice.org/v2/directions/${input.profile}?api_key=${process.env.REACT_APP_OPENSERVICEROUTE_API_KEY}&start=${route.startPoint}&end=${route.endPoint}`
      )
      .then((response) => {
        if (isApiSubscribed) {
          setCoordinates(
            response.data.features[0].geometry.coordinates.map((item) =>
              item.map((it) => it).reverse()
            )
          );
        }
      });
    return () => {
      // cancel the subscription
      isApiSubscribed = false;
    };
  }, [route.endPoint, route.startPoint, input.profile]);

  const limeOptions = {
    color: "lime",
  };

  return (
    <>
      <FormRouteSearch
        input={input}
        setInput={setInput}
        submit={submit}
        setSubmit={setSubmit}
      />

      <Map  ref={mapRef} center={state.currentLocation} zoom={state.zoom}>
        <Polyline
          weight={5}
          pathOptions={limeOptions}
          positions={coordinates}
        />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Markers venues={route} />
      </Map>
    </>
  );
};

export default MapView;