import { useEffect, useState } from "react";
import { getCities, getWalkers } from "./apiManager";

export const Walkers = () => {
  const [allWalkers, setAllWalkers] = useState([]);
  const [allCities, setAllCities] = useState([]);

  useEffect(() => {
    getWalkers().then((data) => {
      setAllWalkers(data);
    });
  }, []);

  useEffect(() => {
    getCities().then((data) => {
      setAllCities(data);
    });
  }, []);

  return (
    <div>
      {allWalkers.map((w) => {
        return <li>{`${w.name}`}</li>;
      })}
    </div>
  );
};
