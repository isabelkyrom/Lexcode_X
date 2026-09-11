import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { Modal } from "../components/common/Modal";
import { CategoryBadge } from "../components/initiatives/CategoryBadge";
import { ProgressBar } from "../components/initiatives/ProgressBar";
import { ElectronicSignature } from "../components/signature/ElectronicSignature";
import { HandwrittenSignature } from "../components/signature/HandwrittenSignature";
import { useInitiativeDetail } from "../hooks/useInitiativeDetail";
import { submitSignature } from "../services/initiativesService";
import styles from "./InitiativeDetailPage.module.css";

const numberFormatter = new Intl.NumberFormat("es-MX");

export function InitiativeDetailPage() {
  const { id } = useParams();
  const { initiative, isLoading } = useInitiativeDetail(id);

  const [files, setFiles] = useState({ cer: null, key: null });
  const [password, setPassword] = useState("");
  const [hasHandwrittenSignature, setHasHandwrittenSignature] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) {
    return (
      <div className="container">
        <p className={styles.notFound}>Cargando iniciativa...</p>
      </div>
    );
  }

  if (!initiative) {
    return (
      <div className="container">
        <div className={styles.notFound}>
          <h1>Iniciativa no encontrada</h1>
          <p>No pudimos encontrar la iniciativa que buscas.</p>
          <Link to="/iniciativas">Volver a Iniciativas</Link>
        </div>
      </div>
    );
  }

  const percentage =
    initiative.goal > 0 ? Math.min(100, Math.round((initiative.signatures / initiative.goal) * 100)) : 0;

  const hasElectronicSignature = Boolean(files.cer || files.key);
  const canConfirm = termsAccepted && (hasElectronicSignature || hasHandwrittenSignature);

  async function handleConfirm() {
    if (!canConfirm || isSubmitting) return;
    setIsSubmitting(true);
    await submitSignature({
      initiativeId: initiative.id,
      method: hasElectronicSignature ? "e-firma" : "manuscrita",
    });
    setIsSubmitting(false);
    setIsModalOpen(true);
  }

  return (
    <div className={`container ${styles.page}`}>
      <Breadcrumbs items={[{ label: "Iniciativas", to: "/iniciativas" }, { label: "Detalle" }]} />

      <div className={styles.headerRow}>
        <CategoryBadge category={initiative.category} />
        <span className={styles.proponent}>Propuesto por: {initiative.proponent}</span>
      </div>

      <h1 className={styles.title}>{initiative.title}</h1>

      <div className={styles.layout}>
        <div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <span className={styles.cardHeaderTitle}>Estado de Recolección de Firmas</span>
              <span className={styles.percentage}>{percentage}% Completado</span>
            </div>
            <ProgressBar current={initiative.signatures} goal={initiative.goal} />
            <div className={styles.progressMeta}>
              <span>
                <span className={styles.signaturesCount}>
                  {numberFormatter.format(initiative.signatures)}
                </span>{" "}
                firmas
              </span>
              <span>Meta: {numberFormatter.format(initiative.goal)}</span>
            </div>
          </div>

          <div className={styles.exposition}>
            <h2 className={styles.expositionTitle}>Exposición de Motivos</h2>
            <p className={styles.expositionText}>{initiative.exposition}</p>
          </div>
        </div>

        <aside className={styles.card}>
          <p className={styles.sidebarLabel}>Información de la Propuesta</p>

          <p className={styles.sidebarLabel} style={{ marginTop: 16 }}>
            Estado de Iniciativa
          </p>
          <p className={`${styles.sidebarValue} ${styles.statusValue}`}>{initiative.status}</p>

          <p className={styles.sidebarLabel}>Fecha de Cierre</p>
          <p className={styles.sidebarValue}>{initiative.closingDate}</p>

          <p className={styles.sidebarLabel}>Seguridad Criptográfica</p>
          <p className={styles.sidebarValue}>{initiative.security}</p>
        </aside>
      </div>

      <h2 className={styles.signatureModuleTitle}>Módulo de Firma Autorizado</h2>

      <div className={styles.signatureGrid}>
        <ElectronicSignature
          files={files}
          password={password}
          onFilesChange={setFiles}
          onPasswordChange={setPassword}
        />
        <HandwrittenSignature onChange={setHasHandwrittenSignature} />
      </div>

      <div className={styles.confirmationCard}>
        <div className={styles.termsRow}>
          <input
            type="checkbox"
            id="accept-terms"
            className={styles.checkbox}
            checked={termsAccepted}
            onChange={(event) => setTermsAccepted(event.target.checked)}
          />
          <label htmlFor="accept-terms" className={styles.termsText}>
            Acepto los <Link to="/">Términos de Servicio</Link>, manifestando mi voluntad libre y
            consciente para respaldar digitalmente esta iniciativa de forma irreversible.
          </label>
        </div>

        <div className={styles.confirmationFooter}>
          <span className={styles.helperText}>
            Su firma será verificada contra el padrón nacional oficial.
          </span>
          <button
            type="button"
            className={styles.confirmButton}
            disabled={!canConfirm || isSubmitting}
            onClick={handleConfirm}
          >
            {isSubmitting ? "Procesando..." : "Confirmar Firma"}
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Firma simulada con éxito"
        icon={<ShieldCheck size={28} aria-hidden="true" />}
        confirmLabel="Entendido"
      >
        Esta es una demostración visual de Firma Ciudadana. Tu firma no fue procesada ni enviada a
        ningún servidor real, y el contador de firmas de esta iniciativa no se modificó.
      </Modal>
    </div>
  );
}
