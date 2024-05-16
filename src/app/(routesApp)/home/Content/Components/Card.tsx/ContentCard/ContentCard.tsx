import "../dataCardsTemp"

export default function ContentHome() {
    
  return (
    <div className="relative w-full h-full" style={{ position: "relative" }}>
      <img
        src="/dataTemp/dog.jpeg"
        alt="Home"
        style={{
          width: "100%",
          height: "100vw",
          position: "absolute",
          objectFit: "cover",
          top: 0,
          left: 0,
        }}
        className=""
      />
    </div>
  );
}
