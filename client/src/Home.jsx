import {
  getCities,
  getDogs,
  getGreeting,
  getWalkers,
  postDog,
} from "./apiManager";
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
  const [newDogName, setNewDogName] = useState("");
  const [userAddedDog, setUserAddedDog] = useState(false);

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

  const userAddsDog = () => {
    setUserAddedDog(true);
  };

  const handleDogNameInputChange = (e) => {
    setNewDogName(e.target.value);
  };

  const postNewDog = async () => {
    const newDog = {
      name: newDogName,
      walkerId: null,
      cityId: null,
    };

    try {
      const addedDog = await postDog(newDog);
      if (addedDog) {
        setAllDogs([...allDogs, addedDog]); // Add the new dog to the state
        setUserAddedDog(false); // Hide input form
        setNewDogName(""); // Clear input fields
      }
    } catch (error) {
      console.error("Error adding dog:", error);
    }
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
      <div className="add-dog-container">
        <button onClick={() => userAddsDog()}>Add New Dog</button>
      </div>
      {userAddedDog && (
        <div className="add-dog-container">
          <p>
            Dog Name:
            <input
              type="text"
              value={newDogName}
              onChange={handleDogNameInputChange}
            ></input>
          </p>
          <button onClick={() => postNewDog()}>Submit</button>
        </div>
      )}
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
