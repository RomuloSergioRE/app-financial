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

export default function AdminLoading() {
  return (
    <>
      <style>{shimmer}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={sk("32px", "200px")} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          <div style={sk("120px")} />
          <div style={sk("120px")} />
        </div>
        <div style={sk("300px")} />
        <div style={sk("300px")} />
      </div>
    </>
  );
}
