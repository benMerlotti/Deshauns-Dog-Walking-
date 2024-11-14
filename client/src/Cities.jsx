import { useEffect, useState } from "react";
import {
  deleteWalker,
  getCities,
  getCityWalkers,
  getWalkers,
  postCity,
} from "./apiManager";

export const Cities = () => {
  const [allWalkers, setAllWalkers] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [cityInput, setCityInput] = useState("");
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

  const handleOnChangeCity = (event) => {
    const input = event.target.value;
    setCityInput(input);
  };

  const handleOnClickCity = () => {
    const newCity = {
      name: cityInput,
    };
    postCity(newCity).then(() => {
      getCities().then((data) => {
        setAllCities(data);
        setCityInput("");
      });
    });
  };

  return (
    <div>
      <div>
        <input onChange={handleOnChangeCity} value={cityInput} type="text" />
        <button onClick={handleOnClickCity}>ADD</button>
      </div>
      <div>
        {allCities.map((c) => {
          return <li key={c.id}>{c.name}</li>;
        })}
      </div>
    </div>
  );
};
