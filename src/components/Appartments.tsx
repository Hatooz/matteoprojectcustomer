"use client";

import { searchAppartmentstWithFilters } from "@/actions/actions";
import { AppartmentDTO } from "@/models/models";
import { BuildingOffice2Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import Toggle from "./toggle/Toggle";

export default function Appartments({
  serverProperties,
}: {
  serverProperties: any;
}) {
  const [appartments, setAppartments] =
    useState<AppartmentDTO[]>(serverProperties);

  const handleSearch = async (formData: FormData) => {
    const searchString = formData.get("searchString") as string;
    const res = await searchAppartmentstWithFilters(
      searchString,
      formData.get("includeRules") ? true : false,
      formData.get("includeAddress") ? true : false,
      formData.get("includeHasAdvert") ? true : false,
      formData.get("includeObjectNumber") ? true : false,
      formData.get("includeLmNumber") ? true : false
    );

    setAppartments(res);
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
                <Toggle label="Köregel" value="includeRules" />
              </li>
              <li>
                <Toggle label="Adress" value="includeAddress" />
              </li>
              <li>
                <Toggle label="Objektnummer" value="includeObjectNumber" />
              </li>
              <li>
                <Toggle label="LM nummer" value="includeLmNumber" />
              </li>
              <li>
                <Toggle label="Annonserad" value="includeHasAdvert" />
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
          {appartments.map((property: AppartmentDTO) => {
            return (
              <tr
                key={property.id}
                className="even:bg-[#ddd] text-sm overflow-visible"
              >
                <td>{property.objectNumber}</td>
                <td>{property.lmNumber}</td>
                <td>{property.queueRule.name}</td>
                <td>{property.totalApplications}</td>
                <td>
                  <span key={property.address.id} className="truncate">
                    {property.address.street} {property.address.number}{" "}
                    {property.address.numberAffix ?? ""},{" "}
                    {property.address.postalCode} {property.address.city},{" "}
                    {property.address.county}
                  </span>
                </td>
                <td className="text-right flex justify-end relative overflow-visible">
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
