import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return (
    <div className={`container ${styles.section}`}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Página no encontrada</h1>
      <p className={styles.text}>La página que buscas no existe o fue movida.</p>
      <Link to="/" className={styles.link}>
        Volver al inicio
      </Link>
    </div>
  );
}
