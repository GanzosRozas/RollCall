import { useEffect, useRef, useCallback } from "react";

interface UseQRScannerOptions {
  onScan: (data: string) => void;
  minLength?: number; // Longitud mínima para considerar un QR válido
  bufferTimeout?: number; // ms para resetear el buffer si no llegan más chars
  charInterval?: number; // ms máximo entre chars para considerar que es el lector
}

export function useQRScanner({
  onScan,
  minLength = 3,
  bufferTimeout = 300,
  charInterval = 50,
}: UseQRScannerOptions) {
  const buffer = useRef<string>("");
  const lastTime = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Ignorar si el foco está en un input/textarea ajeno al scanner
      const target = e.target as HTMLElement;
      const isTyping =
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA") &&
        !target.dataset.qrInput;

      if (isTyping) return;

      const now = Date.now();

      const elapsed = now - lastTime.current;
  
      // Si tardó demasiado entre caracteres, reiniciar buffer
      if (elapsed > bufferTimeout) {
        buffer.current = "";
      }

      lastTime.current = now;

      // Limpiar timeout anterior
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (e.key === "Control") {
        const data = buffer.current.trim();
        if (data.length >= minLength) {
          onScan(data);
        }
        buffer.current = "";
        return;
      }

      // Solo acumular si los caracteres llegan rápido (es el lector, no el usuario)
      if (e.key.length === 1 && elapsed < charInterval) {
        buffer.current += e.key;
      } else if (e.key.length === 1 && buffer.current === "") {
        // Primer carácter siempre se acepta
        buffer.current += e.key;
      }

      // Auto-limpiar buffer si no llega Enter
      timeoutRef.current = setTimeout(() => {
        buffer.current = "";
      }, bufferTimeout);
    },
    [onScan, minLength, bufferTimeout, charInterval],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleKeyDown]);
}
