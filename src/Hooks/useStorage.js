import { useState } from "react";

export default function useStorage(key, initial = {}) {
  const [state, setState] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initial;
    } catch (error) {
      console.log(error);
      return {};
    }
  });

  const setData = (d) => {
    try {
      const value = d instanceof Function ? d(state) : d;
      setState(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setData];
}
