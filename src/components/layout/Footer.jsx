import { Link } from "react-router-dom";
import { Globe, MessageCircle, Share2 } from "lucide-react";
import styles from "./Footer.module.css";

const PLATFORM_LINKS = [
  { label: "Iniciativas", to: "/iniciativas" },
  { label: "¿Cómo funciona?", to: "/" },
  { label: "Garantía de Seguridad", to: "/" },
];

const TRANSPARENCY_LINKS = [
  { label: "Código Abierto", to: "/" },
  { label: "Preguntas Frecuentes", to: "/" },
  { label: "Privacidad", to: "/" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div>
          <p className={styles.brand}>Firma Ciudadana</p>
          <p className={styles.description}>
            Una plataforma cívica dedicada a democratizar la participación ciudadana y el desarrollo de
            iniciativas legales legítimas y seguras.
          </p>
        </div>

        <nav aria-label="Enlaces de plataforma">
          <p className={styles.heading}>Plataforma</p>
          <ul className={styles.linkList}>
            {PLATFORM_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Enlaces de transparencia">
          <p className={styles.heading}>Transparencia</p>
          <ul className={styles.linkList}>
            {TRANSPARENCY_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p className={styles.copyright}>
          © 2026 Firma Ciudadana. Licenciado bajo Creative Commons y Ley General de Datos Personales.
        </p>
        <div className={styles.socials}>
          <button type="button" aria-label="Red social (próximamente)">
            <Globe size={18} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Comunidad (próximamente)">
            <MessageCircle size={18} aria-hidden="true" />
          </button>
          <button type="button" aria-label="Compartir (próximamente)">
            <Share2 size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
