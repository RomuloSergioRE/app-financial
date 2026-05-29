export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: "16px",
        padding: "16px",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", color: "#dc3545", margin: 0 }}>
        404
      </h1>
      <p style={{ color: "#666", margin: 0 }}>
        Página não encontrada
      </p>
      <a
        href="/"
        style={{
          padding: "8px 16px",
          background: "#4361ee",
          color: "#fff",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Voltar ao início
      </a>
    </div>
  );
}
