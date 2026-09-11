import { SearchBar } from "../components/common/SearchBar";
import { InitiativeCatalog } from "../components/initiatives/InitiativeCatalog";
import { useInitiatives } from "../hooks/useInitiatives";
import { useInitiativeFilters } from "../hooks/useInitiativeFilters";
import styles from "./InitiativesPage.module.css";

export function InitiativesPage() {
  const { initiatives, isLoading } = useInitiatives();
  const { searchTerm, setSearchTerm, category, setCategory, filtered } = useInitiativeFilters(initiatives);

  return (
    <>
      <section className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>Iniciativas de Ley</h1>
          <SearchBar value={searchTerm} onChange={setSearchTerm} onSubmit={setSearchTerm} />
        </div>
      </section>

      <InitiativeCatalog
        initiatives={filtered}
        category={category}
        onCategoryChange={setCategory}
        isLoading={isLoading}
      />
    </>
  );
}
