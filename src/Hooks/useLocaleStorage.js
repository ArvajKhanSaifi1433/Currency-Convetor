import { useEffect, useState } from "react";

export default function useLocaleStorage(key, initialData) {
  const [localData, setLocalData] = useState(initialData);

  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem(key));
    if (existingData) {
      setLocalData(existingData);
    } else {
      localStorage.setItem(key, JSON.stringify(initialData));
    }
  }, []);

  function updateLocalStorage(newData) {
    if (typeof newData === "function") {
      localStorage.setItem(key, JSON.stringify(newData(localData)));
    } else {
      localStorage.setItem(key, JSON.stringify(newData));
    }
    setLocalData(newData);
  }
  return [localData, updateLocalStorage];
}

