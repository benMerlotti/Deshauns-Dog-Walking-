import { getCities, getDogs, getGreeting, getWalkers } from "./apiManager";
import { useEffect, useState } from "react";
import "./Home.css";

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });

  const [allDogs, setAllDogs] = useState([]);
  const [allWalkers, setAllWalkers] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [selectedDogDetails, setSelectedDogDetails] = useState(null);

  useEffect(() => {
    getWalkers()
      .then(setAllWalkers)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  useEffect(() => {
    getCities()
      .then(setAllCities)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  useEffect(() => {
    getDogs()
      .then(setAllDogs)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  const viewDogDetails = (d) => {
    const matchedWalker = allWalkers.find((w) => w.id === d.walkerId);
    const matchedCity = allCities.find((c) => c.id === d.cityId);
    setSelectedDogDetails({
      dogName: d.name,
      walkerName: matchedWalker ? matchedWalker.name : "Unknown walker",
      cityName: matchedCity ? matchedCity.name : "Unknown city",
    });
  };

  return (
    <div>
      <p>{greeting.message}</p>
      <div className="dog-list">
        {allDogs.map((d) => {
          return (
            <li
              className="dog-list-item"
              key={d.id}
              onClick={() => viewDogDetails(d)}
            >
              {d.name}
            </li>
          );
        })}
      </div>
      {selectedDogDetails && (
        <div className="dog-details">
          <h2>Dog Details</h2>
          <p>
            <strong>Dog:</strong>
            {selectedDogDetails.dogName}
          </p>
          <p>
            <strong>Walker:</strong>
            {selectedDogDetails.walkerName}
          </p>
          <p>
            <strong>City:</strong>
            {selectedDogDetails.cityName}
          </p>
        </div>
      )}
    </div>
  );
}
