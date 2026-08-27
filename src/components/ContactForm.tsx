import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";

const contactSchema = z.object({
  nome: z.string().trim().min(1, "Nome obbligatorio").max(100, "Nome troppo lungo"),
  email: z.string().trim().email("Email non valida").max(255, "Email troppo lunga"),
  telefono: z.string().trim().max(20, "Telefono troppo lungo").optional().or(z.literal("")),
  messaggio: z.string().trim().min(1, "Messaggio obbligatorio").max(2000, "Messaggio troppo lungo"),
  sede: z.string().trim().min(1).max(50),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  sede: string;
  sedeLabel: string;
}

const WP_API_URL = "/wp-json/custom/v1/contact";

const ContactForm = ({ sede, sedeLabel }: ContactFormProps) => {
  const [formData, setFormData] = useState({ nome: "", email: "", telefono: "", messaggio: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = contactSchema.safeParse({ ...formData, sede });
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      parsed.error.errors.forEach((err) => {
        const key = err.path[0] as keyof ContactFormData;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(WP_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Errore invio");
      setStatus("success");
      setFormData({ nome: "", email: "", telefono: "", messaggio: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full px-4 py-3 border border-border rounded-md bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">SCRIVICI – {sedeLabel.toUpperCase()}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4" title={`Contatta CAF Patronato ${sedeLabel} – Invia messaggio`}>
        Inviaci un Messaggio
      </h2>
      <p className="text-body-text leading-relaxed mb-8 seo-container-para" title={`Modulo contatto CAF ${sedeLabel} – Risposta entro 24 ore`}>
        Compila il modulo e ti risponderemo entro 24 ore lavorative. In alternativa, chiamaci direttamente per assistenza immediata.
      </p>

      {status === "success" && (
        <div className="mb-6 p-4 rounded-md bg-accent text-primary text-sm font-medium">
          ✓ Grazie per averci contattato! Ti risponderemo al più presto.
        </div>
      )}
      {status === "error" && (
        <div className="mb-6 p-4 rounded-md bg-destructive/10 text-destructive text-sm font-medium">
          Errore nell'invio. Riprova o chiamaci direttamente.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Nome e Cognome *</label>
          <input type="text" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} className={inputClass} placeholder="Mario Rossi" />
          {errors.nome && <p className="text-xs text-destructive mt-1">{errors.nome}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Email *</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} placeholder="mario@email.com" />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Telefono</label>
            <input type="tel" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className={inputClass} placeholder="+39 333 000 0000" />
            {errors.telefono && <p className="text-xs text-destructive mt-1">{errors.telefono}</p>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Messaggio *</label>
          <textarea rows={5} value={formData.messaggio} onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })} className={`${inputClass} resize-none`} placeholder="Come possiamo aiutarti?" />
          {errors.messaggio && <p className="text-xs text-destructive mt-1">{errors.messaggio}</p>}
        </div>
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Invio in corso..." : "Invia Messaggio"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
