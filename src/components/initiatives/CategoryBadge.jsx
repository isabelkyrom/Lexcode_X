import { getCategoryLabel } from "../../data/categories";
import styles from "./CategoryBadge.module.css";

export function CategoryBadge({ category }) {
  return (
    <span
      className={styles.badge}
      style={{
        background: `var(--color-cat-${category}-bg)`,
        color: `var(--color-cat-${category}-text)`,
      }}
    >
      {getCategoryLabel(category)}
    </span>
  );
}
