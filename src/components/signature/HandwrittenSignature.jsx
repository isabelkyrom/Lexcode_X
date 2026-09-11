import { useCallback, useEffect, useRef, useState } from "react";
import { PenLine, Undo2, Eraser } from "lucide-react";
import styles from "./HandwrittenSignature.module.css";
import panelStyles from "./SignaturePanel.module.css";

export function HandwrittenSignature({ onChange }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const strokesRef = useRef([]);
  const currentStrokeRef = useRef(null);
  const isDrawingRef = useRef(false);

  const [strokeCount, setStrokeCount] = useState(0);
  const [isEmpty, setIsEmpty] = useState(true);

  const drawAll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#171b30";

    strokesRef.current.forEach((stroke) => {
      if (stroke.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      stroke.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.stroke();
    });
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = container.clientWidth * dpr;
    canvas.height = container.clientHeight * dpr;
    drawAll();
  }, [drawAll]);

  useEffect(() => {
    resizeCanvas();
    const observer = new ResizeObserver(resizeCanvas);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [resizeCanvas]);

  useEffect(() => {
    onChange?.(strokeCount > 0);
  }, [strokeCount, onChange]);

  function getPointerPosition(event) {
    const rect = canvasRef.current.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function handlePointerDown(event) {
    event.preventDefault();
    canvasRef.current.setPointerCapture(event.pointerId);
    isDrawingRef.current = true;
    setIsEmpty(false);
    currentStrokeRef.current = [getPointerPosition(event)];
  }

  function handlePointerMove(event) {
    if (!isDrawingRef.current) return;
    event.preventDefault();
    const position = getPointerPosition(event);
    const stroke = currentStrokeRef.current;
    const previous = stroke[stroke.length - 1];
    stroke.push(position);

    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(previous.x, previous.y);
    ctx.lineTo(position.x, position.y);
    ctx.stroke();
  }

  function finishStroke() {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    const stroke = currentStrokeRef.current;
    currentStrokeRef.current = null;
    if (stroke && stroke.length > 1) {
      strokesRef.current.push(stroke);
      setStrokeCount((count) => count + 1);
    }
  }

  function handleUndo() {
    strokesRef.current.pop();
    setStrokeCount((count) => Math.max(0, count - 1));
    if (strokesRef.current.length === 0) setIsEmpty(true);
    drawAll();
  }

  function handleClear() {
    strokesRef.current = [];
    setStrokeCount(0);
    setIsEmpty(true);
    drawAll();
  }

  return (
    <div className={panelStyles.panel}>
      <div className={panelStyles.header}>
        <PenLine size={18} className={panelStyles.headerIcon} aria-hidden="true" />
        Firma manuscrita
      </div>

      <div className={styles.canvasWrap} ref={containerRef}>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          role="img"
          aria-label="Área para dibujar tu firma manuscrita"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishStroke}
          onPointerLeave={finishStroke}
          onPointerCancel={finishStroke}
        />
        {isEmpty && <span className={styles.placeholder}>Firme dentro del cuadro</span>}
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.actionButton} onClick={handleUndo} disabled={strokeCount === 0}>
          <Undo2 size={15} aria-hidden="true" style={{ marginRight: 6, verticalAlign: "-2px" }} />
          Deshacer
        </button>
        <button type="button" className={styles.actionButton} onClick={handleClear} disabled={strokeCount === 0}>
          <Eraser size={15} aria-hidden="true" style={{ marginRight: 6, verticalAlign: "-2px" }} />
          Limpiar
        </button>
      </div>
    </div>
  );
}
