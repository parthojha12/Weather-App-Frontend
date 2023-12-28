import React, { useState } from "react";
import "./CityInputComponent.css";

const CityInputComponent = ({ onAddCity }) => {
  const [city, setCity] = useState("");

  const handleAddCity = () => {
    onAddCity(city);
    setCity("");
  };

  return (
    <div className="cityAddSection">
      <input
        className="btn"
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button className="btn" onClick={handleAddCity}>
        {" "}
        +{" "}
      </button>
    </div>
  );
};

export default CityInputComponent;
