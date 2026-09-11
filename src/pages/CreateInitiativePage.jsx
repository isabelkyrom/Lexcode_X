import { useState } from "react";
import { Link } from "react-router-dom";
import { FilePlus2 } from "lucide-react";
import { CATEGORIES } from "../data/categories";
import styles from "./ProvisionalPage.module.css";

export function CreateInitiativePage() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0].id);

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className={styles.section}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <FilePlus2 size={26} aria-hidden="true" />
        </div>
        <h1 className={styles.title}>Crear Iniciativa</h1>
        <p className={styles.text}>
          Esta vista es provisional. Próximamente podrás redactar y publicar tu propia iniciativa de
          ley ciudadana.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="initiative-title" className={styles.label}>
              Título de la iniciativa
            </label>
            <input
              id="initiative-title"
              type="text"
              className={styles.input}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ej. Ley de Movilidad Segura"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="initiative-category" className={styles.label}>
              Categoría
            </label>
            <select
              id="initiative-category"
              className={styles.input}
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              {CATEGORIES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.submitButton}>
            Continuar
          </button>
        </form>

        <Link to="/iniciativas" className={styles.backLink}>
          Ver iniciativas existentes
        </Link>
      </div>
    </div>
  );
}
