import { useState } from "react";
import { X, Send } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { useSettings } from "@/lib/settings";

function WaIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function WhatsappWidget() {
  const { whatsappUrl } = useSettings();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function send() {
    if (!message.trim()) return;
    window.open(
      `${whatsappUrl}?text=${encodeURIComponent(message.trim())}`,
      "_blank"
    );
    setMessage("");
    setOpen(false);
  }

  return (
    <div className="fixed bottom-24 right-4 md:bottom-8 md:right-6 z-40 flex flex-col items-end gap-3">

      {/* Chat window — solo existe en el DOM cuando está abierto */}
      {open && (
      <div className="w-[calc(100vw-2rem)] max-w-[22rem] bg-background border border-border overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-bottom-right">
        {/* Header */}
        <div className="bg-acid px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-ink">
              <WaIcon size={20} />
            </div>
            <div>
              <p className="font-display text-sm uppercase tracking-[0.25em] text-ink leading-none">{BRAND.name}</p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-ink/50 animate-pulse" />
                <p className="text-[10px] text-ink/60 uppercase tracking-[0.15em]">En línea</p>
              </div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-ink/50 hover:text-ink transition-colors">
            <X size={15} strokeWidth={2} />
          </button>
        </div>

        {/* Message bubble */}
        <div className="px-5 pt-5 pb-4">
          <div className="bg-bone/5 border border-border p-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-acid mb-2">{BRAND.name} · Soporte</p>
            <p className="text-sm text-cream/65 leading-relaxed">
              Hola 👋 ¿En qué te podemos ayudar? Escríbenos y te respondemos en minutos.
            </p>
          </div>
        </div>

        {/* Input */}
        <div className="border-t border-border flex items-center gap-3 px-4 py-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-transparent text-sm text-cream placeholder:text-cream/30 outline-none"
          />
          <button
            onClick={send}
            disabled={!message.trim()}
            className="w-8 h-8 bg-acid text-ink flex items-center justify-center disabled:opacity-30 hover:opacity-80 transition-opacity shrink-0"
          >
            <Send size={13} strokeWidth={1.5} />
          </button>
        </div>
      </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-14 h-14 bg-acid text-ink flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200 rounded-full"
        aria-label="Abrir chat de WhatsApp"
      >
        <div className={cn("transition-all duration-200", open ? "scale-90 rotate-90" : "scale-100 rotate-0")}>
          {open ? <X size={22} strokeWidth={2} /> : <WaIcon size={26} />}
        </div>
      </button>
    </div>
  );
}
