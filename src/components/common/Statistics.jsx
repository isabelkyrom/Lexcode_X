import { FileText, CheckCheck, Flame } from "lucide-react";
import { useStatistics } from "../../hooks/useStatistics";
import styles from "./Statistics.module.css";

const formatter = new Intl.NumberFormat("es-MX");

export function Statistics() {
  const { statistics, isLoading } = useStatistics();

  const items = [
    {
      icon: FileText,
      value: statistics ? formatter.format(statistics.totalInitiatives) : "—",
      label: "Iniciativas de ley",
    },
    {
      icon: CheckCheck,
      value: statistics ? formatter.format(statistics.totalSignatures) : "—",
      label: "Firmas recolectadas",
    },
    {
      icon: Flame,
      value: statistics ? formatter.format(statistics.activeCampaignsToday) : "—",
      label: "Campañas activas hoy",
    },
  ];

  return (
    <section className={styles.section} aria-label="Estadísticas de la plataforma">
      <div className={`container ${styles.grid}`} aria-busy={isLoading}>
        {items.map(({ icon: Icon, value, label }) => (
          <div className={styles.item} key={label}>
            <span className={styles.iconWrap}>
              <Icon size={20} aria-hidden="true" />
            </span>
            <span className={styles.text}>
              <span className={styles.value}>{value}</span>
              <span className={styles.label}>{label}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
