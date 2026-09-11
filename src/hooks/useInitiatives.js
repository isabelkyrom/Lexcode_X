import { useEffect, useState } from "react";
import { getInitiatives } from "../services/initiativesService";

export function useInitiatives() {
  const [initiatives, setInitiatives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getInitiatives()
      .then((data) => {
        if (isMounted) setInitiatives(data);
      })
      .catch(() => {
        if (isMounted) setError("No se pudieron cargar las iniciativas.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { initiatives, isLoading, error };
}
