import { useRef, useState } from "react";
import { KeyRound, UploadCloud, FileCheck2, Eye, EyeOff } from "lucide-react";
import styles from "./ElectronicSignature.module.css";
import panelStyles from "./SignaturePanel.module.css";

const ACCEPTED_EXTENSIONS = [".cer", ".key"];

function hasAcceptedExtension(fileName) {
  const lowerName = fileName.toLowerCase();
  return ACCEPTED_EXTENSIONS.some((extension) => lowerName.endsWith(extension));
}

export function ElectronicSignature({ files, password, onFilesChange, onPasswordChange }) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  function processFileList(fileList) {
    const incoming = Array.from(fileList);
    const invalid = incoming.filter((file) => !hasAcceptedExtension(file.name));

    if (invalid.length > 0) {
      setError("Solo se aceptan archivos con extensión .cer y .key");
      return;
    }

    setError("");

    const next = { ...files };
    incoming.forEach((file) => {
      if (file.name.toLowerCase().endsWith(".cer")) next.cer = file;
      if (file.name.toLowerCase().endsWith(".key")) next.key = file;
    });

    onFilesChange(next);
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragActive(false);
    if (event.dataTransfer.files?.length) processFileList(event.dataTransfer.files);
  }

  return (
    <div className={panelStyles.panel}>
      <div className={panelStyles.header}>
        <KeyRound size={18} className={panelStyles.headerIcon} aria-hidden="true" />
        Firma con e-firma
      </div>

      <div
        className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ""}`}
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragActive(true);
        }}
        onDragLeave={() => setIsDragActive(false)}
        onDrop={handleDrop}
        aria-label="Arrastra o selecciona tus archivos .cer y .key"
      >
        <UploadCloud size={26} className={styles.dropzoneIcon} aria-hidden="true" />
        <span className={styles.dropzoneText}>Arrastra aquí tus archivos .cer y .key</span>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".cer,.key"
          className={styles.hiddenInput}
          onChange={(event) => event.target.files?.length && processFileList(event.target.files)}
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      {(files.cer || files.key) && (
        <ul className={styles.fileList}>
          {files.cer && (
            <li className={styles.fileItem}>
              <FileCheck2 size={16} aria-hidden="true" />
              <span className={styles.fileName}>{files.cer.name}</span>
            </li>
          )}
          {files.key && (
            <li className={styles.fileItem}>
              <FileCheck2 size={16} aria-hidden="true" />
              <span className={styles.fileName}>{files.key.name}</span>
            </li>
          )}
        </ul>
      )}

      <div className={styles.field}>
        <label htmlFor="private-key-password" className={styles.label}>
          Contraseña de clave privada
        </label>
        <div className={styles.passwordWrap}>
          <input
            id="private-key-password"
            type={showPassword ? "text" : "password"}
            className={styles.passwordInput}
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            placeholder="Contraseña de clave privada"
            autoComplete="off"
          />
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword((show) => !show)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </div>
  );
}
