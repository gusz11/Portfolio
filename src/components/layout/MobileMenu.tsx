"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/navigation";
import { trapDialogFocus } from "@/lib/focus";
export function MobileMenu({ active }: { active: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1100px)");
    const onResize = () => {
      if (desktop.matches && dialog.current?.open) dialog.current.close();
    };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);
  function close() {
    dialog.current?.close();
  }
  return (
    <div className="mobile-navigation">
      <button
        ref={trigger}
        className="icon-button"
        aria-label="Abrir menu de navegação"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          dialog.current?.showModal();
          setOpen(true);
          document.body.style.overflow = "hidden";
        }}
      >
        <Menu />
      </button>
      <dialog
        ref={dialog}
        className="mobile-menu"
        aria-label="Menu de navegação"
        onKeyDown={trapDialogFocus}
        onClose={() => {
          setOpen(false);
          document.body.style.overflow = "";
          trigger.current?.focus({ preventScroll: true });
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
      >
        <div className="mobile-menu-top">
          <span className="wordmark">
            Gustavo Jesus<span>.</span>
          </span>
          <button
            className="icon-button"
            aria-label="Fechar menu"
            onClick={close}
          >
            <X />
          </button>
        </div>
        <nav aria-label="Navegação mobile">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              onClick={close}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p>
          Software, com intenção.
          <br />
          Brasília, Brasil.
        </p>
      </dialog>
    </div>
  );
}
