import React, { useEffect, useState, useRef } from "react";
import "./App.css";

import AdhanPlanet from "./component/AdhanPlanet";
import Footer from "./component/Footer.component";

const Setup = () => {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([
    "Bekasi",
    "Jakarta",
    "Malang",
    "Merauke",
  ]);
  const [isSetup, setIsSetup] = useState(null);
  const [location, setLocation] = useState({});
  const [isToggle, setIsToggle] = useState(false);

  const toggleLocation = useRef(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleClick = (e) => {
    setIsToggle((prevState) => {
      return !prevState;
    });
  };

  useEffect(() => {
    setCity("");
    if (isToggle) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLocation((prevState) => {
          return {
            ...prevState,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        });
        toggleLocation.current.innerHTML = "Turn Off Location";
        // setIsSetup(true);
      });
    } else {
      setLocation({});
      toggleLocation.current.innerHTML = "Turn On Location";
    }
  }, [isToggle]);

  return (
    <>
      <section classaName="setup">
        <div className="section__box section__box--setup">
          <button ref={toggleLocation} className="btn" onClick={handleClick}>
            Turn On Location
          </button>
          <div className="city-selection">
            <label for="cities">Choose a City</label>
            <select
              name="cities"
              id="cities"
              onChange={handleChange}
              value={city}
            >
              <option disabled selected value="">
                Select City
              </option>

              {cities.map((city) => {
                return (
                  <option id={city} value={city}>
                    {city}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </section>
      <AdhanPlanet location={location} city={city} />
      <Footer />
    </>
  );
};

export default Setup;
