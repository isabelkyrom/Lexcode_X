import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { ProgressBar } from "./ProgressBar";
import styles from "./InitiativeCard.module.css";

const numberFormatter = new Intl.NumberFormat("es-MX");

export function InitiativeCard({ initiative }) {
  const { id, title, description, category, daysRemaining, signatures, goal } = initiative;

  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <CategoryBadge category={category} />
        <span className={styles.daysRemaining}>
          <Clock size={14} aria-hidden="true" />
          {daysRemaining} días restantes
        </span>
      </div>

      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <ProgressBar current={signatures} goal={goal} />

      <div className={styles.progressMeta}>
        <span>
          <span className={styles.signaturesCount}>{numberFormatter.format(signatures)}</span> firmas
        </span>
        <span>Meta: {numberFormatter.format(goal)}</span>
      </div>

      <Link to={`/iniciativas/${id}`} className={styles.signButton}>
        Firmar Iniciativa
      </Link>
    </article>
  );
}
