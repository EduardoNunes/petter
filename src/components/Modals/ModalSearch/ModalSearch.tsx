import errorResponse from "@/components/Error/ErrorResponse";
import MessageToast from "@/components/Error/MessageToast";
import Input from "@/components/Input/Input";
import Loading from "@/components/Loading/Loading";
import { useHomeContext } from "@/context/homeContext";
import { useSelfContext } from "@/context/selfContext";
import api from "@/server/api";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import "../animation.css";

export default function ModalSearch() {
  const { setIsOpenSearch, handleOpenProfile } = useHomeContext();
  const { loading, setLoading } = useSelfContext();
  const [animation, setAnimation] = useState("slide-in");
  const [found, setFound] = useState<any[]>([]);
  const [toast, setToast] = useState("");

  const router = useRouter();

  function handleClickCloseModal() {
    setAnimation("slide-out");

    setTimeout(() => {
      setIsOpenSearch(false);
    }, 300);
  }

  async function onChange(event: ChangeEvent<HTMLInputElement>) {
    const petterName = event.target.value;

    if (petterName === "") {
      setFound([]);
      return;
    }

    setLoading(true);
    const session = await getSession();
    const token = session?.user.accessToken;

    try {
      const response = await api.get(`search-petter?petterName=${petterName}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFound(response.data);
    } catch (error: any) {
      setLoading(false);
      const response = errorResponse(error);
      setToast(response);
    }
    setLoading(false);
  }

  return (
    <div
      className={`absolute top-0 left-0 z-10 flex flex-col w-full h-full px-8 py-2 bg-branco ${animation}`}
    >
      {toast && <MessageToast textError={toast} setToast={setToast} />}
      {loading && <Loading />}
      <div className="flex items-center justify-between w-full h-12 gap-4">
        <div className="relative">
          <Input
            text="text"
            type="search"
            id="search"
            name="search"
            autoComplete="search"
            style="mb-0 pl-10 pr-4"
            onChange={onChange}
          />
          <Image
            src="/images/search.png"
            width={28}
            height={28}
            alt="Exit"
            className="absolute w-6 top-2 left-2"
          />
        </div>
        <button onClick={handleClickCloseModal}>
          <Image
            src="/images/exit.png"
            width={28}
            height={28}
            alt="Exit"
            className="w-6"
          />
        </button>
      </div>
      <div>
        {!found || found.length === 0
          ? ""
          : found.map((find, index) => (
              <div key={index} className="w-full my-2">
                <div
                  className="flex items-center w-full gap-2"
                  onClick={() => handleOpenProfile(find.id)}
                >
                  <Image
                    src={find.profileImage}
                    width={48}
                    height={48}
                    alt={`${index}`}
                    style={{
                      width: "48px",
                      height: "48px",
                      objectFit: "cover",
                      borderRadius: "100%",
                    }}
                  />
                  <div className="flex items-center w-[calc(100%-56px)] justify-between">
                    <p
                      className="font-secondary font-semibold w-[60%] pr-2 truncate"
                      title={find.petterName}
                    >
                      {find.petterName}
                    </p>
                    <div className="flex flex-col w-[40%]">
                      <p
                        className="font-secondary text-smaller truncate"
                        title={find.petterKind}
                      >
                        {find.petterKind}
                      </p>
                      <p
                        className="font-secondary text-smaller truncate"
                        title={find.petterBreed}
                      >
                        {find.petterBreed}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
