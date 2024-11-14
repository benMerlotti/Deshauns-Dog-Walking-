import { useEffect, useState } from "react";
import {
  deleteWalker,
  getCities,
  getCityWalkers,
  getDogs,
  getWalkers,
  putDogWalker,
} from "./apiManager";

export const Walkers = () => {
  const [allWalkers, setAllWalkers] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allCityWalkers, setAllCityWalkers] = useState([]);
  const [filteredWalkers, setFilteredWalkers] = useState([]);
  const [allDogs, setAllDogs] = useState([]);
  const [addDogClicked, setAddDogClicked] = useState(false);
  const [chosenWalker, setChosenWalker] = useState(null);
  const [chosenWalkerId, setChosenWalkerId] = useState(null);
  const [walkerDogs, setWalkerDogs] = useState([]);
  const [walkerCities, setWalkerCities] = useState([]);

  useEffect(() => {
    getWalkers().then((data) => {
      setAllWalkers(data);
      setFilteredWalkers(data);
    });
  }, []);

  useEffect(() => {
    getCities().then((data) => {
      setAllCities(data);
    });
  }, []);

  useEffect(() => {
    getCityWalkers().then((data) => {
      setAllCityWalkers(data);
    });
  }, []);

  useEffect(() => {
    getDogs()
      .then(setAllDogs)
      .catch(() => {
        console.log("API not connected");
      });
  }, []);

  const handleFilterByCity = (event) => {
    const chosenCity = parseInt(event.target.value);
    if (chosenCity) {
      const walkerIdsInCity = allCityWalkers
        .filter((cw) => cw.cityId == chosenCity)
        .map((cw) => cw.walkerId);

      const filtered = allWalkers.filter((w) => walkerIdsInCity.includes(w.id));

      setFilteredWalkers(filtered);
    } else {
      setFilteredWalkers(allWalkers);
    }
  };

  const handleDeleteWalker = (id) => {
    deleteWalker(id).then(
      getWalkers().then((data) => {
        setFilteredWalkers(data);
        setAllWalkers(data);
      })
    );
  };

  const handleAddDog = (id, name) => {
    setAddDogClicked(true);
    setChosenWalker(name);
    setChosenWalkerId(id);
    const walkerCities = allCityWalkers.filter((cw) => cw.walkerId == id);
    const walkerCityIds = walkerCities.map((wc) => wc.cityId);

    const unmatchedDogs = allDogs.filter((d) => d.walkerId !== id);
    const inWalkerCityAndUnmatched = unmatchedDogs.filter((d) =>
      walkerCityIds.includes(d.cityId)
    );
    setWalkerDogs(inWalkerCityAndUnmatched);
  };

  const handleAssignDog = (dogId) => {
    putDogWalker(dogId, chosenWalkerId)
      .then(() => {
        console.log("PUT request complete, updating state locally...");

        // Remove the assigned dog from walkerDogs to reflect changes immediately
        setWalkerDogs((prevWalkerDogs) =>
          prevWalkerDogs.filter((dog) => dog.id !== dogId)
        );

        // Re-fetch all dogs to keep full list updated
        return getDogs();
      })
      .then((data) => {
        console.log("Fetched updated dogs:", data);
        setAllDogs(data);
      });
  };

  return (
    <div>
      <div>
        <select onChange={handleFilterByCity}>
          <option value="">All Walkers</option>
          {allCities.map((c) => {
            return (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        {filteredWalkers.map((w) => {
          return (
            <div key={w.id}>
              <li>{`${w.name}`}</li>
              <button onClick={() => handleDeleteWalker(w.id)}>DELETE</button>
              <button onClick={() => handleAddDog(w.id, w.name)}>
                ADD DOG
              </button>
            </div>
          );
        })}
      </div>
      <div>
        {addDogClicked && (
          <div>
            <h1>Choose dog to add for {chosenWalker}</h1>
            <div>
              {walkerDogs.map((wd) => {
                return (
                  <li key={wd.id} onClick={() => handleAssignDog(wd.id)}>
                    {wd.name}
                  </li>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
