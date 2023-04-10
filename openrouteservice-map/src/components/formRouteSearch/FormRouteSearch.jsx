import React from "react";
import "./formRouteSearch.css";
import { FaCarSide, FaWalking, FaBicycle } from "react-icons/fa";
import { BsArrowDownUp } from "react-icons/bs";
import { MdLocationOn, MdOutlineMyLocation } from "react-icons/md";

import { useState } from "react";
import { useRef } from "react";

const FormRouteSearch = ({ input, setInput, submit, setSubmit }) => {
  const inputStartPoint = useRef(null);
  const inputEndPoint = useRef(null);

  const [selected, setSelected] = useState("driving-car");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event, param) => {
    event.preventDefault();
    setSubmit((prev) => prev + 1);

    console.log(submit);

    setSelected(param);
    input.profile = param;

    console.log("submit FORM");
    console.log(param);
    console.log(input.profile);
  };

  const onExchange = () => {
    const buffer = inputStartPoint.current.value;

    setInput((prevNote) => {
      return {
        ...prevNote,
        cityFrom: inputEndPoint.current.value,
        cityTo: buffer,
      };
    });
  };

  return (
    <div className="container">
      <div className="container-profile">
        <FaCarSide
          data-testid="element-car-icon"
          onClick={(event) => handleSubmit(event, "driving-car")}
          className={
            selected === "driving-car"
              ? "container-profile__icon container-profile__icon--active"
              : "container-profile__icon"
          }
        />
        <FaWalking
          onClick={(event) => handleSubmit(event, "foot-walking")}
          className={
            selected === "foot-walking"
              ? "container-profile__icon container-profile__icon--active"
              : "container-profile__icon"
          }
        />
        <FaBicycle
          onClick={(event) => handleSubmit(event, "cycling-regular")}
          className={
            selected === "cycling-regular"
              ? "container-profile__icon container-profile__icon--active"
              : "container-profile__icon"
          }
        />
      </div>
      <hr style={{ width: "100%", margin: "10px 0" }} />
      <form className="container__form" onSubmit={handleSubmit}>
        <div className="container__form__input-area">
          <div className="form__input">
            <MdLocationOn style={{ color: "gray", fontSize: "1.5em" }} />
            <input
              type="text"
              ref={inputStartPoint}
              style={{ width: 400 }}
              label="City Name From:"
              value={input.cityFrom}
              onChange={handleChange}
              name="cityFrom"
              required
              placeholder="From: CITY NAME"
            />
          </div>
          <div className="form__input">
            <MdOutlineMyLocation
              style={{ color: "darkblue", fontSize: "1.5em" }}
            />

            <input
              value={input.cityTo}
              style={{ width: 400 }}
              label="City Name To:"
              onChange={handleChange}
              name="cityTo"
              required
              ref={inputEndPoint}
              placeholder="To: CITY NAME"
              type="text"
            />
          </div>
        </div>
        <BsArrowDownUp
          data-testid="custom-element"
          className="container__form__exchange"
          onClick={onExchange}
        />
      </form>
    </div>
  );
};

export default FormRouteSearch;