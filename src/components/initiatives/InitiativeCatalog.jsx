import { CategoryFilters } from "./CategoryFilters";
import { InitiativeCard } from "./InitiativeCard";
import styles from "./InitiativeCatalog.module.css";

export function InitiativeCatalog({ initiatives, category, onCategoryChange, isLoading }) {
  return (
    <section className={styles.section} aria-label="Catálogo de iniciativas">
      <div className="container">
        <h2 className={styles.heading}>Explora las Propuestas Ciudadanas</h2>

        <div className={styles.filters}>
          <CategoryFilters activeCategory={category} onChange={onCategoryChange} />
        </div>

        {isLoading ? (
          <p>Cargando iniciativas...</p>
        ) : initiatives.length === 0 ? (
          <div className={styles.empty} role="status">
            No encontramos iniciativas que coincidan con tu búsqueda. Intenta con otra palabra clave o
            categoría.
          </div>
        ) : (
          <div className={styles.grid}>
            {initiatives.map((initiative) => (
              <InitiativeCard key={initiative.id} initiative={initiative} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
