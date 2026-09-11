import { SearchBar } from "../components/common/SearchBar";
import { Statistics } from "../components/common/Statistics";
import { InitiativeCatalog } from "../components/initiatives/InitiativeCatalog";
import { useInitiatives } from "../hooks/useInitiatives";
import { useInitiativeFilters } from "../hooks/useInitiativeFilters";
import styles from "./HomePage.module.css";

export function HomePage() {
  const { initiatives, isLoading } = useInitiatives();
  const { searchTerm, setSearchTerm, category, setCategory, filtered } = useInitiativeFilters(initiatives);

  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Tu firma impulsa el cambio</h1>
          <p className={styles.heroText}>
            Participa de forma segura en la creación de las leyes de tu país. Explora propuestas
            ciudadanas respaldadas por miles y plasma tu firma digital oficial.
          </p>
          <SearchBar value={searchTerm} onChange={setSearchTerm} onSubmit={setSearchTerm} />
        </div>
      </section>

      <Statistics />

      <InitiativeCatalog
        initiatives={filtered}
        category={category}
        onCategoryChange={setCategory}
        isLoading={isLoading}
      />
    </>
  );
}
