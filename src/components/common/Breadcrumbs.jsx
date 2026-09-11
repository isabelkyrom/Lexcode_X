import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

export function Breadcrumbs({ items }) {
  return (
    <nav className={styles.nav} aria-label="Migas de navegación">
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className={styles.item}>
              {isLast || !item.to ? (
                <span className={styles.current} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to} className={styles.link}>
                  {item.label}
                </Link>
              )}
              {!isLast && <span className={styles.separator}> / </span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
