import { useCallback, useState } from "react";

function useFetchDummy() {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();

      setData(result.data);
    } catch (e) {
      console.warn(e);
    }
  }, []);
  return {
    fetchData,
    data,
  };
}
export default useFetchDummy;
