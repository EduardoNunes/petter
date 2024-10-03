import Image from "next/image";
import { useEffect, useState } from "react";

interface MaleOrFemaleProps {
  gender: string;
}

export default function MaleOrFemale({ gender }: MaleOrFemaleProps) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (gender === "Macho") {
      setImageSrc("/images/male.png");
    } else if (gender === "Fêmea") {
      setImageSrc("/images/female.png");
    } else if (gender === "Não sei") {
      setImageSrc("/images/male-female.png");
    }
  }, [gender]);

  return (
    <div>
      <Image
        src={imageSrc || "/images/male-female.png"}
        width={32}
        height={32}
        alt="Gender Image"
        className="object-cover w-8 h-8 mr-2"
      />
    </div>
  );
}
