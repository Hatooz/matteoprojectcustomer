"use client";
import { searchWithFilters } from "@/actions/actions";
import { AppartmentDTO } from "@/models/models";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOptimistic, useState } from "react";
import Toggle from "./toggle/Toggle";

export default function Properties({
  serverProperties,
  rules,
}: {
  serverProperties: any;
  rules: any;
}) {
  const router = useRouter();
  const { data: session } = useSession();

  console.log(session);

  const [properties, setProperties] =
    useState<AppartmentDTO[]>(serverProperties);

  const [hoveredPropId, setHoveredPropId] = useState<string>();
  // const updateRule = (prop: PropertyDTO, ruleId: string) => {
  //   startTransition(() => {
  //     prop.queueRule = rules.find((r: QueueRuleDTO) => r.id == ruleId);
  //     updateOptimisticProperty(prop);
  //   });
  //   updatePropertyRule(prop.id, ruleId).then((properties) => {
  //     setProperties(properties);
  //     startTransition(() => {
  //       router.refresh();
  //     });
  //   });
  // };

  const [showInfo, setShowInfo] = useState(false);

  const showInfoPopever = (propId: string) => {
    setHoveredPropId(propId);
    setShowInfo(!showInfo);
    // let rect = e.currentTarget.getBoundingClientRect();
    // let x = e.clientX - rect.left;
    // let y = e.clientY - rect.top - 50;
    // const top = Math.round(y);
    // const left = Math.round(x);
    // setCoordinate({ left, top });
  };
  const hideInfoPopever = () => {
    setShowInfo(false);
  };

  const [optimisticProperties, updateOptimisticProperty] = useOptimistic(
    properties,
    (state, property: AppartmentDTO) => {
      return state.map((p) => (p.id === property.id ? property : p));
    }
  );

  const filters: string[] = [];
  const updateFilters = (value: string | null) => {
    if (value && filters.includes(value)) {
      filters.splice(filters.indexOf(value), 1);
    } else if (value) {
      filters.push(value);
    }
    // console.log(filters);
  };

  const handleSearch = async (formData: FormData) => {
    const searchString = formData.get("searchString") as string;
    const res = await searchWithFilters(
      searchString,
      filters.includes("includeRules"),
      filters.includes("includeAddress"),
      filters.includes("includeHasAdvert"),
      filters.includes("includeObjectNumber"),
      filters.includes("includeLmNumber")
    );

    // console.log(res);
    setProperties(res);
  };

  return (
    <>
      <form
        action={handleSearch}
        className="w-full mb-4 grid grid-cols-[19fr_1fr]"
      >
        <input
          type="text"
          placeholder="Sök..."
          name="searchString"
          className="w-full border border-riksbyggenGray p-2 rounded-l-lg"
        />{" "}
        <input
          type="submit"
          value="Sök"
          className="bg-riksbyggenGray rounded-r-lg text-white"
        />
        <div className="mt-2 col-span-2 p-2 rounded-lg border-riksbyggenGray">
          <div className="mt-2 text-xl">Sökfilter</div>
          <div>
            <ul className="grid grid-cols-5">
              <li>
                <Toggle
                  label="Sökregel"
                  value="includeRules"
                  callback={(e) => updateFilters(e.target.value)}
                />
              </li>
              <li>
                <Toggle
                  label="Adress"
                  value="includeAddress"
                  callback={(e) => updateFilters(e.target.value)}
                />
              </li>
              <li>
                <Toggle
                  label="Objektnummer"
                  value="includeObjectNumber"
                  callback={(e) => updateFilters(e.target.value)}
                />
              </li>
              <li>
                <Toggle
                  label="LM nummer"
                  value="includeLmNumber"
                  callback={(e) => updateFilters(e.target.value)}
                />
              </li>
              <li>
                <Toggle
                  label="Annonserad"
                  value="includeHasAdvert"
                  callback={(e) => updateFilters(e.target.value)}
                />
              </li>
            </ul>
          </div>
        </div>
      </form>
      <table className="w-full text-left border-riksbdar">
        <thead className="bg-riksbyggenDarkGray  text-white h-12">
          <tr>
            <th className="w-1/6">Objektnummer</th>
            <th className="w-1/6">LM Nummer</th>
            <th className="w-1/6">Köregel</th>
            <th className="w-1/6">Annons</th>
            <th className="w-1/6">Adress</th>
            <th className="w-1/6 text-right px-12"></th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property: AppartmentDTO) => {
            return (
              <tr
                key={property.id}
                className="even:bg-[#ddd] text-sm overflow-visible"
              >
                <td>{property.objectNumber}</td>
                <td>{property.lmNumber}</td>
                <td>{property.queueRule.name}</td>
                <td>Annonserad</td>
                <td>
                  <span key={property.address.id} className="truncate">
                    {property.address.street} {property.address.number}{" "}
                    {property.address.numberAffix ?? ""},{" "}
                    {property.address.postalCode} {property.address.city},{" "}
                    {property.address.county}
                  </span>
                </td>
                <td className="text-right flex justify-end relative overflow-visible">
                  {showInfo && hoveredPropId === property.id && (
                    <div
                      onClick={hideInfoPopever}
                      className="text-white bg-black text-left p-2 w-[200px] z-50 rounded-lg"
                      style={{
                        position: "absolute",
                      }}
                    >
                      Har utannonserad lägenhet
                    </div>
                  )}
                  {property.advert && (
                    <InformationCircleIcon
                      className="w-6 hover:text-green-900"
                      onClick={() => showInfoPopever(property.id)}
                    />
                  )}

                  <Link href={`/appartment/${property.id}`} className="">
                    <BuildingOffice2Icon className="w-6 hover:text-green-900" />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
