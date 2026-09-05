import { useEffect, useRef, useState } from "react";
import { saveLocalImage } from "../../functions/localImages";

export function LocalImagePicker({
  label,
  onSelect,
}: {
  label: string;
  onSelect: (source: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const active = useRef(true);
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    active.current = true;
    return () => {
      active.current = false;
    };
  }, []);
  return (
    <div style={{ maxWidth: "100%", marginTop: "0.5rem" }}>
      <button
        type="button"
        disabled={busy}
        onClick={() => input.current?.click()}
      >
        {busy ? "Saving…" : "Browse files…"}
      </button>
      <input
        ref={input}
        aria-label={label}
        hidden
        type="file"
        accept="image/*"
        disabled={busy}
        onChange={async (event) => {
          const file = event.currentTarget.files?.[0];
          event.currentTarget.value = "";
          if (!file) return;
          setBusy(true);
          setError("");
          try {
            const source = await saveLocalImage(file);
            if (active.current) onSelect(source);
          } catch (error) {
            if (active.current)
              setError(
                error instanceof Error
                  ? error.message
                  : "The image could not be saved. Free up browser storage and try again.",
              );
          } finally {
            if (active.current) setBusy(false);
          }
        }}
      />
      {busy && <p role="status">Saving image…</p>}
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
