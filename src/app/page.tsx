import { getAllRules, getAppartmentsWithAdvert } from "@/actions/actions";
import Properties from "@/components/Appartments";

export default async function Home() {
  const properties = await getAppartmentsWithAdvert();
  const rules = await getAllRules();

  return <Properties serverProperties={properties} rules={rules} />;
}
