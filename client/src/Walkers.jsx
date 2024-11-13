import { useEffect, useState } from "react";
import {
  deleteWalker,
  getCities,
  getCityWalkers,
  getWalkers,
} from "./apiManager";

export const Walkers = () => {
  const [allWalkers, setAllWalkers] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [allCityWalkers, setAllCityWalkers] = useState([]);
  const [filteredWalkers, setFilteredWalkers] = useState([]);

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
            </div>
          );
        })}
      </div>
    </div>
  );
};
