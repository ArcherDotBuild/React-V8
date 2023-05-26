import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      // If they pass me an empty string here or null or undefined,
      // i have no breedList, just send it to be an empty list.
      setBreedList([]);
    } else if (localCache[animal]) {
      // If I've seen it before in my localCache, then setBreedList
      // to be whatever is in localCache
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
    // Every time that the animal goes from dog to cat, we wanna request
    // the new breedList again
  }, [animal]);

  return [breedList, status]
}
