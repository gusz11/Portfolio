import { ImageResponse } from "next/og";
export const alt =
  "Gustavo Jesus — Desenvolvedor de Software. Oracle APEX, SQL e PL/SQL.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#09090f",
        color: "#f4f4f7",
        padding: "80px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", fontSize: 26, color: "#a78bfa" }}>
        Desenvolvedor de Software / Brasília
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 96,
          letterSpacing: -5,
          marginTop: 65,
        }}
      >
        Gustavo Jesus.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 30,
          color: "#a1a1b5",
          marginTop: 28,
        }}
      >
        Dados. Lógica. Experiência.
      </div>
      <div style={{ display: "flex", fontSize: 22, marginTop: "auto" }}>
        Oracle APEX · SQL & PL/SQL · Web & Mobile
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          right: -100,
          top: 80,
          width: 340,
          height: 520,
          border: "2px solid #8b5cf6",
          borderRadius: "50%",
          transform: "rotate(28deg)",
        }}
      />
    </div>,
    size,
  );
}
