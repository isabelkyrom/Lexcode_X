import { useEffect, useState } from "react";
import { getInitiativeById } from "../services/initiativesService";

export function useInitiativeDetail(id) {
  const [initiative, setInitiative] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getInitiativeById(id)
      .then((data) => {
        if (isMounted) setInitiative(data);
      })
      .catch(() => {
        if (isMounted) setError("No se pudo cargar la iniciativa.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { initiative, isLoading, error };
}
