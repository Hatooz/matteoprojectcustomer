"use client";
import {
  addAdvert,
  applyToAppartment,
  deleteAdvert,
  getAppartmentById,
  getApplicationsByAppartmentId,
  updateAdvert,
} from "@/actions/actions";
import Button from "@/components/button/Button";
import { AppartmentDTO } from "@/models/models";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";

export default function Appartment({ params }: { params: { id: string } }) {
  const [appartment, setAppartment] = useState<AppartmentDTO>();
  const [rerender, setRerender] = useState(false);
  const [userHasApplied, setUserHasApplied] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    getAppartmentById(params.id).then((res) => {
      setAppartment(res);
    });
    getApplicationsByAppartmentId(params.id).then((res) => {
      const applicationExists = res.some(
        (application: any) => application.userId === session?.user?.id
      );
      setUserHasApplied(applicationExists);
    });
  }, [params.id, rerender, session]);

  const handleOnSubmit = async (formData: FormData) => {
    const advertText = formData.get("advertText") as string;
    const date = formData.get("rentalDate");

    const rentalDate = new Date(date as string);

    if (appartment?.advert) {
      await updateAdvert(
        appartment.advert.id as string,
        advertText,
        rentalDate.toUTCString()
      );
    }
    await addAdvert(params.id, advertText, rentalDate.toUTCString());
    ref.current?.close();
    startTransition(() => {
      setRerender(!rerender);
      router.refresh();
    });
  };

  const deletAd = async () => {
    await deleteAdvert(appartment?.advert?.id as string);
    setRerender(!rerender);
  };

  const sendApplication = async () => {
    if (session?.user?.id) {
      const response = await applyToAppartment(
        session?.user?.id,
        appartment?.id as string
      );

      console.log(response);
      startTransition(() => {
        setRerender(!rerender);
        router.refresh();
      });
    }
  };
  return (
    <div className="border  relative  ">
      <div className="absolute bg-riksbyggenDarkGray h-12 top-0 right-0 left-0 grid items-center px-2 text-white font-semibold">
        Lägenhet - {appartment?.objectNumber}
      </div>
      <div className="grid grid-cols-2 mt-20">
        <div className="appartment-details p-2">
          <div>Objektnummer</div>
          <div>{appartment?.objectNumber}</div>

          <div>LM-nummer</div>
          <div>{appartment?.lmNumber}</div>
          <div>Adress</div>
          <div>
            <div>
              {appartment?.address.street} {appartment?.address.number}{" "}
              {appartment?.address.numberAffix ?? ""}
            </div>
            <div>
              {appartment?.address.postalCode} {appartment?.address.city}
            </div>
            <div>{appartment?.address.county}</div>
          </div>
        </div>
        <div className="appartment-details">
          <div className="font-semibold">Köregel</div>
          <div>{appartment?.queueRule.name}</div>
          <div className="font-semibold">Annons</div>

          <div>{appartment?.advert?.advertText}</div>

          <div className="font-semibold">Publicerad</div>
          <div>
            {new Date(
              Date.parse(appartment?.advert?.publishedAt as string)
            ).toLocaleDateString()}
          </div>

          <div className="font-semibold">Inflyttningsdatum</div>
          <div>
            {new Date(
              Date.parse(appartment?.advert?.rentalDate as string)
            ).toLocaleDateString()}
          </div>
        </div>

        <div></div>
        {session?.user?.provider === "AD" && (
          <div>
            <div>
              <button onClick={() => ref.current?.showModal()}>
                {appartment?.advert ? "Ändra annons" : "Skapa annons"}
              </button>
            </div>
            <div>
              {appartment?.advert && (
                <button onClick={deletAd}>Ta bort annons</button>
              )}
            </div>
          </div>
        )}
        {session?.user?.provider === "credentials" && !userHasApplied && (
          <div>
            <Button text="Sök lägenhet" callback={() => sendApplication()} />
          </div>
        )}
        {session?.user?.provider === "credentials" && userHasApplied && (
          <div>Du har sökt denna lägenhet</div>
        )}
      </div>

      <dialog ref={ref} className="w-1/2">
        <form action={handleOnSubmit} className="grid">
          <label>Annonstext</label>
          <textarea
            name="advertText"
            id="advertText"
            cols={30}
            rows={10}
            className="border-2 border-black"
          />
          <label>Inflyttningsdatum</label>
          <input type="date" name="rentalDate" />
          <input type="submit" value="submit" />
        </form>
      </dialog>
    </div>
  );
}
