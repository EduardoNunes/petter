import Image from "next/image";

export default function InfosProfile() {
  const publications = "12";
  const friends = "10";
  
  return (
    <div className="flex items-center gap-4">
      <div className="relative w-24 h-24 ">
        {" "}
        <Image
          src="/dataTemp/dog3.jpeg"
          width={150}
          height={150}
          alt="Home"
          className="object-cover w-full h-full rounded-full border-lime-950 border-solid border-[3px]"
        />
      </div>
      <div>
        <label className="font-secondary" htmlFor="text">
          Posts
        </label>
        <h2>{publications}</h2>
      </div>
      <div>
        <label className="font-secondary" htmlFor="text">
          Amigos
        </label>
        <h2>{friends}</h2>
      </div>
    </div>
  );
}
