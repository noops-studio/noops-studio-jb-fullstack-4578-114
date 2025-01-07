import "./Demo.css";

import { useState, useEffect } from "react";

export default function Demo(): JSX.Element {
  const [animals, setAnimals] = useState<string[]>([]);
  const [isDogs, setIsDogs] = useState<boolean>(true);

  function getDogs() {
    return ["noop", "chief", "toy"];
  }

  function getCats() {
    return ["gingo", "eden"];
  }

  useEffect(() => {
    setAnimals(isDogs ? getDogs() : getCats());
  }, [isDogs, setAnimals]);

  function selectChange() {
    setIsDogs(!isDogs);
  }

  return (
    <div className="Demo">
      <select onChange={selectChange} className="Demo">
        <option value="dogs">Dogs</option>
        <option value="cats">Cats</option>
      </select>
      <ul>
        {animals?.map((animal: string) => (
          <li key={animal}>{animal}</li>
        ))}
      </ul>
    </div>
  );
}
