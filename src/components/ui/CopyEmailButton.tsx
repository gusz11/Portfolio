"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
export function CopyEmailButton({ email }: { email: string }) {
  const [message, setMessage] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setMessage("E-mail copiado.");
    } catch {
      setMessage(`Não foi possível copiar. Selecione o endereço: ${email}`);
    }
  }
  return (
    <div className="copy-email">
      <button className="button button-secondary" onClick={copy}>
        {message === "E-mail copiado." ? (
          <Check size={16} />
        ) : (
          <Copy size={16} />
        )}{" "}
        Copiar e-mail
      </button>
      <span role="status">{message}</span>
    </div>
  );
}
