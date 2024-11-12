import { getDogs, getGreeting } from "./apiManager";
import { useEffect, useState } from "react";

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });

  const [allDogs, setAllDogs] = useState([]);

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

  return (
    <div>
      <p>{greeting.message}</p>
      <div>
        {allDogs.map((d) => {
          return <li key={d.id}>{d.name}</li>;
        })}
      </div>
    </div>
  );
}
