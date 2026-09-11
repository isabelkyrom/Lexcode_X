import { useMemo, useState } from "react";
import { ALL_CATEGORY } from "../data/categories";

export function useInitiativeFilters(initiatives) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORY.id);

  const filtered = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return initiatives.filter((initiative) => {
      const matchesCategory = category === ALL_CATEGORY.id || initiative.category === category;

      if (!matchesCategory) return false;
      if (!normalizedSearch) return true;

      const categoryLabel = initiative.category.toLowerCase();
      return (
        initiative.title.toLowerCase().includes(normalizedSearch) ||
        initiative.description.toLowerCase().includes(normalizedSearch) ||
        categoryLabel.includes(normalizedSearch)
      );
    });
  }, [initiatives, searchTerm, category]);

  return { searchTerm, setSearchTerm, category, setCategory, filtered };
}
