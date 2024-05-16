import dataCardTemp from "./dataCardsTemp";

export default function Card() {
  return (
    <div className="flex flex-col relative w-full h-full overflow-auto">
      {dataCardTemp.map((card, index) => (
        <div key={index} className="relative w-full h-auto">
          <p className="absolute left-2 text-medium">{card.name}</p>
          <img
            src={card.imageSrc}
            alt={card.name}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              top: 0,
              left: 0,
            }}
          />
          <div className="flex items-center h-8 mb-2">
            <p>Fotter</p>
          </div>
        </div>
      ))}
    </div>
  );
}
