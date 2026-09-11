import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";

export function SearchBar({ value, onChange, onSubmit, placeholder }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSubmit?.(value);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <Search size={20} className={styles.icon} aria-hidden="true" />
      <label htmlFor="initiative-search" className="visually-hidden">
        Buscar iniciativas
      </label>
      <input
        id="initiative-search"
        type="search"
        className={styles.input}
        placeholder={placeholder ?? "Buscar iniciativas de ley por palabra clave, estado o categoría..."}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        aria-label="Buscar iniciativas de ley"
      />
      <button type="submit" className={styles.button}>
        Buscar
      </button>
    </form>
  );
}
