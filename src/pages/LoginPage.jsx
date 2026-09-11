import { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn } from "lucide-react";
import styles from "./ProvisionalPage.module.css";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className={styles.section}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <LogIn size={26} aria-hidden="true" />
        </div>
        <h1 className={styles.title}>Iniciar Sesión</h1>
        <p className={styles.text}>
          Esta vista es provisional. Próximamente podrás acceder a tu cuenta para firmar y dar
          seguimiento a tus iniciativas.
        </p>

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="login-email" className={styles.label}>
              Correo electrónico
            </label>
            <input
              id="login-email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tucorreo@ejemplo.com"
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="login-password" className={styles.label}>
              Contraseña
            </label>
            <input
              id="login-password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Iniciar Sesión
          </button>
        </form>

        <Link to="/" className={styles.backLink}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
