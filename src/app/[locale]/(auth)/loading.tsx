const shimmer = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
`;

const sk = (h: string, w = "100%") => ({
  height: h,
  width: w,
  borderRadius: "8px",
  background: "linear-gradient(90deg, rgba(128,128,128,0.08) 25%, rgba(128,128,128,0.15) 50%, rgba(128,128,128,0.08) 75%)",
  backgroundSize: "200% 100%",
  animation: "shimmer 1.5s ease-in-out infinite",
});

export default function AuthLoading() {
  return (
    <>
      <style>{shimmer}</style>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "32px",
            borderRadius: "12px",
            border: "1px solid rgba(128,128,128,0.15)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ ...sk("32px", "160px"), margin: "0 auto" }} />
          <div style={sk("48px")} />
          <div style={sk("48px")} />
          <div style={sk("48px", "60%")} />
        </div>
      </div>
    </>
  );
}
