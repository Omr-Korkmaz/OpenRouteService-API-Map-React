import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './home.css'
import { BsFillArrowRightCircleFill } from "react-icons/bs";



const Home = () => {
  const [state, setState] = useState({
    longitude: 0,
    latitude: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  return (
    <div className="home-container" >
      <div className="home-container__info" >
      <h1 className="home-container__info__title" >Geolocation</h1>
      <div className= "home-container__info_coord" >

      <p>Latitude: {state.latitude}</p>
      <p>longitude: {state.longitude}</p>
      </div>
      <Link className="home-container__info__link"
        to={{
          pathname: "/map",
      
            state,
          }}
          >
<h2>See Map </h2>
<BsFillArrowRightCircleFill />

     
      </Link>
            </div>
    </div>
  );
};

export default Home;