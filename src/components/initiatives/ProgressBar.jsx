import styles from "./ProgressBar.module.css";

export function ProgressBar({ current, goal }) {
  const percentage = goal > 0 ? Math.min(100, Math.round((current / goal) * 100)) : 0;

  return (
    <div
      className={styles.track}
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${percentage}% de la meta de firmas alcanzado`}
    >
      <div className={styles.fill} style={{ width: `${percentage}%` }} />
    </div>
  );
}
