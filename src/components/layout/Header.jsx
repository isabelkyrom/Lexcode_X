import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Iniciativas", to: "/iniciativas" },
  { label: "¿Cómo funciona?", to: "/" },
  { label: "Estadísticas", to: "/" },
  { label: "Contacto", to: "/" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link to="/" className={styles.logo} aria-label="Firma Ciudadana, ir al inicio">
          <span className={styles.logoMark} aria-hidden="true">
            F
          </span>
          Firma Ciudadana
        </Link>

        <nav className={styles.nav} aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} to={link.to} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link to="/iniciar-sesion" className={styles.loginLink}>
            Iniciar Sesión
          </Link>
          <Link to="/crear-iniciativa" className={styles.ctaButton}>
            Crear Iniciativa
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`container ${styles.mobilePanel}`} id="mobile-menu">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={styles.mobileLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/iniciar-sesion"
            className={styles.mobileLink}
            onClick={() => setIsMenuOpen(false)}
          >
            Iniciar Sesión
          </Link>
          <Link
            to="/crear-iniciativa"
            className={`${styles.ctaButton} ${styles.mobileCta}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Crear Iniciativa
          </Link>
        </div>
      )}
    </header>
  );
}
