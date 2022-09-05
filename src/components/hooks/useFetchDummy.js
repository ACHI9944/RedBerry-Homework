import { useCallback, useState } from "react";

function useFetchDummy() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setIsLoading(false)
      setData(result.data);
    } catch (e) {
      console.warn(e);
    }
  }, []);
  return {
    isLoading,
    fetchData,
    data,
  };
}
export default useFetchDummy;
