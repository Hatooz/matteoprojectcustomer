import { getAllRules, getAppartmentsWithAdvert } from "@/actions/actions";
import Appartments from "@/components/Appartments";

export default async function Home() {
  const properties = await getAppartmentsWithAdvert();
  const rules = await getAllRules();

  return <Appartments serverProperties={properties} />;
}
