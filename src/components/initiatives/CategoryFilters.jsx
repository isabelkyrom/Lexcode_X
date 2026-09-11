import { ALL_CATEGORY, CATEGORIES } from "../../data/categories";
import styles from "./CategoryFilters.module.css";

export function CategoryFilters({ activeCategory, onChange }) {
  return (
    <div className={styles.list} role="group" aria-label="Filtrar por categoría">
      <button
        type="button"
        className={`${styles.pill} ${styles.pillAll} ${
          activeCategory === ALL_CATEGORY.id ? styles.active : ""
        }`}
        onClick={() => onChange(ALL_CATEGORY.id)}
        aria-pressed={activeCategory === ALL_CATEGORY.id}
      >
        {ALL_CATEGORY.label}
      </button>

      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          type="button"
          className={`${styles.pill} ${activeCategory === category.id ? styles.active : ""}`}
          style={{
            background: `var(--color-cat-${category.id}-bg)`,
            color: `var(--color-cat-${category.id}-text)`,
          }}
          onClick={() => onChange(category.id)}
          aria-pressed={activeCategory === category.id}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
