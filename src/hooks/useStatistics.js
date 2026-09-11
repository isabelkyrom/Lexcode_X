import { useEffect, useState } from "react";
import { getStatistics } from "../services/initiativesService";

export function useStatistics() {
  const [statistics, setStatistics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getStatistics().then((data) => {
      if (isMounted) {
        setStatistics(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return { statistics, isLoading };
}
