import Image from "next/image";
import dataCarameloPicsTemp from "../../../../../public/dataTemp/dataCarameloPicsTemp";

export default function GalleryProfile() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {dataCarameloPicsTemp.map((pic, key) => (
        <div key={key} className="relative w-23 h-23 ">
          <Image
            src={pic.image}
            width={65}
            height={65}
            alt=""
            className="object-cover rounded-sm h-full w-full"
          />
        </div>
      ))}
    </div>
  );
}
